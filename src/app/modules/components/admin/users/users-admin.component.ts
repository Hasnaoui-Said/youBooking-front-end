import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/users/users.service";
import {MatDialog} from "@angular/material/dialog";
import {DiagConfirmComponent} from "../../../shared/diag-confirm/diag-confirm.component";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {

  users: any;
  usersLength: number = 0;
  loadingData: boolean = true;

  constructor(private userService: UsersService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      next => {
        this.loadingData = false;
        this.usersLength = next.data.length;
        this.users = next.data;
      }, error => {
        console.error(error);
      }
    )
  }

  openAddUserDialog() {
    console.log("open save new user")
  }

  ChangeStateFromUser($event: any) {
    const dialogRef = this.dialog.open(DiagConfirmComponent, {
      width: '400px',
      data: {
        title: 'Update user',
        message: 'Are you sure you want to change state of this user? ' + $event.uuid,
        state: $event.state
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.userService.changeStateUser($event.uuid, $event.state).subscribe(
          next => {
            console.log(next)
            if (next.success) {
              this.users = this.users.map((user: User) => {
                if (user.uuid == $event.uuid)
                  return {...user, accountState: $event.state}
                return user;
              });
            } else {
              console.warn(next)
            }
          },
          error => {
            console.error(error)
          }
        )
    });
  }
}
