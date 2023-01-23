import {Component, OnInit} from '@angular/core';
import {AnnanceService} from "../../../../services/annance/annance.service";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGrService} from "../../../shared/form-gr.service";
import {AddAnnanceManagerComponent} from "./add/add-annance-manager.component";
import {HotelsService} from "../../../../services/hotels/hotels.service";

@Component({
  selector: 'app-annances-manager',
  templateUrl: './annances-manager.component.html',
  styleUrls: ['./annances-manager.component.scss']
})
export class AnnancesManagerComponent implements OnInit {

  annances!: Array<Object>;
  annancesLength: number = 0;
  loadingData: boolean = true;
  private hotels: Array<Object> = [];

  constructor(private annanceService: AnnanceService,
              private formGrService: FormGrService,
              private hotelService: HotelsService,
              private _snackBar: SnackBarService,
              public _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAnnances();
  }

  getAnnances() {
    this.annanceService.getAllPrincipale().subscribe(
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

  async openAddAnnanceDialog() {
    try {
      await this.getHotels();
    } catch (error) {
      // @ts-ignore
      this._snackBar.open(error.status, 'X');
      return;
    }
    if (this.hotels.length == 0) {
      this._snackBar.open("Hotels array is empty", 'X');
      return;
    }
    const dialogRef = this._dialog.open(AddAnnanceManagerComponent, {
      disableClose: true,
      width: '30%',
      data: {
        formControl: this.formGrService.annanceFormGroup(),
        hotels: this.hotels,
      }
    });

    dialogRef.afterClosed().subscribe(e => {
      // console.log("afterClosed")
      // console.log(e)
      if (e.result != false) {
        this.annanceService.save(e.data).subscribe(
          next => {
            console.log(next)
            this.annancesLength += 1;
            console.log(next.data)
            this.annances.push(next.data);
          }, error => {
            console.error(error)
            this._snackBar.open(error.error.message, 'X');
          }
        )
      }
    });
  }


  private async getHotels(): Promise<any> {
    console.log("getHotels")
    try {
      const response = await this.hotelService.getPrincipal().toPromise();
      this.hotels = response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  detailsAnnance($event: any) {
    console.log("open details annanc");
  }
}
