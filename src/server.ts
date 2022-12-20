import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', function (req: Request, res: Response) {
  res.send('This is the HOME route')
})

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
