const { Pool } = require('pg');
const dotenv = require("dotenv").config();

const pool = new Pool({
  user:process.env.DB_USERNAME,
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  password:process.env.DB_PASSWORD,
  database:process.env.DB,
});
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Database connection error:', err));
 module.exports = pool;