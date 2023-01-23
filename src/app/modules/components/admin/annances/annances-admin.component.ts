import {Component, OnInit} from '@angular/core';
import {AnnanceService} from "../../../../services/annance/annance.service";
import {FormGrService} from "../../../shared/form-gr.service";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {MatDialog} from "@angular/material/dialog";
import {DiagConfirmComponent} from "../../../shared/diag-confirm/diag-confirm.component";

@Component({
  selector: 'app-annances-admin',
  templateUrl: './annances-admin.component.html',
  styleUrls: ['./annances-admin.component.scss']
})
export class AnnancesAdminComponent implements OnInit {


  annances: Array<Object> = new Array<Object>();
  annancesLength: number = 0;
  loadingData: boolean = true;
  private hotels: Array<Object> = [];

  constructor(private annanceService: AnnanceService,
              private formGrService: FormGrService,
              private _snackBar: SnackBarService,
              public _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAnnances();
  }

  getAnnances() {
    this.annanceService.getAll().subscribe(
      next => {
        this.annances = next.data;
        this.loadingData = false;
        this.annancesLength = this.annances.length;
      }, error => {
        console.error(error.message)
        this._snackBar.open(error.message, 'X');
      }
    )
  }


  onChangeState(event: any) {
    const dialogRef = this._dialog.open(DiagConfirmComponent, {
      width: '500px',
      data: {
        title: 'Update Offers State',
        message: 'Are you sure, You want to change state of this offers? ' + event,
        state: event.state,
        confirmRef: 'offers'
      }
    });
    dialogRef.afterClosed().subscribe(e => {
      if (e) {
        this.annanceService.changeState(event).subscribe(
          response => {
            console.log(response)
            this.annances = this.annances.map((annance: any) => {
              if (event.uuidList.includes(annance.uuid)) {
                annance.status = event.state
              }
              return annance;
            })
            this._snackBar.open('State of Offers changed successfully', 'X');
          }, error => {
            console.log(error)
            this._snackBar.open('State of Offers not changed', 'X');
          }
        )
      }
    })
  }

}
