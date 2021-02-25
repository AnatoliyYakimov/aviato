import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./component/login-page/login-page.component";
import {RoutesComponent} from "./component/routes/routes.component";
import {LoginGuard} from "./guard/login.guard";
import {FlightsComponent} from "./component/flights/flights.component";
import {FlightResolver} from "./resolver/flight-resolver";
import {BookingCreatePageComponent} from "./component/booking/booking-create-page/booking-create-page.component";
import {BookingListPageComponent} from "./component/booking/booking-list-page/booking-list-page.component";
import {PersonResolver} from "./resolver/person-resolver";
import {FlightCreatePageComponent} from "./component/flights/flight-create-page/flight-create-page.component";
import {AdminGuard} from "./guard/admin.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'routes',
    component: RoutesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'flights',
    component: FlightsComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'flights/new',
    component: FlightCreatePageComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'booking',
    component: BookingListPageComponent,
    resolve: {
      person: PersonResolver
    },
    canActivate: [LoginGuard],
  },
  {
    path: 'booking/new',
    component: BookingCreatePageComponent,
    canActivate: [LoginGuard],
    resolve: {
      person: PersonResolver,
      flight: FlightResolver
    },
  },
  {
    path: '**',
    redirectTo: 'routes'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
