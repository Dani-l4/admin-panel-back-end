import User from '../db/models/User.js'
import SessionRepository from '../repositories/Session.js'
import UserRepository from '../repositories/User.js'

export default class ResourceService {
    static async getUsers() {
        return await UserRepository.getAllUsers()
    }

    static async blockUsers(usersIds: string[]) {
        for (let id of usersIds) {
            let user = await UserRepository.getUserById(id)
            await SessionRepository.deleteSessionByUserId(id)
            user && (await UserRepository.blockUser(user))
        }
    }
    static async unBlockUsers(usersIds: string[]) {
        for (let id of usersIds) {
            let user = await UserRepository.getUserById(id)
            user && (await UserRepository.unBlockUser(user))
        }
    }
    static async deleteUsers(usersIds: string[]) {
        for (let id of usersIds) {
            let user = await UserRepository.getUserById(id)
            await SessionRepository.deleteSessionByUserId(id)
            user && (await UserRepository.deleteUser(user))
        }
    }
}
