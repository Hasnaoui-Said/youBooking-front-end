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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  Authorization: string = "Authorization";
  bearer: string = "Bearer ";

  constructor(private tokenService: TokenService,
              private _snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if (token !== null) {
      let clone = request.clone({
        headers: request.headers.set(this.Authorization, this.bearer + token)
      });
      return next.handle(clone).pipe(
        catchError(err => {
          console.log(err);
          if (err.status === 403) {
            this.openSnackBar("HttpStatus.Series.CLIENT_ERROR: 403 token has been expired", 'X');
            this.tokenService.clearTokenExpired();
          }
          if (err.status === 401) {
            this.openSnackBar(`HttpStatus.Series.Unauthorized: 401 ${err.message}`, 'X');
          }
          // if (err.status === 400) {
          //   this.openSnackBar(`HttpStatus.Series.CLIENT_ERROR: ${err.message}`, 'X');
          // }
          return throwError(err);
        }));
    }
    return next.handle(request);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
