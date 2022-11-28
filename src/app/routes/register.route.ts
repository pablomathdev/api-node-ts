import { Router } from 'express'
import { registerControllerFactory } from '../../presentation/factories/factorys'
import { RequestAndResponse } from './request-response'

let registerRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
registerRoute.post('/register', RequestAndResponse.execute(registerControllerFactory()))

export { registerRoute }
