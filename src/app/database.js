const mysql2 = require('mysql2')
const connection = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: 10
})

connection.getConnection((err, conn) => {
    conn.connect(err => {
        if (err) {
           throw err
        } else {
            console.log('连接成功')
        }
    })
})

module.exports = connection.promise()
