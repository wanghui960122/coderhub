const { createAvatar, createPicture } = require('../service/file.service')
const { updateAvatarUrl } = require('../service/user.service')
const path = require('path')
const Jimp = require('jimp')
class FileController {
    async saveAvatar(ctx, next) {
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user
        const result = await createAvatar(filename, mimetype, size, id)
        const avatarUrl = `${process.env.APP_HOST}:${process.env.APP_PORT}/users/${id}/avatar`
        await updateAvatarUrl(id, avatarUrl)
        ctx.body = result
    }

    async savePicture(ctx, next) {
        const files = ctx.req.files
        const { id } = ctx.user
        const { momentId } = ctx.query
        for (let file of files) {
            const { filename, mimetype, size } = file
            await createPicture(filename, mimetype, size, id, momentId)
        }
        ctx.body = '上传成功'
    }

    async pictureResize(ctx, next) {
        const files = ctx.req.files
        for (let file of files) {
            const destPath = path.resolve(file.destination, file.filename)
            Jimp.read(file.path).then(image => {
                image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
                image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
                image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
            })
        }
        await next()
    }
}

module.exports = new FileController()
