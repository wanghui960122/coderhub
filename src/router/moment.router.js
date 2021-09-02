const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, detail, list, update, deleteMoment, createLabel, fileInfo } = require('../controller/moment.controller')
const { verifyLabelExists } = require('../middleware/label.middleware')
const MomentRouter = new Router({
    prefix: '/moment'
})

MomentRouter.post('/', verifyAuth, create)
MomentRouter.post('/:momentId/label', verifyAuth, verifyPermission, verifyLabelExists, createLabel)
MomentRouter.get('/', list)
MomentRouter.get('/:momentId', detail)
MomentRouter.patch('/:id', verifyAuth, verifyPermission, update)
MomentRouter.delete('/:id', verifyAuth, verifyPermission, deleteMoment)
MomentRouter.get('/images/:filename', fileInfo)


module.exports = MomentRouter
