import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:9090/';
  private sub_url = 'api/v1/users/';
  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.url + this.sub_url);
  }

  changeStateUser(uuid: String, state: String): Observable<any> {
    return this.http.put(`${this.url + this.sub_url}state/${uuid}`, state);
  }
}
