const { create, getDetail, getList, update, deleteMom, hasLabel, addLabel } = require('../service/moment.service')
const { getFileInfo } = require('../service/file.service')
const fs = require('fs')
class MomentController {
    async create(ctx, next) {
        // ctx.body = '发表动态成功'
        const userId = ctx.user.id
        const content = ctx.request.body.content
        const result = await create(userId, content)
        ctx.body = result
    }
    async detail(ctx, next) {
        const { momentId } = ctx.params
        const result = await getDetail(momentId)
        ctx.body = result
    }
    async list(ctx, next) {
        const { offset, size } = ctx.query
        const result = await getList(offset, size)
        ctx.body = result
    }
    async update(ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        const result = await update(momentId, content)
        ctx.body = result
    }
    async deleteMoment(ctx, next) {
        const { momentId } = ctx.params
        const result = await deleteMom(momentId)
        ctx.body = result
    }
    async createLabel(ctx, next) {
        const { labels } = ctx
        const { momentId } = ctx.params
        for (let label of labels) {
            const isExist = await hasLabel(momentId, label.id)
            if (!isExist) {
                await addLabel(momentId, label.id)
            }
        }
        ctx.body = '添加标签'
    }

    async fileInfo (ctx, next) {
        try {
            let { filename } = ctx.params
            const fileInfo = await getFileInfo(filename)
            const { type } = ctx.query
            const types = ['small', 'middle', 'large']
            if (types.some(item => item === type)) {
                filename = filename + '-' + type
            }
            ctx.response.set('content-type', fileInfo.mimetype)
            ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new MomentController()

