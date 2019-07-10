const Koa = require('koa')
const app = new Koa()
const connect = require('./config/connect')
const UserModel = require('./schema/user')
const Crypt = require('./config/crypt')

    ; (async () => {
        await connect()

        const UserEntity = new UserModel({
            name: '张楠',
            account: '18565354169',
            password: '54637'
        })
        UserEntity.password = Crypt.encrypt(UserEntity.password)
        UserEntity.save().then(() => console.log('成功存入一枚用户')).catch(() => console.log('存入用户失败'))
        // let res = await UserModel.find({})
    })()

app.use(async (ctx) => {
    ctx.body = '<h1>你好Koa2</h1>'
})

app.listen(3000, () => {
    console.log('koa服务已启动')
})