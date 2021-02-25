import {Component, OnInit} from '@angular/core';
import {FlightService} from "../../../service/flight.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FlightDto} from "../../../model/flight-dto";
import {Person} from "../../../model/person";
import {SeatInfo} from "../../../model/seat-info";
import {SeatType} from "../../../model/seat-type";
import {map, switchMap} from "rxjs/operators";
import {Booking} from "../../../model/booking";
import {BookingService} from "../../../service/booking.service";

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-create-page.component.html',
  styleUrls: ['./booking-create-page.component.css']
})
export class BookingCreatePageComponent implements OnInit {

  $flight: Observable<FlightDto>;
  $flightSeats: Observable<Map<SeatType, SeatInfo>>;

  $person: Observable<Person>;

  constructor(private flightService: FlightService,
              private bookingService: BookingService,
              private router: Router,
              private route: ActivatedRoute) {

    this.$person = this.route.data
      .pipe(
        map(data => data.person)
      );
    this.$flight = this.route.data
      .pipe(
        map(data => data.flight)
      );
    this.$flightSeats = this.$flight
      .pipe(
        switchMap(flight => flightService.getSeatsInfo(flight.flightId))
      );
  }

  public createBooking(booking: Booking) {
    this.bookingService.post(booking)
      .subscribe(_ => this.router.navigate(['booking']))
  }

  public cancel() {
    this.router.navigate(['flights']).then();
  }

  ngOnInit(): void {
  }

}
