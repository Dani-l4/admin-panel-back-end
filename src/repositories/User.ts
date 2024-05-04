import User from '../db/models/User.js'
import Session from '../db/models/Session.js'

interface iUser {
    id: string
    name: string
    email: string
    password: string
    registeredAt: Date
    lastLogin: Date
    status: string
}
export default class UserRepository {
    static async createUser(
        name: string,
        email: string,
        hashedPassword: string
    ) {
        return await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        })
    }

    static async getUser(email: string): Promise<User | null> {
        const find = await User.findOne({
            where: {
                email: email,
            },
        })
        if (!find) return null
        return find
    }

    static async getUserById(id: string): Promise<User | null> {
        return await User.findOne({
            where: {
                id,
            },
        })
    }

    static async getAllUsers(): Promise<iUser[] | []> {
        return await User.findAll({
            attributes: [
                'id',
                'name',
                'email',
                'createdAt',
                'lastLogin',
                'status',
            ],
        })
    }

    static async blockUser(user: User) {
        user.status = 'BLOCKED'
        return await user.save()
    }

    static async unBlockUser(user: User) {
        user.status = 'ACTIVE'
        return await user.save()
    }

    static async deleteUser(user: User) {
        return await user.destroy()
    }

    static async updateLastLogin(user: User) {
        user.lastLogin = new Date()
        return await user.save()
    }
}
