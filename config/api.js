const router = require('koa-router')()
const UserModel = require('../schema/user')
const Crypt = require('./crypt')

// 获取所有用户
router.get('api/users', async (ctx) => {
    ctx.response.type = 'application/json'
    // ctx.response.body = await UserModel.find({})
    ctx.response.body = '成功get'
})

// 新增一名用户
router.post('/api/users', async (ctx) => {
    const UserEntity = new UserModel(ctx.request.body)
    UserEntity.password = Crypt.encrypt(UserEntity.password)
    await UserEntity.save()
        .then((res) => {
            ctx.body = {
                code: 200,
                msg: 'register successfuly'
            };
            console.log(ctx.body)
            console.log(res, 'register successfuly')
        })
        .catch((err) => {
            ctx.body = {
                code: 500,
                msg: err
            };
            console.log(err, 'fail to register')
        })
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

module.exports = router.routes()