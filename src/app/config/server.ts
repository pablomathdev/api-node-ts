import mongoose from 'mongoose'
import app from './app'

async function mongoConnect (): Promise<void> {
  await mongoose.connect('mongodb://localhost:27017/api').then(() => {
    app.listen(3000, () => {
      console.log('server running')
    })
    console.log('mongo running')
  })
}

void mongoConnect()
