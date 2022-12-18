import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import { verifyAuthToken } from '../utilities/auth'

const store = new ProductStore()

const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params?.id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const createProduct = async (req: Request, res: Response) => {
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

const updateProduct = async (req: Request, res: Response) => {
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.delete(req.params?.id)
    res.json(product)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', getProducts)
  app.get('/products/:id', getProduct)
  app.post('/products', verifyAuthToken, createProduct)
  app.put('/products', verifyAuthToken, updateProduct)
  app.delete('/products/:id', verifyAuthToken, deleteProduct)
}

export default productRoutes
