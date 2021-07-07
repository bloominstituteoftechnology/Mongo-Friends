import { Router } from 'express';
import friendsRouter from './Friends';

const mainRouter = Router({ mergeParams: true });

mainRouter.use('/friends', friendsRouter);

export default mainRouter;
