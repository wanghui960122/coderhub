const Router = require('koa-router')
const { create, list } = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const LaberRouter = new Router({
    prefix: '/label'
})

LaberRouter.post('/', verifyAuth, create)
LaberRouter.get('/', list)
LaberRouter.patch('/', list)
LaberRouter.delete('/', list)


module.exports = LaberRouter
