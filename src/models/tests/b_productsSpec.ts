import { ProductStore } from '../products'

const store = new ProductStore()

describe('2. Unit testing the Product Model', () => {
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

  it('2.5 Should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('2.6 Should add a product', async () => {
    const result = await store.create({
      name: 'WibiClick',
      price: '50'
    })

    expect(result).toBeTruthy()
  })

  it('2.7 Index method should return a list of products', async () => {
    const result = await store.index()

    expect(result).not.toBe([])
  })

  it('2.8 Update method should return the updated product', async () => {
    const result = await store.update({
      id: '1',
      name: 'New Product',
      price: '60'
    })

    expect(result).toEqual({
      id: 1,
      name: 'New Product',
      price: 60
    })
  })

  it('2.9 Show method should return the correct product', async () => {
    const result = await store.show('1')
    expect(result.name).toEqual('New Product')
  })

  it('2.10 delete method should remove the product', async () => {
    store.delete('1')
    const result = await store.index()

    expect(result).not.toContain({
      id: 1,
      name: 'New Product',
      price: 60
    })
  })
})
