require('dotenv/config');
const ClientError = require('./client-error');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.post('/api/signup', (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new ClientError(400, 'Username and password are required');
  }

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "email")
        values ($1, $2, $3)
        returning "userId", "username"
      `;
      const params = [username, hashedPassword, email];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/login', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required');
  }

  const sql = `
        select "userId",
              "hashedPassword"
          from "users"
          where "username" = ($1)
      `;
  const param = [username];

  db.query(sql, param)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }

      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }

          const payload = {
            userId: userId,
            username: username
          };

          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          const payloadTokenResponse = {
            token: token,
            user: payload
          };
          res.json(payloadTokenResponse);
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/home/projects', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "projectId",
       "projectName"
    from "project"
    join "tasks" using ("projectId")
    join "users" using ("userId")
    where "userId" = ($1)
    group by "projectId"
  `;

  const param = [userId];

  db.query(sql, param)
    .then(result => {
      res.status(200).json(result.rows);
    });
});

app.get('/api/projects/titles/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  const sql = `
    select "projectId",
           "projectName"
      from "project"
      where "projectId" = ($1)
  `;

  const param = [projectId];

  db.query(sql, param)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/projects/create', (req, res, next) => {
  const { projectName } = req.body;

  if (!projectName) {
    throw new ClientError(400, 'project name required');
  }

  const sql = `
    insert into "project" ("projectId", "projectName")
    values (default, ($1))
    returning "projectId", "projectName"
  `;

  const param = [projectName];

  db.query(sql, param)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));

});

app.get('/api/projects/:projectId', (req, res, next) => {
  const { userId } = req.user;
  const projectId = Number(req.params.projectId);
  if (!projectId) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }

  const sql = `
    select "taskId",
        "projectId",
        "projectName",
        "statusId",
        "statusName",
        "taskName",
        "username",
        "dateCreated"
    from "tasks"
    join "project" using ("projectId")
    join "statuses" using ("statusId")
    join "users" using ("userId")
    where "projectId" = ($1)
    AND "userId" = ($2)
  `;

  const param = [projectId, userId];

  db.query(sql, param)
    .then(result => {
      const currentTasks = [];
      const forReview = [];
      const completed = [];
      const backlog = [];

      const editedResult = [currentTasks, forReview, completed, backlog];

      for (let i = 0; i < result.rows.length; i++) {
        const task = result.rows[i];
        editedResult[task.statusId - 1].push(task);
      }
      res.json(editedResult);
    })
    .catch(err => next(err));
});

app.get('/api/statuses', (req, res, next) => {
  const sql = `
    select "statusId",
           "statusName"
      from "statuses"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/tasks/create/:projectId', (req, res, next) => {
  const asssignedTo = req.user.userId;
  const projectId = Number(req.params.projectId);
  const { userId, taskName, statusId, description, dateCreated, deadline } = req.body;
  if (!userId || !taskName || !statusId || !description || !dateCreated || !deadline) {
    throw new ClientError(400, 'User ID, task name, status ID, description, date created and deadline are required');
  }

  if (Number(asssignedTo) !== Number(userId)) {
    throw new ClientError(400, 'UserId and assignedTo must match');
  }

  const sql = `
  insert into "tasks" ("taskId", "statusId", "userId", "projectId", "taskName", "description", "dateCreated", "deadline")
               values (default, $1, $2, $3, $4, $5, $6, $7)
               returning "taskId", "statusId", "userId", "projectId", "taskName", "description", "dateCreated", "deadline";
  `;

  const params = [statusId, userId, projectId, taskName, description, dateCreated, deadline];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/tasks/view/:taskId', (req, res, next) => {

  const taskId = Number(req.params.taskId);
  if (!taskId) {
    throw new ClientError(400, 'taskId must be a positive integer');
  }

  const sql = `
    select "taskId",
        "projectId",
        "projectName",
        "statusId",
        "statusName",
        "taskName",
        "username",
        "dateCreated",
        "deadline",
        "description",
        "userId"
    from "tasks"
    join "project" using ("projectId")
    join "statuses" using ("statusId")
    join "users" using ("userId")
    where "taskId" = ($1)
  `;

  const param = [taskId];

  db.query(sql, param)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find taskId ${taskId}`);
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));

});

app.put('/api/tasks/edit/:taskId', (req, res, next) => {
  const asssignedTo = req.user.userId;

  const { userId, taskName, statusId, description, dateCreated, deadline } = req.body;
  if (!userId || !taskName || !statusId || !description || !dateCreated || !deadline) {
    throw new ClientError(400, 'User ID, task name, status ID, description, date created and deadline are required');
  }

  if (Number(asssignedTo) !== Number(userId)) {
    throw new ClientError(400, 'UserId and assignedTo must match');
  }

  const taskId = Number(req.params.taskId);
  if (!taskId) {
    throw new ClientError(400, 'taskId must be a positive integer');
  }

  const sql = `
  update "tasks"
  set "statusId" = ($1),
      "taskName" = ($2),
      "userId" = ($3),
      "description" = ($4),
      "dateCreated" = ($5),
      "deadline" = ($6)
  where "taskId" = ($7)
  returning "taskId", "statusId", "userId", "taskName", "description", "dateCreated", "deadline";
  `;

  const params = [statusId, taskName, userId, description, dateCreated, deadline, taskId];

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find taskId ${taskId}`);
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/users', (req, res, next) => {
  const { userId } = req.user;

  const sql = `
    select "userId",
           "username"
    from "users"
    where "userId" = ($1)
  `;

  const param = [userId];

  db.query(sql, param)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/task/search/:projectId/:taskName', (req, res, next) => {
  let taskName = req.params.taskName;
  const projectId = req.params.projectId;
  const { userId } = req.user;
  taskName = taskName + '%';
  const sql = `
    select "taskId",
        "taskName",
        "username",
        "dateCreated",
        "deadline",
        "description",
        "userId"
    from "tasks"
    join "users" using ("userId")
    where "taskName" LIKE ($1)
    AND "userId" = ($2)
    AND "projectId" = ($3)
  `;

  const params = [taskName, userId, projectId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
