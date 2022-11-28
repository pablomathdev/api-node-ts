import mongoose from 'mongoose'

export async function mongoConnect (uri: string): Promise<void> {
  await mongoose.connect(uri).then(() => {
    console.log(
      'connected to mongodb')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  }).catch(err => console.log(`error connecting to mongodb: ${err}`))
}

export async function mongoDisconnect (): Promise<void> {
  await mongoose.disconnect()
}

export async function deleteDocs (model: any): Promise<void> {
  await model.deleteMany({})
}
