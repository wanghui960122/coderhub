const errorTypes = require('../constants/error-types')
const { getUserByName } = require('../service/user.service')
const { md5Password } = require('../utils/password-handle')
const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body
    // 验证用户名或密码不能为空
    if (!name || !password) {
        const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', err, ctx)
    }

    const result = await getUserByName(name)
    if (result.length) {
        const err = new Error(errorTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', err, ctx)
    }
    // 验证用户名重复
    await next()
}

const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body
    ctx.request.body.password = md5Password(password)
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}
