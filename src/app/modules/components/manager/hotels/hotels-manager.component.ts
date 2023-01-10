import {Component, OnInit} from '@angular/core';
import {HotelsService} from "../../../../services/hotels/hotels.service";
import {MatDialog} from "@angular/material/dialog";
import {HotelsAddComponent} from "./hotels-add/hotels-add.component";
import {FormArray, FormGroup} from "@angular/forms";
import {FormGrService} from "../../../shared/form-gr.service";
import {SnackBarService} from "../../../../services/snack-bar.service";

@Component({
  selector: 'app-hotels-manager',
  templateUrl: './hotels-manager.component.html',
  styleUrls: ['./hotels-manager.component.scss']
})
export class HotelsManagerComponent implements OnInit {
  hotels: any;
  hotelsLength: number = 0;
  loadingData: boolean = true;

  constructor(private hotelsService: HotelsService,
              private formGrService: FormGrService,
              private _snackBar: SnackBarService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getHotels();
  }

  openAddHotelDialog() {

    const dialogRef = this.dialog.open(HotelsAddComponent,{
      disableClose: true,
      width: '70%',
        data: {
          hotelFormGroup: this.formGrService.hotelFormGroup(),
          bedRoomFormGroup: this.formGrService.bedRoomFormGroup(),
          bedRoomFormGroups: this.formGrService.bedRoomFormGroups(),
          attachmentsFormGroup: this.formGrService.attachmentsFormGroup(),
        }
    });

    dialogRef.afterClosed().subscribe(e => {
      console.log("afterClosed")
      console.log(e)
      console.log(e.data)
      if (e.result != false){
        this.hotelsService.saveHotel(e.data).subscribe(
          next=>{
            console.log(next)
          },error=>{
            console.error(error)
            this._snackBar.open("errERTY", 'X');
          }
        )
      }
    });
  }

  getHotels() {
    this.hotelsService.get().subscribe(
      next => {
        this.hotelsLength = next.data.length;
        this.hotels = next.data;
        this.loadingData = false;
      }, err => {
        console.error(err)
        if (err.status === 403) {
          this._snackBar.open(`${err.message}`, 'X');
        }
      }
    );
  }
}
