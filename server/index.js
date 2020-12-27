require('dotenv/config');
const ClientError = require('./client-error');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
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
      if (!result.rows[0]) {
        throw new ClientError(401, 'Invalid login');
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => { next(err); });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
