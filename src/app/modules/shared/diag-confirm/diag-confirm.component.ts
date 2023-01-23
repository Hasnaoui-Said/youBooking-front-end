import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  result: string;
}
@Component({
  selector: 'app-diag-confirm',
  templateUrl: './diag-confirm.component.html',
  styleUrls: ['./diag-confirm.component.scss']
})
export class DiagConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DiagConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

}
