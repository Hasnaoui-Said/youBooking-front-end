import { Component, OnInit } from '@angular/core';
import {AnnanceService} from "../../../../services/annance/annance.service";

@Component({
  selector: 'app-offers-index',
  templateUrl: './offers-index.component.html',
  styleUrls: ['./offers-index.component.scss']
})
export class OffersIndexComponent implements OnInit {

  offers: Array<any> = new Array<any>();
  loadingData: boolean = true;
  offersLength: number = 0;
  constructor(private offersService: AnnanceService) { }

  ngOnInit(): void {
    this.getOffers();
  }

  private getOffers() {
    this.offersService.getOffers().subscribe(
      response=>{
        console.log(response)
        this.offers = response.data;
        this.loadingData = false;
        this.offersLength = this.offers.length;
      },error => {
        console.log(error);
      }
    )
  }

  detailsOffer(uuid: any) {
    this.offersService.detailsOffer(uuid);
  }
}
