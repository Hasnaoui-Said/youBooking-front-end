import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:9090/login';
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: HttpClient) {
  }

  public logins(username: any, password: any): Observable<any> {
    return this.http.post(this.loginUrl, {'username': username, 'password': password}, {'headers': this.headers});
    // return this.http.get(this.loginUrl);
  }

  sendData(username: any, password: any) {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(this.loginUrl, {'username': username, 'password': password}, {'headers': headers});
  }

  login(username: any, password: any): Observable<any> {
    let httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    let body = new HttpParams().set('username', username).set('password', password);
    return this.http.post("http://localhost:9090/login", body, httpOptions);
  }

  sign_in(user: any, role: any) {
    const params = new HttpParams().set('role', role);
    return this.http.post(`http://localhost:9090/api/v1/jeton/sign_in`, user, { params });
  }
  existsByUsername(username:any) {
    return this.http.get(`http://localhost:9090/api/v1/jeton/exists/username/${username}`);
  }
  existsByEmail(email:any) {
    return this.http.get(`http://localhost:9090/api/v1/jeton/exists/email/${email}`);
  }
}
