const connection = require('../app/database')
class MomentService {
    async create(userId, content) {
        const statement = 'INSERT INTO moment (`user_id`, `content`) VALUES(?, ?);';
        const result = await connection.execute(statement, [userId, content])
        return result[0]
    }
    async getDetail(momentId) {
        const statement = `
            SELECT 
            m.id id, 
            m.content content, 
            m.createAt createTime, 
            m.updateAt updateTime,
            JSON_OBJECT('id', u.id, 'name', u.\`name\`, 'avatarUrl', u.avatar_url) user,
            (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'user', JSON_OBJECT('id', cu.id, 'name', cu.\`name\`, 'avatarUrl', cu.avatar_url))), NULL) FROM comment c LEFT JOIN users cu ON cu.id = c.user_id WHERE m.id = c.moment_id) comments,
            IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.\`name\`)), NULL) labels,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) images
            FROM moment m 
            LEFT JOIN users u ON u.id = m.user_id 
            LEFT JOIN moment_label ml ON ml.moment_id = m.id
            LEFT JOIN label l ON l.id = ml.label_id
            WHERE m.id = ?;
        `;
        const [result] = await connection.execute(statement, [momentId])
        return result[0]
    }
    async getList(offset, size) {
        const statement = `
        SELECT
            m.id id,
            m.content content,
            m.createAt createTime,
            m.updateAt updateTime,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) momentCount,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
            JSON_OBJECT('id', u.id, 'name', u.\`name\`) user
        FROM moment m LEFT JOIN users u ON u.id = m.user_id LIMIT ?, ?;
        `;
        const [result] = await connection.execute(statement, [offset, size])
        return result
    }
    async update(momentId, content) {
        const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
        const [result] = await connection.execute(statement, [content, momentId])
        return result
    }

    async deleteMom(momentId) {
        const statement = 'DELETE FROM moment WHERE id = ?;'
        const [result] = await connection.execute(statement, [momentId])
        return result
    }

    async hasLabel(momentId, label) {
        const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
        const [result] = await connection.execute(statement, [momentId, label])
        return result[0] ? true : false
    }

    async addLabel(momentId, label) {
        const statement = 'INSERT moment_label (moment_id, label_id) VALUES(?, ?);'
        const [result] = await connection.execute(statement, [momentId, label])
        return result
    }
}

module.exports = new MomentService()
