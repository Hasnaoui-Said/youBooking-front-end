import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  refreshJeton: string= "refreshJeton";
  successJeton: string= "successJeton";

  constructor(private router: Router) {
  }

  saveTokenSuccess(token: string) {
    localStorage.setItem(this.successJeton, token);
    this.router.navigate(['admin']);
  }
  saveTokenRefresh(token: string) {
    localStorage.setItem(this.refreshJeton, token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem(this.successJeton);
    return !!token;
  }

  clearToken() {
    localStorage.removeItem(this.successJeton);
    localStorage.removeItem(this.refreshJeton);
  }
  clearTokenExpired() {
    localStorage.removeItem(this.successJeton);
    localStorage.removeItem(this.refreshJeton);
    this.router.navigate(['auth/register']);
  }

  getToken():String | null{
    return localStorage.getItem(this.successJeton);
  }
}
