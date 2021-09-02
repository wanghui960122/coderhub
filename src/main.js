const config = require('./app/config')
const app = require('./app')

app.listen(process.env.APP_PORT, () => {
    console.log('服务器启动成功', process.env.APP_PORT)
})
