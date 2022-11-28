import bodyParser from 'body-parser'
import express from 'express'
import { registerRoute } from '../routes/register.route'

const app = express()
// eslint-disable-next-line import/first

app.use(bodyParser.json())
app.use(registerRoute)

export default app
