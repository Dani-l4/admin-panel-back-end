import * as Yup from 'yup'
import validateRequest from './validateRequest.js'
import { Request, Response, NextFunction } from 'express-serve-static-core'

export const signInSchema = Yup.object({
    body: Yup.object({
        email: Yup.string()
            .required('This field is required')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Incorrect email'),
        password: Yup.string()
            .required('This field is required')
            .max(50, 'Password is too long. Max 50 characters'),
    }),
}).required()

export const signUpSchema = Yup.object({
    body: Yup.object({
        name: Yup.string().optional(),
        email: Yup.string()
            .required('This field is required')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Incorrect email'),
        password: Yup.string()
            .required('This field is required')
            .max(50, 'Password is too long. Max 50 characters'),
    }),
})

export const logoutSchema = Yup.object({
    cookies: Yup.object({
        refreshToken: Yup.string().required(''),
    }),
})
export const refreshSchema = Yup.object({
    cookies: Yup.object({
        refreshToken: Yup.string().required(''),
    }),
})

class AuthValidator {
    static async signIn(req: Request, res: Response, next: NextFunction) {
        return validateRequest(req, res, next, signInSchema)
    }

    static async signUp(req: Request, res: Response, next: NextFunction) {
        return validateRequest(req, res, next, signUpSchema)
    }

    static async logOut(req: Request, res: Response, next: NextFunction) {
        return validateRequest(req, res, next, logoutSchema)
    }

    static async refresh(req: Request, res: Response, next: NextFunction) {
        return validateRequest(req, res, next, refreshSchema)
    }
}

export default AuthValidator
