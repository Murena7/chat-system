import { Injectable } from '@angular/core';
import { SocketNameSpace } from '@core/socketio/socketio';
import { environment } from '@environment';
import { Observable, tap } from 'rxjs';
import { IBasicResponse } from '@core/interfaces/core.interface';
import { IMessage, INewMessageBody } from '@core/interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  infoRoom = new SocketNameSpace({ url: environment.wsUrl + '/chat' });

  constructor() {}

  connectToRoom(): void {
    this.infoRoom = new SocketNameSpace({ url: environment.wsUrl + '/chat' });
  }

  $chatMessages(): Observable<IBasicResponse<IMessage[]>> {
    return this.infoRoom.fromEvent<IBasicResponse<IMessage[]>>('$chat:messages');
  }

  $error(): Observable<IBasicResponse<any>> {
    return this.infoRoom.fromEvent<IBasicResponse<any>>('$error');
  }

  emitMesage(body: INewMessageBody): void {
    this.infoRoom.emit('chat:message', body);
  }

  destroy(): void {
    this.infoRoom.disconnect();
  }
}
