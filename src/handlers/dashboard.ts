import { Request, Response, Application } from 'express'
import { DashboardQueries } from '../services/dashboard'
import verifyAuthToken from '../utilities/auth'

const dashboard = new DashboardQueries()

const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.currentOrderByUser(req.params?.userId)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const completedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.completedOrdersByUser(req.params?.userId)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const fiveMostPopularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostPopularProducts()
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const dashboardRoutes = (app: Application) => {
  app.get('/orders/user/:userId', verifyAuthToken, currentOrderByUser)
  app.get(
    '/orders/user/:userId/completed',
    verifyAuthToken,
    completedOrdersByUser
  )
  app.get('/five-most-expensive-products', fiveMostPopularProducts)
}

export default dashboardRoutes
