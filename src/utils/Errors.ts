import { Response } from 'express-serve-static-core'

class WebError {
    constructor(public status: number, public error: any) {}
}

export class Unprocessable extends WebError {
    constructor(error: any) {
        super(422, error)
    }
}

export class Conflict extends WebError {
    constructor(error: any) {
        super(409, error)
    }
}

export class NotFound extends WebError {
    constructor(error: any) {
        super(404, error)
    }
}

export class Forbidden extends WebError {
    constructor(error: any) {
        super(403, error)
    }
}

export class Unauthorized extends WebError {
    constructor(error: any) {
        super(401, error)
    }
}

export class BadRequest extends WebError {
    constructor(error: any) {
        super(400, error)
    }
}

class ErrorUtils {
    static catchError(res: Response, error: any) {
        console.log(error)
        return res.status(error.status || 500).json(error)
    }
}

export default ErrorUtils
