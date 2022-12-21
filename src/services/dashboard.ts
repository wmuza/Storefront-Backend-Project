import Client from '../database'
import { Order } from '../models/orders'

export class DashboardQueries {
  async currentOrderByUser(id: string): Promise<Order> {
    try {
      const sql =
        `SELECT name, status, quantity, price 
         FROM orders 
         INNER JOIN order_products ON orders.id = order_products.order_id 
         INNER JOIN products ON order_products.product_id = products.id
         WHERE user_id=($1)
         ORDER BY orders.timestamp DESC
        `
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
        `SELECT name, status, quantity, price 
         FROM orders 
         INNER JOIN order_products ON orders.id = order_products.order_id 
         INNER JOIN products ON order_products.product_id = products.id
         WHERE user_id=($1) AND status=($2)
        `
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
      const sql =
        `SELECT name, quantity, price 
         FROM order_products
         INNER JOIN products ON order_products.product_id = products.id
         ORDER BY order_products.quantity DESC
         LIMIT 5
        `
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }
}
