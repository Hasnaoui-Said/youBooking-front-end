import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-annances-list-admin',
  templateUrl: './annances-list-admin.component.html',
  styleUrls: ['./annances-list-admin.component.scss']
})
export class AnnancesListAdminComponent implements OnInit {

  @Input() data: any;
  @Input() annancesLength: any;
  @Input() loadingData: any;
  @Output() openAddAnnanceDialog = new EventEmitter();
  @Output() details = new EventEmitter();
  @Output() changeState = new EventEmitter();
  columnsToDisplay = ['select', 'title', 'description', 'hotel', 'status'];
  ifChekedAll: boolean = false;
  ifCheked: boolean = false;
  annancesUuid: Array<String> = new Array<String>();
  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(uuid: String) {
    if (!this.annancesUuid.includes(uuid))
      this.annancesUuid.push(uuid)
    else
      this.annancesUuid = this.annancesUuid.filter((id) => id !== uuid);
  }


  onClickChangeState(event: String) {
    this.changeState.emit({uuidList: this.annancesUuid, state: event})
    this.ifChekedAll = !this.ifChekedAll
    this.ifCheked = !this.ifCheked
  }
}
