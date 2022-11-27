import bodyParser from 'body-parser'
import express from 'express'
import { registerRoute } from './routes/register.route'
// import mongoose from 'mongoose'
const app = express()

app.use(bodyParser.json())
app.use(registerRoute)
// async function mongo (): Promise<void> {
//   await mongoose.connect('mongodb://localhost:27017/api').then(() => {
//     console.log('mongo running')
//   })
// }

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// mongo()
// app.listen(3000, () => {
//   console.log('running')
// })

export default app
