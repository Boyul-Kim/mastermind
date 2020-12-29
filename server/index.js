require('dotenv/config');
const ClientError = require('./client-error');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/api/home/projects', (req, res, next) => {
  const sql = `
    select *
    from "project"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    });
});

app.get('/api/home/:projectId', (req, res, next) => {
  const projectId = Number(req.params.projectId);
  if (!projectId) {
    throw new ClientError(400, 'projectId must be a positive integer');
  }
  const sql = `
    select "projectId",
           "projectName"
      from "project"
      where "projectId" = ($1)
  `;
  const param = [projectId];
  db.query(sql, param)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find projectId ${projectId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
