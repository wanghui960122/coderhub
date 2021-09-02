const errorTypes = require('../constants/error-types')
const { getUserByName } = require('../service/user.service')
const { md5Password } = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const { checkResource } = require('../service/auth.service')

const jwt = require('jsonwebtoken')

const verifyLogin = async (ctx, next) => {
    // 判断用户名和密码是否为空
    const { name, password } = ctx.request.body
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }

    const result = await getUserByName(name)
    if (!result.length) {
        const err = new Error(errorTypes.USER_IS_NOT_EXISTS)
        return ctx.app.emit('error', err, ctx)
    }
    if (md5Password(password) !== result[0].password) {
        const err = new Error(errorTypes.PASSWORD_IS_NOT_CORRECT)
        return ctx.app.emit('error', err, ctx)
    }
    ctx.user = result[0]
    await next()
}

const verifyAuth = async (ctx, next) => {
    const authorization = ctx.headers.authorization
    if (!authorization) {
        const err = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', err, ctx)
    }
    const token = authorization.replace('Bearer ', '')
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithm: 'RS256'
        })
        ctx.user = result
        await next()
    } catch (e) {
        console.log(e)
        const err = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error', err, ctx)
    }
}

const verifyPermission = async (ctx, next) => {
    const { id } = ctx.user
    const [resourceKey] = Object.keys(ctx.params)
    const resourceId  = ctx.params[resourceKey]
    const tableName = resourceKey.replace('Id', '')
    const isPermission = await checkResource(resourceId, id, tableName)
    if (!isPermission) {
        const err = new Error(errorTypes.UNPERMISSION)
        return ctx.app.emit('error', err, ctx)
    }
    await next()
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}
