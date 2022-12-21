import { UserStore } from '../users'
import dotenv from 'dotenv'

dotenv.config()
const store = new UserStore()

describe('1. Unit testing the user model', () => {
  it('1.1 should have an index method', function (): void {
    expect(store.index).toBeDefined()
  })

  it('1.2 should have a show method', function (): void {
    expect(store.show).toBeDefined()
  })

  it('1.3 should have a create method', function (): void {
    expect(store.create).toBeDefined()
  }) 

  it('1.4 create method should add a user', async function (): Promise<void> {
    const result = await store.create({
      username: 'wmuza',
      password: process.env.POSTGRES_PASSWORD,
      firstname: 'Wilbert',
      lastname: 'Muza'
    })

    expect(result.username).toEqual('wmuza');
  })

  it('1.5 index method should return a list of users', async function (): Promise<void> {
    const result = await store.index()

    expect(result[0].firstname).toEqual('Wilbert');
  })  

  it('1.6 show method should return the correct user', async function (): Promise<void> {
    const result = await store.show('1')

    expect(result.lastname).toEqual('Muza');
  })

  it('1.7 authenticate method should be true', async function (): Promise<void> {
    const result = await store.authenticate({
      username: 'wmuza',
      password: process.env.POSTGRES_PASSWORD
    })

    expect(result.username).toEqual('wmuza');
  })
})
