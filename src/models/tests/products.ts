import { ProductStore } from '../products'

const store = new ProductStore()

describe('Product Model', () => {
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

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'WibiClick',
      price: 50
    })

    expect(result).toEqual({
      id: '1',
      name: 'WibiClick',
      price: 50
    })
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: '1',
        name: 'WibiClick',
        price: 50
      }
    ])
  })

  it('update method should return the updated product', async () => {
    const result = await store.update({
      id: '1',
      name: 'Wibi Click',
      price: 60
    })

    expect(result).toEqual({
      id: '1',
      name: 'Wibi Click',
      price: 60
    })
  })

  it('show method should return the correct product', async () => {
    const result = await store.show('1')
    expect(result).toEqual({
      id: '1',
      name: 'Wibi Click',
      price: 60
    })
  })

  it('delete method should remove the product', async () => {
    store.delete('1')
    const result = await store.index()

    expect(result).toEqual([])
  })
})
