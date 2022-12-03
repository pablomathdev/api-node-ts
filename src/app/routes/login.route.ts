import { Router } from 'express'
import { loginControllerFactory } from '../../presentation/factories/factorys'
import { RequestAndResponseAdapter } from './request-response-adapter'

let loginRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
loginRoute.post('/login', RequestAndResponseAdapter.execute(loginControllerFactory()))

export { loginRoute }
