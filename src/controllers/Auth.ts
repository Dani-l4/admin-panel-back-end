import { Request, Response } from 'express-serve-static-core'
import AuthService from '../services/Auth.js'
import ErrorUtils from '../utils/Errors.js'
import { COOKIE_SETTINGS } from '../constants.js'

export default class AuthController {
    static async signIn(req: Request, res: Response) {
        try {
            const { accessToken, refreshToken, accessTokenExpiration } =
                await AuthService.signIn(req.body)
            res.cookie(
                'refreshToken',
                refreshToken,
                COOKIE_SETTINGS.REFRESH_TOKEN
            )
            res.status(200).json({
                accessToken,
                accessTokenExpiration,
            })
        } catch (e) {
            return ErrorUtils.catchError(res, e)
        }
    }

    static async signUp(req: Request, res: Response) {
        try {
            const { accessToken, refreshToken, accessTokenExpiration } =
                await AuthService.signUp(req.body)
            res.cookie(
                'refreshToken',
                refreshToken,
                COOKIE_SETTINGS.REFRESH_TOKEN
            )
            res.status(200).json({
                accessToken,
                accessTokenExpiration,
                email: req.body.email,
            })
        } catch (e) {
            return ErrorUtils.catchError(res, e)
        }
    }

    static async logOut(req: Request, res: Response) {
        const refreshToken: string = req.cookies.refreshToken
        try {
            AuthService.logOut(refreshToken)
            res.clearCookie('refreshToken')
            return res.sendStatus(200)
        } catch (e) {
            return ErrorUtils.catchError(res, e)
        }
    }

    static async refresh(req: Request, res: Response) {
        const currentRefreshToken: string = req.cookies.refreshToken
        try {
            const { accessToken, refreshToken, accessTokenExpiration, email } =
                await AuthService.refresh(currentRefreshToken)
            res.cookie(
                'refreshToken',
                refreshToken,
                COOKIE_SETTINGS.REFRESH_TOKEN
            )
            res.status(200).json({ accessToken, accessTokenExpiration, email })
        } catch (e) {
            ErrorUtils.catchError(res, e)
        }
    }
}
