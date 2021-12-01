import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@core/common-services/http.service';
import { AuthService } from '@core/auth/auth.service';
import { IUser } from '@core/interfaces/user.interface';
import { IBasicResponse } from '@core/interfaces/core.interface';
import { IUserSignUpBody } from '@core/interfaces/auth.interface';

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

  login(body: IUserSignUpBody): Observable<IUser> {
    return this.http
      .skipErrorHandler()
      .post<IBasicResponse>(`${apiUrl}/auth/login`, body)
      .pipe(
        map(data => data.data),
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('isAuthorized', '1');
            this.authService.setUser(user);
          }

          return user;
        }),
      );
  }

  signUp(body: IUserSignUpBody): Observable<IBasicResponse> {
    return this.http.post<IBasicResponse>(`${apiUrl}/auth/sign-up`, body);
  }

  logout(): Observable<IBasicResponse> {
    this.authService.logout();
    return this.http.post<IBasicResponse>(`${apiUrl}/auth/logout`, {});
  }
}
