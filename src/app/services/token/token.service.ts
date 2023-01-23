import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  refreshJeton: string= "refreshJeton";
  successJeton: string= "successJeton";

  constructor(private router: Router, private http: HttpClient) {
  }

  saveTokenSuccess(token: string) {
    localStorage.setItem(this.successJeton, token);
    this.geCurrent().subscribe(
      response=>{
        let roles = response.data.roles.map((r:any)=> r.role.name);
        if (roles.includes('ADMIN')){
          this.router.navigate(['admin']);
        }
        if (roles.includes('MANAGER')){
          this.router.navigate(['manager']);
        }
        if (roles.includes('CLIENT')){
          this.router.navigate(['index']);
        }
      },error => {
        console.log(error)
      }
    )
    // this.router.navigate(['admin']);
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

  private geCurrent():Observable<any> {
    return this.http.get(`${environment.apiURL + environment.subURL}/jeton/profile`);
  }
}
