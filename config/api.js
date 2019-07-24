const router = require("koa-router")();
const UserModel = require("../schema/user");
const PostModel = require("../schema/post");
const Crypt = require("./crypt");
const jwt = require("jsonwebtoken");
const qiniu = require("qiniu");

// 新增一名用户
router.post("/register", async ctx => {
  const UserEntity = new UserModel(ctx.request.body);
  console.log(ctx.request.body);
  UserEntity.password = Crypt.encrypt(UserEntity.password);
  await UserEntity.save()
    .then(() => {
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
        const token = jwt.sign({ userID: res._id }, "my-token", {
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
  await UserModel.findOne({ account: ctx.params.account })
    .then(res => {
      ctx.body = res;
    })
    .catch(() => {
      ctx.body = { code: 404, msg: "can not found userInfo" };
    });
});

// 新增一条帖子
router.post("/posts", async ctx => {
  const PostEntity = new PostModel(ctx.request.body);
  PostEntity.author = ctx.state.user.userID;
  await PostEntity.save()
    .then(() => {
      ctx.body = {
        code: 200,
        msg: "send post successfuly"
      };
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        msg: err
      };
    });
});

// 获取全部帖子
router.get("/posts", async ctx => {
  await PostModel.find({})
    .populate("author", "account avatar")
    .then(res => {
      ctx.body = res.reverse();
    })
    .catch(err => {
      ctx.body = err;
    });
});

// 更新指定用户的头像
router.put("/users/:account", async ctx => {
  const account = ctx.param.account;
  //   await UserModel.findOneAndUpdate
  //
  //
  ctx.response.type = "application/json";
  ctx.response.body = "更新成功";
});

// 获取七牛云上传token
router.get("/qiniuToken", async ctx => {
  const accessKey = "6m0Zwzkikn5M39HegV_nNxJb11BYsYu9NGx9Jwd3";
  const secretKey = "-Ya6KM23IExTrLVuBGWUDLZLylynB-0FSXnDkKXg";
  const bucket = "self";

  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: bucket,
    expires: 3600 * 24
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  ctx.body = uploadToken
    ? { code: 200, qiniuToken: uploadToken }
    : { code: 400 };
});

module.exports = router.routes();
