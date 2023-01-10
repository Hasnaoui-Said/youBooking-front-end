import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Hotel} from "../../../../../models/hotel.model";
import {TypeOfRoomService} from "../../../../../services/typeBedRoom/type-of-room.service";
import {CountryService} from "../../../../../services/country/country.service";
import {CityService} from "../../../../../services/city/city.service";
import {BedRoom} from "../../../../../models/bed-room.model";


@Component({
  selector: 'app-hotels-add',
  templateUrl: './hotels-add.component.html',
  styleUrls: ['./hotels-add.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsAddComponent implements OnInit {

  hotelFormGroup!: FormGroup;
  bedRoomFormGroup!: FormGroup;
  bedRoomFormGroups!: FormGroup;
  attachmentsFormGroup!: FormGroup;
  city!: any;
  country!: any;
  typeOfBedRoom!: any;
  bedRooms: BedRoom[] = [];

  displayedColumnsBedRoom: string[] = ["price", "name", "numberOfBeds", "typeRoom"];
  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<HotelsAddComponent>,
              public countryService: CountryService,
              public typeBedRoomService: TypeOfRoomService,
              private changeDetectorRef: ChangeDetectorRef,
              public cityService: CityService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.formBuilderData();
    this.getDataSelected();
  }

  saveHotel() {
    let hotel: Hotel = this.hotel();
    this.dialogRef.close({result: true, data: hotel})
  }

  private hotel() {
    let hotel = this.hotelFormGroup.value;
    let attachment = this.attachmentsFormGroup.value;
    return {
      name: hotel.name, description: hotel.description,
      address: {address: hotel.address, street: hotel.street, city: hotel.city, country: hotel.country},
      attachment: {title: attachment.title, description: attachment.description},
      bedRooms: this.bedRooms
    }
  }

  private formBuilderData() {
    this.hotelFormGroup = this.data.hotelFormGroup;
    this.bedRoomFormGroup = this.data.bedRoomFormGroup;
    this.bedRoomFormGroups = this.data.bedRoomFormGroups;
    this.attachmentsFormGroup = this.data.attachmentsFormGroup;
  }

  private getDataSelected() {
    this.countryService.get().subscribe(
      next => {
        this.country = next.data;
      }, error => {
        console.log(error);
      },
    )
    this.typeBedRoomService.get().subscribe(
      next => {
        this.typeOfBedRoom = next.data;
      }, error => {
        console.log(error);
      },
    )
    this.cityService.get().subscribe(
      next => {
        this.city = next.data;
      }, error => {
        console.log(error);
      },
    )
  }

  addBedRoom() {
    let bedRoom = this.bedRoomFormGroup.value;
    console.log(bedRoom)
    if (this.bedRoomFormGroup.valid) {
      let room = {
        price: bedRoom.price,
        name: bedRoom.name,
        numberOfBeds: bedRoom.numberOfBeds,
        typeRoom: bedRoom.typeOfRoom
      };
      this.bedRooms.push(room);
      // this.bedRoomFormGroups.get('bedRooms').insert(1,room);
      this.changeDetectorRef.markForCheck();
    } else{
      console.log("Form has errors");
      console.log(this.bedRoomFormGroup.errors)
    }
    console.log(this.bedRooms.length, this.bedRooms)
  }
}
