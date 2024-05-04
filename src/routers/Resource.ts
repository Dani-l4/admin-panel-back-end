import { Router } from 'express'
import TokenService from '../services/Token.js'
import ResourceController from '../controllers/Resource.js'

const ResourceRouter = Router()

ResourceRouter.get('/users', TokenService.checkAccess, ResourceController.users)
ResourceRouter.post(
    '/users/block',
    TokenService.checkAccess,
    ResourceController.blockUsers
)
ResourceRouter.post(
    '/users/unblock',
    TokenService.checkAccess,
    ResourceController.unBlockUsers
)
ResourceRouter.delete(
    '/users',
    TokenService.checkAccess,
    ResourceController.deleteUsers
)

export default ResourceRouter
