import { mongoConnect } from '../../implementations/db/mongo/conn/mongo-connect'
import env from './env'
import app from './app'

void mongoConnect(env.mongoUri)
app.listen(env.port, () => {
  console.log(`server running on port: ${env.port}`)
})
