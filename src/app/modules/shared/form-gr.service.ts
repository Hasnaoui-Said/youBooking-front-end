import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormGrService {

  constructor(private formGroup: FormBuilder) {
  }

  public userFormGroup() {
    let group = this.formGroup.group({
      username: this.formGroup.control(""),
      password: this.formGroup.control("")
    });
    return group;
  }

  public registerFormGroup() {
    let group = this.formGroup.group({
      username: this.formGroup.control(""),
      email: this.formGroup.control(""),
      password: this.formGroup.control(""),
      firstName: this.formGroup.control(""),
      lastName: this.formGroup.control(""),
      cin: this.formGroup.control(""),
      phone: this.formGroup.control(""),
      confirmPassword: this.formGroup.control(""),
      role: this.formGroup.control("")
    });
    return group;
  }

  hotelFormGroup() {
    let group = this.formGroup.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      description: [''],
    });
    return group;
  }

  bedRoomFormGroup() {
    let group = this.formGroup.group({
      name: ['', Validators.required],
      numberOfBeds: ['', Validators.required],
      price: ['', Validators.required],
      typeOfRoom: ['', Validators.required],
    });
    return group;
  }

  bedRoomFormGroups() {
    let bedRooms: FormArray = this.formGroup.array([this.bedRoomFormGroup(), Validators.required])
    return this.formGroup.group({
      bedRooms: bedRooms
    });
  }

  attachmentsFormGroup() {
    let group = this.formGroup.group({
      title: ['', Validators.required],
      description: [''],
      image: [''],
    });
    return group;
  }

  annanceFormGroup() {
    let group = this.formGroup.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      hotel: ['', Validators.required],
    });
    return group;
  }
}
