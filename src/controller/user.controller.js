const { creat } = require('../service/user.service')
const { getAvatar } = require('../service/file.service')
const fs = require('fs')

class UserController {
    async creat(ctx, next) {
        const user = ctx.request.body
        const result = await creat(user)
        ctx.body = result
    }

    async avatarInfo(ctx, next) {
        const { userId } = ctx.params
        const result = await getAvatar(userId)
        ctx.response.set('content-type', result.mimetype)
        ctx.body = fs.createReadStream(`./uploads/avatar/${result.filename}`)
    }
}

module.exports = new UserController()
