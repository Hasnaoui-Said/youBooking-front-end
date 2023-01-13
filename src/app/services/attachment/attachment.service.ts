import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) { }

  public saveAttachment(uuid:any, file_store:any): Observable<any> {
    let formData = new FormData();
    formData.append('uuid', uuid);
    for (let i = 0; i < file_store.length; i++) {
      formData.append('images', file_store[i]);
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${environment.apiURL + environment.subURL}/attachment/uuid/images`, formData, {headers: headers});
  }
}
