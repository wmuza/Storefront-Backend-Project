// @ts-ignoreOrder
import Client from '../database'

export type Order = {
  id?: string
  status: string
  user_id: number
}

export type OrderProducts = {
  id?: string
  quantity: number
  order_id: number
  product_id: number
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`)
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [order.status, order.user_id])
      const order_result = result.rows[0]

      conn.release()

      return order_result
    } catch (err) {
      throw new Error(
        `Could not add order with status ${order?.status}. Error: ${err}`
      )
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const sql =
        'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [
        order.status,
        order.user_id,
        order.id
      ])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get order ${order.id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }
}
