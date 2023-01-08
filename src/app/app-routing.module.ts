import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeAdminComponent} from "./modules/components/admin/home/home-admin.component";
import {NotFoundComponent} from "./modules/shared/not-found/not-found.component";
import {SignInComponent} from "./modules/components/auth/sign-in/sign-in.component";
import {LoginComponent} from "./modules/components/auth/login/login.component";
import {AdminComponent} from "./modules/components/admin/admin.component";
import {AnnancesAdminComponent} from "./modules/components/admin/annances/annances-admin/annances-admin.component";
import {HotelsComponent} from "./modules/components/admin/hotels/hotels.component";
import {UsersAdminComponent} from "./modules/components/admin/users/users-admin.component";
import {AuthComponent} from "./modules/components/auth/auth.component";

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: '', component: HomeAdminComponent},
      {path: 'home', component: HomeAdminComponent},
      {path: 'hotels', component: HotelsComponent},
      {path: 'users', component: UsersAdminComponent},
      {path: 'annances', component: AnnancesAdminComponent},
    ]
  },
  {
    path: 'manager', component: HomeAdminComponent,
    children: [
      {path: '', component: HomeAdminComponent},
      {path: 'home', component: HomeAdminComponent},
      {path: 'hotel', component: HomeAdminComponent},
      {path: 'chambres', component: HomeAdminComponent},
      {path: 'reservation', component: HomeAdminComponent},
    ]
  },
  // {path: '', redirectTo: 'admin/home', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent,
    children: [
      {path: '', redirectTo: 'auth/register', pathMatch: 'full'},
      {path: 'register', component: LoginComponent},
      {path: 'sign-in', component: SignInComponent},
    ]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
