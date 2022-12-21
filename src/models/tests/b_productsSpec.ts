import { ProductStore } from '../products'

const store = new ProductStore()

describe('2. Unit testing the Product Model', () => {
  let productID = '1';

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

    productID = result.id + ""

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
