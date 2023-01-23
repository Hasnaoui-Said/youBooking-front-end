import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AnnanceService} from "../../../../../services/annance/annance.service";
import {HotelDetailsComponent} from "../../../manager/hotels/details/hotel-details.component";
import {MatDialog} from "@angular/material/dialog";
import {ViewImageComponent} from "../../../../shared/view-image/view-image.component";

export interface Document {
  image: any;
  cols: number;
  rows: number;
}
@Component({
  selector: 'app-offer-details-index',
  templateUrl: './offer-details-index.component.html',
  styleUrls: ['./offer-details-index.component.scss']
})
export class OfferDetailsIndexComponent implements OnInit {

  uuid!: String;
  offer : any;
  documents = new Array<Document>();

  constructor(private route: ActivatedRoute,
              private offerService: AnnanceService,
              private _dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
    });
  }

  ngOnInit(): void {
    this.getOfferByUuid();
  }

  private getOfferByUuid() {
    this.offerService.getOfferByUuid(this.uuid).subscribe(
      response=>{
        console.log(response)
        if (response.data == null)
          this.offerService.pageNotFound();
        else {
          let rowExample = [
            {cols: 3, rows: 1},
            {cols: 1, rows: 2},
            {cols: 1, rows: 1},
            {cols: 2, rows: 1},
          ];
          let i = 0;
          response.data.hotel.attachments[0].documents.forEach((doc:any)=>{
            this.documents.push({cols: rowExample[i].cols, rows: rowExample[i].rows, image: doc.image})
            i++;
            if (i == 4)
              i = 0;
          })
          this.offer = response.data;
        }
      },error => {
        console.log(error)
      }
    );
  }

  viewImage(image: any) {
    console.log("viewImage")
    this._dialog.open(ViewImageComponent, {
      data: {
        image: image
      }
    });
  }
}
