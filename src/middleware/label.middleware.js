const { isExistLabel, create } = require('../service/label.service')
const verifyLabelExists = async (ctx, next) => {
    const { labels } = ctx.request.body
    const newLabels = []
    for (let name of labels) {
        const isExist = await isExistLabel(name)
        const label = {
            name
        }
        if (!isExist) {
            const result = await create(name)
            label.id = result.insertId
        } else {
            label.id = isExist.id
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
}

module.exports = {
    verifyLabelExists
}
