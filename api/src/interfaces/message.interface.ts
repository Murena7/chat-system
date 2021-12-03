import { User } from '@/entity/user';

export interface INewMessageBody {
  text: string;
}

export interface IMessage extends INewMessageBody {
  user: User;
}
