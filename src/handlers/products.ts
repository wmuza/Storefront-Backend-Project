import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import verifyAuthToken from '../utilities/auth'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params?.id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price
  }

  try {
    const product_result = await store.create(product)
    res.json(product_result)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req: Request, res: Response) => {
  const product: Product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price
  }

  try {
    const product_result = await store.update(product)
    res.json(product_result)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
  app.put('/products', verifyAuthToken, update)
}

export default productRoutes
