import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction } from 'express-serve-static-core'
import { Forbidden, Unauthorized } from '../utils/Errors.js'
import { iReqWUser, iResWUser } from '../types.js'
import SessionRepository from '../repositories/Session.js'

export default class TokenService {
    static async generateAccessToken(
        payload: JwtPayload | string
    ): Promise<string> {
        return await jwt.sign(
            payload,
            String(process.env.ACCESS_TOKEN_SECRET),
            {
                expiresIn: '30m',
            }
        )
    }

    static async generateRefreshToken(
        payload: JwtPayload | string
    ): Promise<string> {
        return await jwt.sign(
            payload,
            String(process.env.REFRESH_TOKEN_SECRET),
            {
                expiresIn: '7d',
            }
        )
    }

    static async checkAccess(req: iReqWUser, _: iResWUser, next: NextFunction) {
        const authHeader = req.headers.authorization
        const token = authHeader?.split(' ')?.[1]
        if (!token) return next(new Unauthorized('Unauthorized'))
        const { refreshToken } = req.cookies
        const session = await SessionRepository.getSession(refreshToken)
        if (!session) return next(new Unauthorized('Unauthorized'))
        try {
            req.user = await TokenService.verifyAccessToken(token)
        } catch (error) {
            return next(new Forbidden(error))
        }
        next()
    }

    static async verifyAccessToken(token: string) {
        return jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET))
    }

    static async verifyRefreshToken(token: string) {
        return jwt.verify(token, String(process.env.REFRESH_TOKEN_SECRET))
    }
}
