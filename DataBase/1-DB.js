// 1-DB.js

const { Pool } = require("pg")

const db = new Pool({
  user: 'postgres',
  password: '2009luiyi',
  host: 'localhost',
  port: 5432,
  database: 'postgres'
})

module.exports = db