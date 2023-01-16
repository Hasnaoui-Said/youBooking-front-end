import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-hotels-manager-list',
  templateUrl: './hotels-manager-list.component.html',
  styleUrls: ['./hotels-manager-list.component.scss']
})
export class HotelsManagerListComponent implements OnInit {

  @Input() data: any;
  @Input() loadingData: boolean = true;
  @Input() HotelsLength!: number;
  @Output() openAddHotelDialog = new EventEmitter();
  @Output() detailsHotels = new EventEmitter();
  columnsToDisplay = ['image','name', 'description','state'];
  constructor() { }

  ngOnInit(): void {
  }
  onOpenAddHotelsDialog(){
    this.openAddHotelDialog.emit();
  }

  onDetailsHotels(hotel: any) {
    this.detailsHotels.emit(hotel);
  }
}
