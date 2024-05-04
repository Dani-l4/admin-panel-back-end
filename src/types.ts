import { Request, Response } from 'express-serve-static-core'

export interface iReqWUser extends Request {
    user?: any
}
export interface iResWUser extends Response {
    user?: any
}

export interface iSignInReq {
    name?: string
    email: string
    password: string
}
