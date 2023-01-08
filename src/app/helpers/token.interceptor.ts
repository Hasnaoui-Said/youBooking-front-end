import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  Authorization : string = "Authorization";
  bearer : string = "Bearer ";
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if (token !== null){
      let clone = request.clone({
        headers:request.headers.set(this.Authorization, this.bearer + token)
      });
      return next.handle(clone).pipe(
        catchError(err => {
          console.log(err);
          if (err.status === 403){
            this.tokenService.clearTokenExpired();
          }
          return throwError("token has been expired");
        }));
    }
    return next.handle(request);
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi:true
}
