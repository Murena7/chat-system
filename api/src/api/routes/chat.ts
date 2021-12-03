import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { Logger } from 'winston';
import { Container } from 'typedi';
import { IBasicResponse } from '@/interfaces/response.interface';
import ChatService from '@/services/chat.service';
const route = Router();

export default (app: Router) => {
  app.use('/chat', route);

  route.get('/history', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /chat/history endpoint');
    try {
      const chatService = Container.get(ChatService);
      const result: IBasicResponse = await chatService.latestMessages();
      return res.json(result).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
