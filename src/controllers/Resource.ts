import ResourceService from '../services/Resourse.js'
import { iReqWUser, iResWUser } from '../types.js'

export default class ResourceController {
    static async users(req: iReqWUser, res: iResWUser) {
        const users = await ResourceService.getUsers()
        return res.status(200).json({ users })
    }

    static async blockUsers(req: iReqWUser, res: iResWUser) {
        await ResourceService.blockUsers(req.body)
        const blockHimSelf: boolean = req.body.includes(req.user.id)
        if (blockHimSelf) {
            res.clearCookie('refreshToken')
        }
        return res.status(200).json({ redirect: blockHimSelf })
    }

    static async unBlockUsers(req: iReqWUser, res: iResWUser) {
        await ResourceService.unBlockUsers(req.body)
        return res.sendStatus(200)
    }

    static async deleteUsers(req: iReqWUser, res: iResWUser) {
        await ResourceService.deleteUsers(req.body)
        const deleteHimSelf: boolean = req.body.includes(req.user.id)
        if (deleteHimSelf) {
            res.clearCookie('refreshToken')
        }
        return res.status(200).json({ redirect: deleteHimSelf })
    }
}
