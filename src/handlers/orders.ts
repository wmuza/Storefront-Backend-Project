import express, { Request, Response } from 'express'
import { Order, OrderStore, OrderProducts } from '../models/orders'
import { verifyAuthToken } from '../utilities/auth'

const store = new OrderStore()

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params?.id)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const createOrder = async (req: Request, res: Response) => {
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

const addProduct = async (req: Request, res: Response) => {
  const order: OrderProducts = {
    quantity: parseInt(req.body.quantity),
    order_id: parseInt(req.params.id),
    product_id: parseInt(req.body.product_id)
  }

  try {
    const order_result = await store.addProduct(
      order.quantity,
      order.order_id,
      order.product_id
    )
    res.json(order_result)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const updateOrder = async (req: Request, res: Response) => {
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

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.delete(req.params?.id)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders', getOrders)
  app.get('/orders/:id', getOrder)
  app.post('/orders', verifyAuthToken, createOrder)
  app.post('/orders/:id/products', verifyAuthToken, addProduct)
  app.put('/orders', verifyAuthToken, updateOrder)
  app.delete('/orders/:id', verifyAuthToken, deleteOrder)
}

export default orderRoutes
