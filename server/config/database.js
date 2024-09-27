import pg from 'pg'

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
}

// Alternative way to run config settings using Railway's Connection URL
// const config = {
//   connectionString: process.env.CONNECTION_STRING
// }

export const pool = new pg.Pool(config)
