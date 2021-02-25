import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './component/header/header.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {LoginPageComponent} from './component/login-page/login-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RoutesComponent} from './component/routes/routes.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {FlightsComponent} from './component/flights/flights.component';
import {FlightPricesComponent} from './component/flights/flight-prices/flight-prices.component';
import {BookingCreatePageComponent} from './component/booking/booking-create-page/booking-create-page.component';
import {BookingCreateComponent} from './component/booking/booking-create/booking-create.component';
import {MatSelectModule} from "@angular/material/select";
import {BookingListComponent} from './component/booking/booking-list/booking-list.component';
import {BookingListPageComponent} from './component/booking/booking-list-page/booking-list-page.component';
import {RouteNamePipe} from './pipe/flight-name.pipe';
import {DateTimePipe} from './pipe/date-time.pipe';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {FlightCreatePageComponent} from './component/flights/flight-create-page/flight-create-page.component';
import {FlightCreateComponent} from './component/flights/flight-create/flight-create.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";

registerLocaleData(localeRu)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    RoutesComponent,
    FlightsComponent,
    FlightPricesComponent,
    BookingCreatePageComponent,
    BookingCreateComponent,
    BookingListComponent,
    BookingListPageComponent,
    RouteNamePipe,
    DateTimePipe,
    FlightCreatePageComponent,
    FlightCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
