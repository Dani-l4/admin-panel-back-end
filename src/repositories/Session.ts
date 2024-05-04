import Session from '../db/models/Session.js'

export default class SessionRepository {
    static async createSession(userId: string, refreshToken: string) {
        await Session.create({
            userId,
            refreshToken,
        })
    }

    static async getSession(refreshToken: string) {
        const find = await Session.findOne({
            where: {
                refreshToken,
            },
        })
        if (!find) return null
        return find
    }

    static async deleteSession(refreshToken: string) {
        await Session.destroy({
            where: {
                refreshToken,
            },
        })
    }

    static async deleteSessionByUserId(userId: string) {
        await Session.destroy({
            where: {
                userId,
            },
        })
    }
}
