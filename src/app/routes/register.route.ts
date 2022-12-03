import { Router } from 'express'
import { registerControllerFactory } from '../../presentation/factories/factorys'
import { RequestAndResponseAdapter } from './request-response-adapter'

let registerRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
registerRoute.post('/register', RequestAndResponseAdapter.execute(registerControllerFactory()))

export { registerRoute }
