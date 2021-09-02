const { create, reply, update, remove, list } = require('../service/comment.service')
class CommentController {
    async create(ctx, next) {
        const {momentId, content} = ctx.request.body
        const { id } = ctx.user
        const result = await create(momentId, content, id)
        ctx.body = result;
    }
    async reply(ctx, next) {
        const {momentId, content} = ctx.request.body
        const { commentId } = ctx.params
        const { id } = ctx.user
        const result = await reply(momentId, content, commentId, id)
        ctx.body = result
    }

    async update(ctx, next) {
        const { commentId } = ctx.params
        const { content } = ctx.request.body
        const result = await update(commentId, content)
        ctx.body = result
    }

    async remove(ctx, next) {
        const { commentId } = ctx.params
        const result = await remove(commentId)
        ctx.body = result
    }

    async list(ctx, next) {
        const { momentId } = ctx.query
        const result = await list(momentId)
        ctx.body = result
    }
}
module.exports = new CommentController()
