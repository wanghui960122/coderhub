const Router = require('koa-router')
const { avatarHandler, pictureHandler } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')
const { saveAvatar, savePicture, pictureResize } = require('../controller/file.controller')

const FileRouter = new Router({
    prefix: '/upload'
})


FileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatar)
FileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePicture)


module.exports = FileRouter
