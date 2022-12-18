import { Request, Response, Application } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: Application) => {
  app.get('/products_in_orders', productsInOrders)
  app.get('/users_with_orders', usersWithOrders)
  app.get('/five-expensive-products', fiveExpensiveProducts)
}

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders()
  res.json(products)
}

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders()
  res.json(users)
}

const fiveExpensiveProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.fiveExpensiveProducts()
  res.json(products)
}

export default dashboardRoutes
