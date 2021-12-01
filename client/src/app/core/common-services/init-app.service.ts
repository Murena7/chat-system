import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { tap } from 'rxjs/operators';
import { UserService } from '@core/api-services/user.service';
import { IUser } from '@core/interfaces/user.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitAppService {
  constructor(private authService: AuthService, private userService: UserService) {}

  public initUser(): Promise<any> {
    if (localStorage.getItem('isAuthorized')) {
      return this.userService
        .getUser()
        .pipe(
          tap((user: IUser) => {
            this.authService.setUser(user);
          }),
        )
        .toPromise();
    }

    return of([]).toPromise();
  }
}
