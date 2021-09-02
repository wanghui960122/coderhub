const { login } = require('../service/auth.service')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
class AuthController {
    async login(ctx, next) {
        // ctx.user
        const { id, name } = ctx.user
        const token = jwt.sign({id, name}, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24 * 1000,
            algorithm: 'RS256'
        })
        ctx.body = {
            id,
            name,
            token
        }
        // await login(user)
    }

    async success(ctx, next) {
        ctx.body = '验证成功'
    }
}

module.exports = new AuthController()
