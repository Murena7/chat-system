import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { WithCredentialsInterceptor } from '@core/interceptors/withCredentials.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ErrorInterceptor, WithCredentialsInterceptor],
})
export class CoreModule {}
