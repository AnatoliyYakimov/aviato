import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../../service/booking.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {BookingDto} from "../../../model/booking-dto";

@Component({
  selector: 'app-booking-list-page',
  templateUrl: './booking-list-page.component.html',
  styleUrls: ['./booking-list-page.component.css']
})
export class BookingListPageComponent implements OnInit {

  $bookings: Observable<BookingDto[]>;

  constructor(private bookingService: BookingService,
              private router: Router,
              private route: ActivatedRoute) {
    this.$bookings = route.data
      .pipe(
        switchMap(data => this.bookingService.getAll(data.person.id))
      );
  }

  ngOnInit(): void {
  }

}
