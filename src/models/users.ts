// @ts-ignoreArticle
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export type User = {
  id?: string
  username?: string
  password?: string
  firstName?: string
  lastName?: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT firstName, lastName FROM users'

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
        'SELECT * FROM users WHERE id=($1) RETURNING id, firstName, lastName'
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
        'INSERT INTO users (username, password, firstName, lastName) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
      const saltRounds = parseInt(process.env.SALT_ROUNDS as string)
      const hash = bcrypt.hashSync(user.password as string, saltRounds)
      const result = await conn.query(sql, [
        user.username,
        hash,
        user.firstName,
        user.lastName
      ])
      const user_result = result.rows[0]
      conn.release()

      return user_result
    } catch (err) {
      throw new Error(`Could not add user ${user?.firstName}. Error: ${err}`)
    }
  }

  async authenticate(user: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql =
        'SELECT username, password FROM users WHERE username=($1)'

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
