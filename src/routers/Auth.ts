import { Router } from 'express'
import AuthValidator from '../validators/Auth.js'
import AuthController from '../controllers/Auth.js'

const AuthRouter = Router()

AuthRouter.post('/sign-in', AuthValidator.signIn, AuthController.signIn)
AuthRouter.post('/sign-up', AuthValidator.signUp, AuthController.signUp)
AuthRouter.post('/logout', AuthValidator.logOut, AuthController.logOut)
AuthRouter.post('/refresh', AuthValidator.refresh, AuthController.refresh)

export default AuthRouter
