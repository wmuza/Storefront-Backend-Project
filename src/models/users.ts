// @ts-ignoreArticle
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export type User = {
  id?: string
  username?: string
  password?: string
  firstname?: string
  lastname?: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users RETURNING id, username, firstname, lastname'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql =
        'SELECT * FROM users WHERE id=($1) RETURNING username, firstname, lastname'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`)
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (username, password, firstname, lastname) VALUES($1, $2, $3, $4) RETURNING username, firstname, lastname'
      // @ts-ignore
      const conn = await Client.connect()
      const saltRounds = parseInt(process.env.SALT_ROUNDS as string)
      const hash = bcrypt.hashSync(user.password as string, saltRounds)
      const result = await conn.query(sql, [
        user.username,
        hash,
        user.firstname,
        user.lastname
      ])
      const user_result = result.rows[0]
      conn.release()

      return user_result
    } catch (err) {
      throw new Error(`Could not add user ${user?.firstname}. Error: ${err}`)
    }
  }

  async authenticate(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT username, password FROM users WHERE username=($1)'

      const result = await conn.query(sql, [user.username])
      const user_result = result.rows[0]

      conn.release()

      const checkPassword = bcrypt.compareSync(
        user.password as string,
        user_result.password
      )

      if (!checkPassword) throw new Error(`Password incorrect`)

      return user_result
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }
}
