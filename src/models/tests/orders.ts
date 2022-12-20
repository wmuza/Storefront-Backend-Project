import { OrderStore, OrderProducts } from '../orders'

const store = new OrderStore()

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(store.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('create method should add a order', async () => {
    const result = await store.create({
      status: 'active',
      user_id: 1
    })

    expect(result).toEqual({
      id: '1',
      status: 'active',
      user_id: 1
    })
  })

  it('index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: '1',
        status: 'active',
        user_id: 1
      }
    ])
  })

  it('update method should return the updated order', async () => {
    const result = await store.update({
      id: '1',
      status: 'complete',
      user_id: 1
    })

    expect(result).toEqual({
      id: '1',
      status: 'complete',
      user_id: 1
    })
  })

  it('show method should return the correct order', async () => {
    const result = await store.show('1')
    expect(result).toEqual({
      id: '1',
      status: 'complete',
      user_id: 1
    })
  })

  it('delete method should remove the order', async () => {
    store.delete('1')
    const result = await store.index()

    expect(result).toEqual([])
  })
})
