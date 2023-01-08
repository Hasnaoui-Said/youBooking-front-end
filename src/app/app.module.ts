import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './modules/components/auth/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NavBarComponent} from './modules/components/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SignInComponent} from './modules/components/auth/sign-in/sign-in.component';
import {MatSelectModule} from "@angular/material/select";
import {HomeAdminComponent} from './modules/components/admin/home/home-admin.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterAdminComponent} from './modules/components/admin/footer/footer-admin.component';
import {SideNavListAdminComponent} from "./modules/components/admin/side-nav-list/side-nav-list-admin.component";
import {MatListModule} from "@angular/material/list";
import {HeaderAdminComponent} from './modules/components/admin/header/header-admin.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';
import { DashboardComponent } from './modules/components/admin/dashboard/dashboard.component';
import { UserListComponent } from './modules/components/admin/users/user-list/user-list.component';
import { AdminComponent } from './modules/components/admin/admin.component';
import { UsersAdminComponent } from './modules/components/admin/users/users-admin.component';
import { AnnancesAdminComponent } from './modules/components/admin/annances/annances-admin/annances-admin.component';
import { HotelsComponent } from './modules/components/admin/hotels/hotels.component';
import {TokenInterceptorProvider} from "./helpers/token.interceptor";
import { AuthComponent } from './modules/components/auth/auth.component';
import {MatBadgeModule} from "@angular/material/badge";
import { EmptyListComponent } from './modules/shared/empty-list/empty-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatDividerModule} from "@angular/material/divider";
import { DiagConfirmComponent } from './modules/shared/diag-confirm/diag-confirm.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ErrorMessageComponent } from './modules/shared/error-message/error-message.component';
import { ButtonComponent } from './modules/shared/button/button.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    SignInComponent,
    HomeAdminComponent,
    SideNavListAdminComponent,
    FooterAdminComponent,
    HeaderAdminComponent,
    NotFoundComponent,
    DashboardComponent,
    UserListComponent,
    AdminComponent,
    UsersAdminComponent,
    AnnancesAdminComponent,
    HotelsComponent,
    AuthComponent,
    EmptyListComponent,
    DiagConfirmComponent,
    ErrorMessageComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    NgbModule,
    MatListModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    FormsModule
  ],
  providers: [TokenInterceptorProvider,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 6500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
