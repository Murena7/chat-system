import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { WithCredentialsInterceptor } from '@core/interceptors/withCredentials.interceptor';

// From @angular/common-services/http/src/interceptors: allows to chain interceptors
class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }
}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService extends HttpClient {
  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = [],
  ) {
    super(httpHandler);

    if (!this.interceptors) {
      // Configure default interceptors that can be disabled here
      this.interceptors = [this.injector.get(ErrorInterceptor), this.injector.get(WithCredentialsInterceptor)];
    }
  }

  skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorInterceptor);
  }

  disableWithCredentialInterceptor(): HttpClient {
    return this.removeInterceptor(WithCredentialsInterceptor);
  }

  // Override the original method to wire interceptors when triggering the request.
  override request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.httpHandler,
    );
    return new HttpClient(handler).request(method, url, options);
  }

  // tslint:disable-next-line:ban-types
  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType)),
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(this.httpHandler, this.injector, this.interceptors.concat([interceptor]));
  }
}
