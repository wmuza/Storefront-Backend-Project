import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/users'
import { verifyId, verifyAuthToken } from '../utilities/auth'
import jwt from 'jsonwebtoken'

const store = new UserStore()

const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params?.id)
    res.json(user)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const createUser = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }

  try {
    const user_result = await store.create(user)
    var token = jwt.sign(
      { user: user_result },
      process.env.TOKEN_SECRET as string
    )
    res.json(token)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const authenticateUser = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    const user_result = await store.authenticate(user)
    const token = jwt.sign(
      { user: user_result },
      process.env.TOKEN_SECRET as string
    )
    res.json(token)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const updateUser = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }

  try {
    const user_result = await store.update(user)
    res.json(user_result)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await store.delete(req.params?.id)
    res.json(user)
  } catch (err) {
    res.status(401)
    res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', getUsers)
  app.get('/users/:id', getUser)
  app.post('/users', createUser)
  app.post('/authenticate', authenticateUser)
  app.put('/users', verifyId, updateUser)
  app.delete('/users/:id', verifyAuthToken, deleteUser)
}

export default userRoutes
