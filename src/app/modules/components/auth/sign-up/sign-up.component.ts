import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormGrService} from "../../../shared/form-gr.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {User} from "../../../../models/user.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerFormGroup!: FormGroup;
  error_message!: String;
  sub_error_message!: String;

  constructor(private formGrService: FormGrService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerFormGroup = this.formGrService.registerFormGroup();
  }

  submit() {
    this.clearMessage();
    let value = this.registerFormGroup.value;
    let user: User = {
      username: value.username,
      email: value.email,
      password: value.password,
      lastName: value.lastName,
      firstName: value.firstName,
      phone: value.phone,
      cin: value.cin,
      accountState: "",
      uuid: ""
    };

    this.authService.sign_in(user, value.role).subscribe(
      res => {
        console.log(res)
        this.openSnackBar(res.message, 'X');
        this.registerFormGroup  = this.formGrService.registerFormGroup();
        this.router.navigate(['auth/register'])
      },
      error => {
        console.log(error)
        this.error_message = "Error";
        if (error.status === 400) {
          this.sub_error_message = error.error.message;
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  private clearMessage() {
    this.error_message = "";
    this.sub_error_message="";
  }
}
