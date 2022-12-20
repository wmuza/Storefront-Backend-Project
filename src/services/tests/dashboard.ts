import { DashboardQueries } from '../dashboard'

const store = new DashboardQueries()

describe('Order Model', () => {
  it('should have an currentOrderByUser method', () => {
    expect(store.currentOrderByUser).toBeDefined()
  })

  it('should have a completedOrdersByUser method', () => {
    expect(store.completedOrdersByUser).toBeDefined()
  })

  it('should have a fiveMostPopularProducts method', () => {
    expect(store.fiveMostPopularProducts).toBeDefined()
  })

  it('currentOrderByUser method should add a order', async () => {
    const result = await store.currentOrderByUser('1')

    expect(result).toEqual({
      id: '1',
      status: 'pending',
      user_id: 1
    })
  })

  it('completedOrdersByUser method should return a list of orders', async () => {
    const result = await store.completedOrdersByUser('1')

    expect(result).toEqual([
      {
        id: '1',
        status: 'pending',
        user_id: 1
      }
    ])
  })

  it('fiveMostPopularProducts method should remove the order', async () => {
    const result = await store.fiveMostPopularProducts()

    expect(result).toEqual([
			{
				name: 'Product 1',
				price: 12
			}
		])
  })
})
