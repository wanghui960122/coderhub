const mysql2 = require('mysql2')
const connection = require('../app/database')

class UserService {
    async creat(user) {
        const { name, password } = user
        const statement = 'INSERT INTO users (`name`, `password`) VALUES(?, ?);'
        const result = await connection.execute(statement, [name, password])
        return result[0]
    }

    async getUserByName(name) {
        const statement = 'SELECT * FROM users WHERE `name` = ?;'
        const result = await connection.execute(statement, [name])
        return result[0]
    }

    async updateAvatarUrl(id, url) {
        const statement = 'UPDATE users SET avatar_url = ? WHERE id = ?'
        const [result] = await connection.execute(statement, [url, id])
        return result
    }
}

module.exports = new UserService()
