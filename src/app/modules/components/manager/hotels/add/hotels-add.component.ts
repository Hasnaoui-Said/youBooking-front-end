import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Hotel} from "../../../../../models/hotel.model";
import {TypeOfRoomService} from "../../../../../services/typeBedRoom/type-of-room.service";
import {CountryService} from "../../../../../services/country/country.service";
import {CityService} from "../../../../../services/city/city.service";
import {BedRoom} from "../../../../../models/bed-room.model";
import {Document} from "../../../../../models/document.modal";
import {BehaviorSubject} from "rxjs";


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
  bedRoomSubject = new BehaviorSubject<any>(this.bedRooms);
  bedRoomObject = this.bedRoomSubject.asObservable();


  display: FormControl = new FormControl("", Validators.required);
  file_store: any = [];
  file_list: any = [];

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
    console.log("saveHotel", this)
    let hotel: Hotel = this.hotel();
    this.dialogRef.close({result: true, data: hotel, file_store: this.file_store})
  }

  private hotel() {
    let hotel = this.hotelFormGroup.value;
    let attachment = this.attachmentsFormGroup.value;
    return {
      name: hotel.name, description: hotel.description,
      address: {address: hotel.address, street: hotel.street, city: hotel.city, country: hotel.country},
      attachments: [{title: attachment.title, description: attachment.description, documents: []}],
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
      this.bedRoomSubject.next(this.bedRooms);
      // this.bedRoomFormGroups.get('bedRooms').insert(1,room);
      this.changeDetectorRef.markForCheck();
    } else {
      console.log("Form has errors");
      console.log(this.bedRoomFormGroup.errors)
    }
    console.log(this.bedRooms.length, this.bedRooms)
  }

  handleFileInputChange(event: any) {

    if (event.target.files && event.target.files.length) {

      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        const file = event.target.files[i];
        this.file_store.push(file);
        reader.readAsDataURL(file);

        reader.onload = () => {
          let url = reader.result as string;
          this.file_list.push({url: url});
        };
      }
      const f = this.file_store[0];
      const count = this.file_store.length > 1 ? `(+${this.file_store.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);

    } else {
      this.display.patchValue("");
    }
  }


}
