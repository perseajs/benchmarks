const { randomBytes } = require('crypto');

const Koa = require('koa');
const router = require('koa-router')();
const body = require('koa-parse-json');

const app = new Koa();

app.use(body());

app.use(async (ctx, next) => {
  ctx.request.requestId = randomBytes(16).toString('hex');
  console.log(`${new Date().toISOString()} ${ctx.request.requestId} -> ${ctx.request.method} ${ctx.request.path}`);

  await next();

  console.log(`${new Date().toISOString()} ${ctx.request.requestId} <- ${ctx.request.method} ${ctx.request.path}`);
});

router.get('/v1/echo', function (ctx) {
	ctx.body = 'hello world';
});

router.post('/v1/echo', function (ctx) {
	ctx.body = ctx.request.body;
});

router.get('/v1/echo/:id', function (ctx) {
	ctx.body = { id: ctx.params.id };
});

app.use(router.routes());

app.listen(8080);
