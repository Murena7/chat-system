import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@core/common-services/http.service';
import { AuthService } from '@core/auth/auth.service';
import { IUser } from '@core/interfaces/user.interface';
import { IBasicResponse } from '@core/interfaces/core.interface';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService, private authService: AuthService) {}

  getUser(): Observable<IUser> {
    return this.http.get<IBasicResponse>(`${apiUrl}/user/me`).pipe(map(data => data.data));
  }

  refreshUserData(): Observable<boolean> {
    return this.getUser().pipe(
      map(user => {
        this.authService.setUser(user);
        return true;
      }),
    );
  }
}
