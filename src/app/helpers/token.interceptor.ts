import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarService} from "../services/snack-bar.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  Authorization: string = "Authorization";
  bearer: string = "Bearer ";

  constructor(private tokenService: TokenService,
              private _snackBar: SnackBarService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if (token !== null) {
      let clone = request.clone({
        headers: request.headers.set(this.Authorization, this.bearer + token)
      });
      return next.handle(clone).pipe(
        catchError(err => {
          console.log(err)
          if (err.status === 403) {
            this._snackBar.open("HttpStatus.Series.CLIENT_ERROR: 403 token has been expired", 'X');
            this.tokenService.clearTokenExpired();
          }
          if (err.status === 404) {
            this._snackBar.open(`${err.error.path }  ${ err.error.error }  ${ err.status}`, 'X');
          }
          if (err.status === 0) {
            this._snackBar.open(`Server is down. Please try again later.`, 'X');
          }
          if (err.status === 401) {
            this._snackBar.open(`HttpStatus.Series.Unauthorized: 401 ${err.message}`, 'X');
          }
          return throwError(err);
        }));
    }
    return next.handle(request);
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
