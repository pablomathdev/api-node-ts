import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  accessToken: [{ type: Schema.Types.ObjectId, ref: 'Token' }]
})

export const UserModel = model('User', userSchema)
