const errorTypes = require('../constants/error-types')
const errorHandler = (err, ctx) => {
    let status, message
    switch (err.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400
            message = '用户名或者密码不能为空'
            break
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409
            message = '该用户已存在！'
            break
        case errorTypes.USER_IS_NOT_EXISTS:
            status = 400
            message = '该用户不存在！'
            break
        case errorTypes.PASSWORD_IS_NOT_CORRECT:
            status = 400
            message = '密码不正确！'
            break
        case errorTypes.UNAUTHORIZATION:
            status = 401
            message = '未授权！'
            break
        case errorTypes.UNPERMISSION:
            status = 401
            message = '暂无权限！'
            break
        default:
            status = 404
            message = 'NOT FOUND'
    }
    ctx.status = status
    ctx.body = message
}

module.exports = {
    errorHandler
}
