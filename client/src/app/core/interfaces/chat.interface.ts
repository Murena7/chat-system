import { IUser } from '@core/interfaces/user.interface';

export interface INewMessageBody {
  text: string;
}

export interface IMessage extends INewMessageBody {
  user: IUser;
}
