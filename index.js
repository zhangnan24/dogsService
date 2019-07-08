const Koa = require('koa')
const app = new Koa()

app.use(async(ctx)=>{
    ctx.body = '<h1>你好Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('koa服务已启动')
})