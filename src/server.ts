import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'
import dashboardRoutes from './handlers/dashboard'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', function (req: Request, res: Response) {
  res.send('This is the HOME route')
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)
dashboardRoutes(app)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app;