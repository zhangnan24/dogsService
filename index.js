const Koa = require('koa')
const app = new Koa()
const bodyParser = reqire('koa-bodyparser')
const connect = require('./config/connect')
const apiMiddleware = require('./config/api')

    ; (async () => {
        await connect()
        app.use(bodyParser())
        app.use(apiMiddleware())
    })()

app.use(async (ctx) => {
    ctx.body = '<h1>你好Koa2</h1>'
})

app.listen(3000, () => {
    console.log('koa服务已启动')
})