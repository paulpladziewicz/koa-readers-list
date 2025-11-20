import Koa from 'koa';
import Router from 'koa-router';
import auth from './auth';
import AuthController from '../controllers/AuthController';
import NYTimesController from '../controllers/NYTimesController';
import ListController from '../controllers/ListController';

const router = new Router({ prefix: '/api' });

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = { message: 'Readers List API is healthy.' };
});

router
  .get('/user', auth, AuthController.user)
  .post('/login', AuthController.login)
  .post('/register', AuthController.register);

router.get('/nytimes-bestsellers', NYTimesController.bestSellers);

router
  .get('/booklist', ListController.getAllBooksByUserId)
  .post('/booklist', ListController.addBookToList)
  .put('/booklist/:bookId', ListController.updateBookOnList)
  .delete('/booklist/:bookId', ListController.deleteBookOnList);

export default router;
