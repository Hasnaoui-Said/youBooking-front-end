import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-annances-manager',
  templateUrl: './list-annances-manager.component.html',
  styleUrls: ['./list-annances-manager.component.scss']
})
export class ListAnnancesManagerComponent implements OnInit {


  @Input() data : any;
  @Input() annancesLength : any;
  @Input() loadingData : any;
  @Output() openAddAnnanceDialog = new EventEmitter();
  @Output() details = new EventEmitter();
  columnsToDisplay = ['title','description', 'hotel','status'];
  constructor() { }

  ngOnInit(): void {
  }

}
