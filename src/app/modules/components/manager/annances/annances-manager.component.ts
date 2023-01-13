import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-annances-manager',
  templateUrl: './annances-manager.component.html',
  styleUrls: ['./annances-manager.component.scss']
})
export class AnnancesManagerComponent implements OnInit {
  products: any;

  product2 = {name: '', images: []};
  selectedFiles: any;
  private image: File | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getProducts()
  }

  product = {name: '', image: null};

  onFileChanged(event: any) {
    this.selectedFiles = event.target.files;
  }

  public uploadProduct(): void {
    let formData = new FormData();
    formData.append('name', this.product.name);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i]);
    }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.http.post('http://localhost:9090/api/v1/product/save', formData, {headers: headers}).subscribe(
      (response) => {
        console.log("Product created successfully");
        //@ts-ignore
        this.products = response.data;
      },
      (error) => {
        console.log("Error creating product: " + error);
      }
    );
  }

  getProducts() {
    this.getAll().subscribe(response => {
      this.products = response.data;
      console.log(response)
    }, error => {
      console.error(error)
    });
  }

  private getAll(): Observable<any> {
    let url = 'http://localhost:9090/api/v1/product/';
    return this.http.get(url);
  }
}
