const router = require('koa-router')()
const UserModel = require('./schema/user')
const Crypt = require('./config/crypt')

// 获取所有用户
router.get('api/users', async (ctx) => {
    ctx.response.type = 'application/json'
    ctx.response.body = await UserModel.find({})
})

// 新增一名用户
router.post('/api/users', async (ctx) => {
    const UserEntity = new UserModel({
        account: ctx.request.body.account,
        password: ctx.request.body.password
    })
    UserEntity.password = Crypt.encrypt(UserEntity.password)
    UserEntity.save()
        .then(() => console.log('add user successfuly'))
        .catch(() => console.log('fail to add user'))
    ctx.response.type = 'application/json'
    ctx.response.body = '注册成功'
})

// 获取指定用户的信息
router.get('/api/users/:account', async (ctx) => {
    const account = ctx.param.account
    ctx.response.type = 'application/json'
    await UserModel.findOne({ 'account': account }, (err, res) => {
        ctx.response.body = res
    })
})

// 更新指定用户的信息
router.put('/api/users/:account', async (ctx) => {
    const account = ctx.param.account
    //
    //
    ctx.response.type = 'application/json'
    ctx.response.body = '更新成功'
})

modules.exports = router.routes