import express, { Request, Response } from 'express'
import { Order, OrderStore, OrderProducts } from '../models/orders'
import verifyAuthToken from '../utilities/auth'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params?.id)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  }

  try {
    const order_result = await store.create(order)
    res.json(order_result)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req: Request, res: Response) => {
  const order: Order = {
    id: req.body.id,
    status: req.body.status,
    user_id: req.body.user_id
  }

  try {
    const order_result = await store.update(order)
    res.json(order_result)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const order = await store.delete(req.params?.id)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.put('/orders', verifyAuthToken, update)
  app.delete('/orders/:id', verifyAuthToken, remove)
}

export default orderRoutes
