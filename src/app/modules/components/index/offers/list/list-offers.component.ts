import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ViewImageComponent} from "../../../../shared/view-image/view-image.component";
import {MatDialog} from "@angular/material/dialog";
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})
export class ListOffersComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  @Input() data : any;
  @Input() offersLength!: number;
  @Output() detailsOffer = new EventEmitter();
  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClickDetailsOffer(uuid: any) {
    this.detailsOffer.emit(uuid)
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
