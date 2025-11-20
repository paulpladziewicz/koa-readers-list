import dotEnv from 'dotenv';
dotEnv.config();
import Koa from 'koa';
import cors from '@koa/cors';
import json from 'koa-json';
import koaBody from 'koa-body';
import connectDB from './config/db';
import router from './middleware/router';

const PORT = process.env.PORT || 5003;
const Environments = {
  DEVELOPMENT: 'development',
  PROD: 'prod'
}

const app = new Koa();
app.use(json());
app.use(koaBody());

if (process.env.NODE_ENV === Environments.DEVELOPMENT) {
  app.use(cors({ origin: '*' }));
}

connectDB();

// App Fallback Global Error Handling
app.use(async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}...`)
);
