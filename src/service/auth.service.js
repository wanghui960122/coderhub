const mysql2 = require('mysql2')

const connection = require('../app/database')

class AuthService {
    async checkResource(id, userId, tableName) {
        console.log(tableName)
        const statement = `SELECT * FROM ${tableName} WHERE id = ?;`
        const [result] = await connection.execute(statement, [id])
        // console.log(result)
        if (result[0].user_id == userId) {
            return true
        } else {
            return false
        }
    }
}

module.exports = new AuthService()
