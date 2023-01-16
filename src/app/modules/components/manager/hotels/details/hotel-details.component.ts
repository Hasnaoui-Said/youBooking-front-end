import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  hotel: any;
  urlImage!: string;
  constructor(
    public dialogRef: MatDialogRef<HotelDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.hotel = this.data.hotel;
    console.log(this.hotel)
    this.urlImage = this.hotel.attachments[0].documents[0].image
  }

  imageCurrent(imageCurrent: string) {
    this.urlImage = imageCurrent;
  }
}
