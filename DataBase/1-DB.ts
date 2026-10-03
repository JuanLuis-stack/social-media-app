// 1-DB.js

import { Pool } from "pg";

const db = new Pool({
  user: "postgres",
  password: "2009luiyi",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

export default db;
