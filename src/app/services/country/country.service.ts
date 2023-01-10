import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private sub_url = '/api/v1/country';
  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get(`${environment.apiURL + this.sub_url}/`);
  }
}
