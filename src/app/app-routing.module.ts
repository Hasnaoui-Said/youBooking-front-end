import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeAdminComponent} from "./modules/components/admin/home/home-admin.component";
import {NotFoundComponent} from "./modules/shared/not-found/not-found.component";
import {SignUpComponent} from "./modules/components/auth/sign-up/sign-up.component";
import {LoginComponent} from "./modules/components/auth/login/login.component";
import {AdminComponent} from "./modules/components/admin/admin.component";
import {AnnancesAdminComponent} from "./modules/components/admin/annances/annances-admin.component";
import {HotelsAdminComponent} from "./modules/components/admin/hotels/hotels-admin.component";
import {UsersAdminComponent} from "./modules/components/admin/users/users-admin.component";
import {AuthComponent} from "./modules/components/auth/auth.component";
import {ManagerComponent} from "./modules/components/manager/manager.component";
import {DashboardManagerComponent} from "./modules/components/manager/dashboard/dashboard-manager.component";
import {AnnancesManagerComponent} from "./modules/components/manager/annances/annances-manager.component";
import {ReservationsComponent} from "./modules/components/manager/reservations/reservations.component";
import {ChambersComponent} from "./modules/components/manager/chambers/chambers.component";
import {HotelsManagerComponent} from "./modules/components/manager/hotels/hotels-manager.component";
import {IndexComponent} from "./modules/components/index/index.component";
import {ProfileComponent} from "./modules/components/profile/profile.component";
import {OffersIndexComponent} from "./modules/components/index/offers/offers-index.component";
import {OfferDetailsIndexComponent} from "./modules/components/index/offers/details/offer-details-index.component";

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: '', component: HomeAdminComponent},
      {path: 'home', component: HomeAdminComponent},
      {path: 'hotels', component: HotelsAdminComponent},
      {path: 'users', component: UsersAdminComponent},
      {path: 'annances', component: AnnancesAdminComponent},
    ]
  },
  {
    path: 'manager', component: ManagerComponent,
    children: [
      {path: '', component: DashboardManagerComponent},
      {path: 'home', component: DashboardManagerComponent},
      {path: 'hotels', component: HotelsManagerComponent},
      {path: 'chambres', component: ChambersComponent},
      {path: 'reservations', component: ReservationsComponent},
      {path: 'annances', component: AnnancesManagerComponent},
    ]
  },

  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: '', redirectTo: 'register', pathMatch: 'full'},
      {path: 'register', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent}
    ]
  },

  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {
    path: 'index', component:IndexComponent,
    children: [
      {path: '', redirectTo: 'offers', pathMatch: 'full'},
      {path: 'offers', component: OffersIndexComponent, pathMatch: 'full'},
      {path: 'reservations', component: IndexComponent, pathMatch: 'full'},
      {path: 'offers/:uuid', component: OfferDetailsIndexComponent, pathMatch: 'full'},
    ]
  },

  {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
