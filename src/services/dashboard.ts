import Client from '../database'
import { Order } from '../models/orders'

export class DashboardQueries {
  async currentOrderByUser(id: string): Promise<Order> {
    try {
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`)
    }
  }

  async completedOrdersByUser(id: string): Promise<Order[]> {
    try {
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) AND status=($2) ORDER BY id DESC'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id, 'completed'])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(
        `Could not get completed orders for user ${id}. Error: ${err}`
      )
    }
  }

  async fiveMostPopularProducts(): Promise<{ name: string; price: string | number }[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT TOP 5 * FROM order_products ORDER BY quantity DESC'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }
}
