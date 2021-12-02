import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { Logger } from 'winston';
import { Container } from 'typedi';
import { IBasicResponse } from '@/interfaces/response.interface';
const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/me', middlewares.checkAuth(), async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /user/me endpoint');
    try {
      const user = { ...req.user };
      Reflect.deleteProperty(user, 'password');
      const apiResponse: IBasicResponse = { data: user };
      return res.json(apiResponse).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
