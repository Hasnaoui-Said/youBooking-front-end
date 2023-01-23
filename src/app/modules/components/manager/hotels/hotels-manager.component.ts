import {Component, OnInit} from '@angular/core';
import {HotelsService} from "../../../../services/hotels/hotels.service";
import {MatDialog} from "@angular/material/dialog";
import {HotelsAddComponent} from "./add/hotels-add.component";
import {FormGrService} from "../../../shared/form-gr.service";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {AttachmentService} from "../../../../services/attachment/attachment.service";
import {HotelDetailsComponent} from "./details/hotel-details.component";

@Component({
  selector: 'app-hotels-manager',
  templateUrl: './hotels-manager.component.html',
  styleUrls: ['./hotels-manager.component.scss']
})
export class HotelsManagerComponent implements OnInit {
  hotels!: Array<Object>;
  hotelsLength: number = 0;
  loadingData: boolean = true;

  constructor(private hotelsService: HotelsService,
              private formGrService: FormGrService,
              private _snackBar: SnackBarService,
              private attachmentService: AttachmentService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getHotels();
  }

  openAddHotelDialog() {

    const dialogRef = this.dialog.open(HotelsAddComponent, {
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
      if (e.result != false) {
        this.hotelsService.saveHotel(e.data).subscribe(
          next => {
            console.log(next)
            this.saveAttachment(next.data.attachments[0].uuid, e.file_store);
            this.hotels.push(next.data);
            this.hotelsLength += 1;
          }, error => {
            console.error(error)
            this._snackBar.open(error.error.message, 'X');
          }
        )
      }
    });
  }

  detailsHotels(event: any){
    this.dialog.open(HotelDetailsComponent, {
      width: '30%',
      data: {
        hotel: event
      }
    });
  }
  getHotels() {
    this.hotelsService.getPrincipal().subscribe(
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

  private saveAttachment(uuid: any, file_store: any) {
    this.attachmentService.saveAttachment(uuid, file_store).subscribe(
      response => {
        console.log(response)
        this.hotels.forEach((hotel: any)=>{
          if (hotel.attachments[0].uuid == uuid){
            hotel.attachments.push(response.data);
          }
        })
      }, errors => {
        console.log("error", errors)
        if (errors.status === 400) {
          this._snackBar.open(`${errors.error.message}`, 'X');
        }
      }
    )
  }
}
