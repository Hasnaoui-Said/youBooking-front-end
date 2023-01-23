import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Hotel} from "../../models/hotel.model";

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private sub_url = '/api/v1/hotels';

  constructor(private http: HttpClient) {
  }

  getPrincipal(): Observable<any> {
    return this.http.get(`${environment.apiURL + this.sub_url}/principal`);
  }

  saveHotel(hotel: Hotel):Observable<any> {
    console.log(this)
    console.log(hotel)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${environment.apiURL + this.sub_url}/save`, hotel, {headers: headers});
  }
}
