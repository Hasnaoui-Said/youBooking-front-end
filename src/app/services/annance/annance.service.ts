import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AnnanceService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll():Observable<any>{
    return this.http.get(`${environment.apiURL + environment.subURL}/offer/all`);
  }
  getAllPrincipale():Observable<any>{
    return this.http.get(`${environment.apiURL + environment.subURL}/offer/principal`);
  }
  save(data: any):Observable<any>{
    return this.http.post(`${environment.apiURL + environment.subURL}/offer/`, data);
  }

  changeState(event: any):Observable<any> {
    console.log(event)
    console.log(typeof event)
    return this.http.post(`${environment.apiURL + environment.subURL}/offer/change-state`, event);
  }


  getOffers():Observable<any> {
    return this.http.get(`${environment.apiURL + environment.subURL}/offer/`);
  }

  detailsOffer(uuid: any) {
    this.router.navigate([`/index/offers/${uuid}`]);
  }
  pageNotFound() {
    this.router.navigate([`/404`]);
  }

  getOfferByUuid(uuid: String):Observable<any> {
    return this.http.get(`${environment.apiURL + environment.subURL}/offer/uuid/${uuid}`);
  }

}
