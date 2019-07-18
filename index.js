const Koa = require('koa')
const app = new Koa()
const connect = require('./config/connect')
const bodyParser = require('koa-bodyparser')()
const cors = require('koa2-cors')()
const apiMiddleware = require('./config/api')

    ; (async () => {
        await connect()
        app.use(bodyParser)
        app.use(cors)
        app.use(apiMiddleware)
    })()

app.listen(3000, () => {
    console.log('koa服务已启动')
})