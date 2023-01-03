import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormGrService} from "../../../shared/form-gr.service";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup!: FormGroup;
  error_message!: String;
  sub_error_message!: String;

  constructor(private formGrService: FormGrService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userFormGroup = this.formGrService.userFormGroup();
  }

  submit() {
    this.authService.login(this.userFormGroup.value.username, this.userFormGroup.value.password)
      .subscribe(
        res => {
          console.log(res)
          console.log(res.statusCodeValue)
          console.log(res.body.data)
          if (res.statusCodeValue === 200) {
            // Save the token
            localStorage.setItem('successJeton', res.body.data.successJeton);
            localStorage.setItem('refreshJeton', res.body.data.refreshJeton);
          } else {
            // Handle error
            console.error(res.statusCodeValue);
            this.error_message = "Please enter a valid email address";
          }
        },
        error => {
          this.error_message = "Error";
          this.sub_error_message = "Les informations de connexion sont incorrectes";
        }
      );
  }
}
