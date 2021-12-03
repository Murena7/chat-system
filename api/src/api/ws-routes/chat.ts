import { Socket } from 'socket.io';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { IBasicResponse, ResponseStatusMessage } from '../../interfaces/response.interface';
import { Joi } from 'celebrate';
import { User } from '@/entity/user';
import ChatService from '@/services/chat.service';
import { IMessage, INewMessageBody } from '@/interfaces/message.interface';

export default async (socket: Socket): Promise<void> => {
  //// Chat
  socket.on('chat:message', async (body: INewMessageBody) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling chat:message ws');

    const joiBodyValidator = Joi.object({
      text: Joi.string().required(),
    });

    try {
      const currentUser: User = (socket?.request as any)?.user;
      if (!currentUser) {
        throw new Error('Wrong User');
      }
      const chatService = Container.get(ChatService);
      await joiBodyValidator.validateAsync(body);
      const result: IBasicResponse<IMessage[]> = await chatService.sendMessage(body, currentUser);
      socket.broadcast.emit('$chat:messages', result);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      socket.emit('$error', { status: ResponseStatusMessage.Error, errorMessage: e } as IBasicResponse);
    }
  });
};
