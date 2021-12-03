import { Container, Inject, Service } from 'typedi';
import { EntityManager, getManager } from 'typeorm';
import { User } from '@/entity/user';
import { IBasicResponse } from '@/interfaces/response.interface';
import { IMessage, INewMessageBody } from '@/interfaces/message.interface';
import { Message } from '@/entity/message';

@Service()
export default class ChatService {
  dbEntityManager: EntityManager;

  constructor(@Inject('logger') private logger) {
    this.dbEntityManager = getManager('default');
  }

  public async sendMessage(body: INewMessageBody, currentUser: User): Promise<IBasicResponse<IMessage[]>> {
    try {
      const newMessage = this.dbEntityManager.create(Message, {
        text: body.text,
        user: currentUser,
      } as IMessage);
      await newMessage.save();

      return { data: [newMessage] };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async latestMessages(): Promise<IBasicResponse<IMessage[]>> {
    try {
      const messages = await this.dbEntityManager.find(Message, {
        relations: ['user'],
        loadRelationIds: false,
        take: 20,
        order: { createdAt: 'DESC' },
      });

      return { data: messages?.reverse() };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
