import { UserStore } from '../users'

const store = new UserStore()

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  }) 

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'wmuza',
      password: 'password123',
      firstname: 'Wilbert',
      lastname: 'Muza'
    })

    expect(result).toEqual({
      username: 'wmuza',
      firstname: 'Wilbert',
      lastname: 'Muza'
    })
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: '1',
        username: 'wmuza',
        firstname: 'Wilbert',
        lastname: 'Muza'
      }
    ])
  })  

  it('show method should return the correct user', async () => {
    const result = await store.show('1')
    expect(result).toEqual({
        username: 'wmuza',
        firstname: 'Wilbert',
        lastname: 'Muza'
    })
  })

  it('authenticate method should be true', async () => {
    const result = await store.authenticate({
      username: 'wmuza',
      password: 'password123'
    })

    expect(result).toBeTrue()
  })
})
