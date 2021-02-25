import {Component, Input, OnInit} from '@angular/core';
import {BookingDto} from "../../../model/booking-dto";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  displayedColumns = [
    'route',
    'airplane',
    'scheduledDepartureTime',
    'scheduledArrivalTime',
    'seatTypeName',
    'seatNumber'
  ]

  @Input() bookings: BookingDto[];

  constructor() { }

  ngOnInit(): void {
  }

}
