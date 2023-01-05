import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:9090/';
  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.url+"/api/v1/users/");
  }
}
