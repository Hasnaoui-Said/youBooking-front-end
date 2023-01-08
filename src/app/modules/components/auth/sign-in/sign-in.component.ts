import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormGrService} from "../../../shared/form-gr.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  registerFormGroup!: FormGroup;
  error_message!: String;
  sub_error_message!: String;

  constructor(private formGrService: FormGrService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerFormGroup = this.formGrService.registerFormGroup();
  }

  submit() {
    let value = this.registerFormGroup.value;
    let user :User ={
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
    this.authService.sign_in(user, value.role)
      .subscribe(
        res => {
          console.log(res)
          // console.log(res.statusCodeValue)
          // console.log(res.body.data)
          // if (res.statusCodeValue === 200) {
          //   // Save the token
          //   localStorage.setItem('successJeton', res.body.data.successJeton);
          //   localStorage.setItem('refreshJeton', res.body.data.refreshJeton);
          // } else {
          //   // Handle error
          //   console.error(res.statusCodeValue);
          //   this.error_message = "Please enter a valid email address";
          // }
        },
        error => {
          console.log(error)
          this.error_message = "Error";
          this.sub_error_message = "Les informations de connexion sont incorrectes";
        }
      );
  }

}
