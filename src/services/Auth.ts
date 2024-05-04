import bcrypt from 'bcryptjs'
import UserRepository from '../repositories/User.js'
import { Conflict, Forbidden, NotFound, Unauthorized } from '../utils/Errors.js'
import TokenService from './Token.js'
import SessionRepository from '../repositories/Session.js'
import { ACCESS_TOKEN_EXPIRATION } from '../constants.js'
import { iSignInReq } from '../types.js'

export default class AuthService {
    static async signIn({ email, password }: iSignInReq) {
        const userData = await UserRepository.getUser(email)
        if (!userData) throw new NotFound('No such user')
        const isPasswordValid = bcrypt.compareSync(password, userData.password)
        if (!isPasswordValid) throw new Unauthorized('Incorrect email/password')
        if (userData.status === 'BLOCKED') throw new Forbidden('User blocked')
        await UserRepository.updateLastLogin(userData)
        const payload = { id: userData.id, email: userData.email }
        const accessToken = await TokenService.generateAccessToken(payload)
        const refreshToken = await TokenService.generateRefreshToken(payload)
        await SessionRepository.createSession(userData.id, refreshToken)
        return {
            accessToken,
            refreshToken,
            accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
        }
    }
    static async signUp({ name, email, password }: iSignInReq) {
        const userData = await UserRepository.getUser(email)
        if (userData) {
            throw new Conflict('User with provided email already exist')
        }
        const hashedPassword = bcrypt.hashSync(password, 8)
        const { id } = await UserRepository.createUser(
            name || 'No Name',
            email,
            hashedPassword
        )
        const payload = { id, email }
        const accessToken = await TokenService.generateAccessToken(payload)
        const refreshToken = await TokenService.generateRefreshToken(payload)
        await SessionRepository.createSession(id, refreshToken)
        return {
            accessToken,
            refreshToken,
            accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
        }
    }

    static async logOut(refreshToken: string) {
        await SessionRepository.deleteSession(refreshToken)
    }

    static async refresh(currentRefreshToken: string) {
        const session = await SessionRepository.getSession(currentRefreshToken)
        if (!session) {
            throw new Unauthorized('Unauthorized')
        }
        await SessionRepository.deleteSession(currentRefreshToken)
        let payload: any
        try {
            payload = await TokenService.verifyRefreshToken(currentRefreshToken)
        } catch (error) {
            throw new Forbidden('Forbidden')
        }
        const accessToken = await TokenService.generateAccessToken({
            id: payload.id,
            email: payload.email,
        })
        const refreshToken = await TokenService.generateRefreshToken({
            id: payload.id,
            email: payload.email,
        })
        await SessionRepository.createSession(payload.id, refreshToken)
        return {
            accessToken,
            refreshToken,
            accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
            email: payload.email,
        }
    }
}
