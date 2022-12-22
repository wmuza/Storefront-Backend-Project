import app from '../../server'
import dotenv from 'dotenv'
import request from 'supertest'
import { ProductStore } from '../products'

const store = new ProductStore()

describe('2. Unit testing the Product Model', () => {
  let productID = '1'

  it('2.1 Should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('2.2 Should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('2.3 Should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('2.4 Should have a update method', () => {
    expect(store.update).toBeDefined()
  })

  it('2.5 Should add a product', async () => {
    const result = await store.create({
      name: 'WibiClick',
      price: '50'
    })

    productID = result.id + ''

    expect(result).toBeTruthy()
  })

  it('2.6 Index method should return a list of products', async () => {
    const result = await store.index()

    expect(result).not.toBe([])
  })

  it('2.7 Update method should return the updated product', async () => {
    const result = await store.update({
      id: productID,
      name: 'New Product',
      price: '60'
    })

    expect(result.name).toEqual('New Product')
    expect(result.price).toEqual(60)
  })

  it('2.8 Show method should return the correct product', async () => {
    const result = await store.show(productID)
    expect(result.name).toEqual('New Product')
  })
})

describe('2.10 Unit testing the Products Endpoints', (): void => {
  let userToken: string

  var originalTimeout: number

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000
  })

  it('2.11 Should authenticate user and return token on this endpoint /authenticate', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
      .post('/authenticate')
      .send({ username: 'wmuza', password: process.env.POSTGRES_PASSWORD })
      .set('Accept', 'application/json')

    userToken = response.body.token

    expect(userToken).toBeTruthy()
    expect(response.status).toEqual(200)
  })

  it('2.12 Create the products endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
      .post('/products')
      .send({ name: 'WibiClick', price: '50' })
      .set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200)
  })

  it('2.13 Update the products endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
      .put('/products')
      .send({ id: 1, name: 'New Product', price: '60' })
      .set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200)
  })

  it('2.14 Gets the /products endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app).get('/products')

    expect(response.status).toEqual(200)
  })

  it('2.15 Gets the /products/:id endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app).get('/products/1')

    expect(response.status).toEqual(200)
  })

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
  })
})
