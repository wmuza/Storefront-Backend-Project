import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { 
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV
} = process.env

let db = {
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
}

console.log(ENV)

if(ENV === 'test') {
  db = {
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  }
}

console.log(db.database)

const client = new Pool(db)

export default client
