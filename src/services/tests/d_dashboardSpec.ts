import app from '../../server'
import request from 'supertest';
import { DashboardQueries } from '../dashboard'
import { OrderStore } from '../../models/orders'

const store = new DashboardQueries()
const orderStore = new OrderStore()

describe('4. Unit testing the Dasboard Models', () => {
  it('4.1 Should have an currentOrderByUser method', () => {
    expect(store.currentOrderByUser).toBeDefined()
  })

  it('4.2 Should have a completedOrdersByUser method', () => {
    expect(store.completedOrdersByUser).toBeDefined()
  })

  it('4.3 Should have a fiveMostPopularProducts method', () => {
    expect(store.fiveMostPopularProducts).toBeDefined()
  })

  it('4.4 Should return a list of orders made by a user', async () => {
		// create order for testing
		await orderStore.create({ status: 'active', user_id: 1})
    const result = await store.currentOrderByUser('1')

    expect(result).toEqual({
      id: '1',
      status: 'active',
      user_id: 1
    })
  })

  it('4.5 Should return a list of orders', async () => {
		// create a completed order for testing
		await orderStore.create({ status: 'complete', user_id: 1})
    const result = await store.completedOrdersByUser('1')

    expect(result).toEqual([
      {
        id: '1',
        status: 'active',
        user_id: 1
      }
    ])
  })

  it('4.6 Should return a list of the 5 most popular products', async () => {
    const result = await store.fiveMostPopularProducts()

    expect(result).toEqual([
			{
				name: 'Product 1',
				price: 12
			}
		])
  })
})

xdescribe('5. Unit testing the Dashboard Endpoints', () : void => {
	let userToken: string;

	it('Should authenticate user and return token on this endpoint /authenticate', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.post('/authenticate')
		.send({ username: 'wmuza', password: 'password123' })
    .set('Accept', 'application/json')

		expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeDefined();

		userToken = response.body.token
  });

  it('Gets the /user/:userId/orders endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.get('/user/1/orders')
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

	it('Gets the /user/:userId/orders/completed endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.get('/user/1/orders/completed')
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

	it('Gets the /five-most-expensive-products endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.get('/five-most-expensive-products')

    expect(response.status).toEqual(200);
  });
});