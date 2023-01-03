import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

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
      role: this.formGroup.control("")
    });
    return group;
  }
}
