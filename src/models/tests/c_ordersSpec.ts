import app from '../../server'
import request from 'supertest';
import { OrderStore, OrderProducts } from '../orders'

const store = new OrderStore()

describe('3. Unit testing the Order Model', () => {
  let orderID = '1';

  it('3.1 Should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('3.2 Should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('3.3 Should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('3.4 Should have a update method', () => {
    expect(store.update).toBeDefined()
  })

  it('3.5 Create method should add a order', async () => {
    const result = await store.create({
      status: 'active',
      user_id: 1
    })

    orderID = result.id as string

    expect(result).toBeTruthy()
  })

  it('3.6 Index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result).not.toBe([])
  })

  it('3.7 Update method should return the updated order', async () => {
    const result = await store.update({
      id: orderID,
      status: 'complete',
      user_id: 1
    })

    expect(result).toBeTruthy()
  })

  it('3.8 Show method should return the correct order', async () => {
    const result = await store.show(orderID)

    expect(result.status).toEqual('complete')
  })

  it('3.9 Create method should add a order product', async () => {
    const order: OrderProducts = {
      quantity: 12,
      order_id: parseInt(orderID),
      product_id: 1
    }

    const result = await store.addProduct(
      order.quantity,
      order.order_id,
      order.product_id
    )

    expect(result.quantity).toEqual(12)
  })
})

describe('3.10 Unit testing the Order Endpoints', () : void => {
	let userToken: string;

  it('3.11 Create the orders endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.post('/orders')
    .send({ status: 'active', user_id: 1 })
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

  it('3.12 Create the orders endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.put('/orders')
    .send({id: 1, status: 'complete', user_id: 1})
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

  it('3.13 Create the orders endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.post('/orders/1/products')
    .send({quantity: 12, order_id: 1, product_id: 1})
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

	it('3.14 Should authenticate user and return token on this endpoint /authenticate', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.post('/authenticate')
		.send({ username: 'wmuza', password: 'password123' })
    .set('Accept', 'application/json')

    userToken = response.body.token

    expect(userToken).toBeTruthy()
    expect(response.status).toEqual(200);
  })

  it('3.15 Gets the /orders endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.get('/orders')
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

  it('3.16 Gets the /orders/:id endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.get('/orders/1')
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

})