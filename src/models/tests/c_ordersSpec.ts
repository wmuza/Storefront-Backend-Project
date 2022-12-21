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
