import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private sub_url = '/api/v1/city';
  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get(`${environment.apiURL + this.sub_url}/`);
  }
}
