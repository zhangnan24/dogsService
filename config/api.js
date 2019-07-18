const router = require("koa-router")();
const UserModel = require("../schema/user");
const Crypt = require("./crypt");
const jwt = require("jsonwebtoken");

// 获取所有用户
router.get("api/users", async ctx => {
  ctx.response.type = "application/json";
  // ctx.response.body = await UserModel.find({})
  ctx.response.body = "成功get";
});

// 新增一名用户
router.post("/register", async ctx => {
  const UserEntity = new UserModel(ctx.request.body);
  UserEntity.password = Crypt.encrypt(UserEntity.password);
  await UserEntity.save()
    .then(res => {
      ctx.body = {
        code: 200,
        msg: "register successfuly"
      };
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        msg: err
      };
    });
});

// 登录校验
router.post("/login", async ctx => {
  const data = ctx.request.body;
  await UserModel.findOne({ account: data.account })
    .then(res => {
      const checkPassword = Crypt.decrypt(data.password, res.password);
      if (checkPassword) {
        const token = jwt.sign({ account: res.account }, "my-token", {
          expiresIn: "2h"
        });
        ctx.body = { code: 200, msg: "successfuly login", token: token };
      } else {
        ctx.body = { code: 500, msg: "wrong password" };
      }
    })
    .catch(() => {
      ctx.body = { code: 501, msg: "user does not exist" };
    });
});

// 获取指定用户的信息
router.get("/users/:account", async ctx => {
  const account = ctx.param.account;
  ctx.response.type = "application/json";
});

// 更新指定用户的信息
router.put("/users/:account", async ctx => {
  const account = ctx.param.account;
  //
  //
  ctx.response.type = "application/json";
  ctx.response.body = "更新成功";
});

module.exports = router.routes();
