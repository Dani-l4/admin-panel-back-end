import ErrorUtils, { Unprocessable } from '../utils/Errors.js'
import { Request, Response, NextFunction } from 'express-serve-static-core'

export default async function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction,
    schema?: any
) {
    try {
        if (schema) {
            await schema.validate(req) // убрал .body
        }

        return next()
    } catch ({ path, errors }: any) {
        return ErrorUtils.catchError(
            res,
            new Unprocessable(JSON.stringify({ path, errors }))
        )
    }
}
