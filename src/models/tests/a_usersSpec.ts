import { UserStore } from '../users'
import app from '../../server'
import dotenv from 'dotenv'
import request from 'supertest';

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

describe('1.10 Unit testing the users Endpoints', () : void => {
	let userToken: string;

  var originalTimeout: number;

  beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  });

  it('1.11 Should authenticate user and return token on this endpoint /authenticate', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.post('/authenticate')
		.send({ username: 'wmuza', password: process.env.POSTGRES_PASSWORD })
    .set('Accept', 'application/json')

    userToken = response.body.token

    expect(userToken).toBeTruthy()
    expect(response.status).toEqual(200);
  })

  it('1.12 Create the users endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.post('/users')
    .send({
      username: 'wmuza',
      password: process.env.POSTGRES_PASSWORD,
      firstname: 'Wilbert',
      lastname: 'Muza'
    })
		.set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

  it('1.13 Gets the /users endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.get('/users')
    .set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

  it('1.14 Gets the /users/:id endpoint', async (): Promise<void> => {
    //Test the endpoint and see if it returns status code of 200
    const response = await request(app)
		.get('/users/1')
    .set('Authorization', `Basic ${userToken}`)

    expect(response.status).toEqual(200);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

})