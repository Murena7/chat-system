import { Injectable } from '@angular/core';
import { HttpService } from '@core/common-services/http.service';
import { Observable } from 'rxjs';
import { IMessage } from '@core/interfaces/chat.interface';
import { IBasicResponse } from '@core/interfaces/core.interface';
import { environment } from '@environment';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpService) {}

  getHistory(): Observable<IMessage[]> {
    return this.http.get<IBasicResponse>(`${apiUrl}/chat/history`).pipe(map(data => data.data));
  }
}
