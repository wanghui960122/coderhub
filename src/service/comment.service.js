const connection = require('../app/database')
const create = async (momentId, content, id) => {
    const statement = 'INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?);'
    const [result] = await connection.execute(statement, [content, momentId, id])
    return result
}

const reply = async (momentId, content, commentId, id) => {
    const statement = 'INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [content, momentId, id, commentId])
    return result
}

const update = async (commentId, content) => {
    const statement = 'UPDATE comment SET content = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [content, commentId])
    return result
}

const remove = async (commentId) => {
    const statement = 'DELETE FROM comment WHERE id = ?;'
    const [result] = await connection.execute(statement, [commentId])
    return result
}

const list = async (momentId) => {
    const statement = 'SELECT c.id, c.content, c.comment_id FROM comment c WHERE c.moment_id = ?;'
    const [result] = await connection.execute(statement, [momentId])
    return result
}

module.exports = {
    create,
    reply,
    update,
    remove,
    list
}
