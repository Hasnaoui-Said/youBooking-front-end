import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {SnackBarService} from "../../../../../services/snack-bar.service";

@Component({
  selector: 'app-add-annance-manager',
  templateUrl: './add-annance-manager.component.html',
  styleUrls: ['./add-annance-manager.component.scss']
})
export class AddAnnanceManagerComponent implements OnInit {
  formControl!: FormGroup;
  hotels!: any;

  constructor(
    public _dialogRef: MatDialogRef<AddAnnanceManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.formControl = this.data.formControl;
    this.hotels = this.data.hotels;
  }

  onSubmit() {
    this._dialogRef.close({result: true, data: this.initAnnance()})
  }

  private initAnnance(): any {
    let value = this.formControl.value;
    return {
      title: value.title,
      hotel: value.hotel,
      description: value.description,
    }
  }

  test() {
    console.log(this.formControl.value.description)
    console.log(this.formControl.value.description.length)
  }
}
