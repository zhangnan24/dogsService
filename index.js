const Koa = require("koa");
const app = new Koa();
const connect = require("./config/connect");
const https = require("https");
const fs = require("fs");
const bodyParser = require("koa-bodyparser")();
const cors = require("koa2-cors")();
const apiMiddleware = require("./config/api");
const koajwt = require("koa-jwt");
const sslOption = {
  key: fs.readFileSync("./config/tencent.key"),
  cert: fs.readFileSync("./config/tencent.crt")
};

(async () => {
  await connect();
  app.use(bodyParser);
  app.use(cors);
  app.use(
    koajwt({ secret: "my-token" }).unless({
      path: [/\/register/, /\/login/, /\/qiniuToken/, /\/posts/, /\/queries/]
    })
  );
  app.use(apiMiddleware);
})();

// app.listen(3000, () => {
//   console.log("koa服务已启动");
// });

https.createServer(sslOption, app.callback()).listen(3000, () => {
  console.log("koa服务已启动");
});
