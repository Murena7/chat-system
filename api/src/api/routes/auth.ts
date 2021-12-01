import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import passport from 'passport';
import { IBasicResponse, ResponseStatusMessage } from '@/interfaces/response.interface';
import AuthService from '@/services/auth.service';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/sign-up',
    celebrate({
      body: Joi.object({
        username: Joi.string().max(100).required(),
        password: Joi.string().max(100).required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint');
      try {
        const authServiceInstance = Container.get(AuthService);

        await authServiceInstance.SignUp(req.body);

        const apiResponse: IBasicResponse = { status: ResponseStatusMessage.Success };

        return res.status(201).json(apiResponse);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/login',
    celebrate({
      body: Joi.object({
        username: Joi.string().max(100).required(),
        password: Joi.string().max(100).required(),
      }),
    }),
    passport.authenticate('local', { failWithError: true }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling login endpoint');
      try {
        const user = req.user;
        const apiResponse: IBasicResponse = { data: user };
        return res.json(apiResponse).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post('/logout', middlewares.checkAuth(), async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //PassportJS Logout
      req.logout();
      const apiResponse: IBasicResponse = { status: ResponseStatusMessage.Success };
      return req.session.destroy(() => {
        return res.clearCookie('connect.sid').status(200).json(apiResponse);
      });
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
