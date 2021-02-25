import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlightDto} from "../../../model/flight-dto";
import {Booking} from "../../../model/booking";
import {Person} from "../../../model/person";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SeatType} from "../../../model/seat-type";
import {SeatInfo} from "../../../model/seat-info";
import {FlightService} from "../../../service/flight.service";
import {Observable, Subject} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})
export class BookingCreateComponent implements OnInit {

  @Input() flight: FlightDto;
  @Input() flightSeats: Map<SeatType, SeatInfo>;
  @Input() person: Person;
  @Input() booking: Booking;
  @Output() submit = new EventEmitter<Booking>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  $selectedType = new Subject<SeatInfo>()
  $freeSeats: Observable<number[]>;

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.$freeSeats = this.$selectedType.pipe(
      switchMap(type => this.flightService.getFreeSeats(this.flight.flightId, type.type)),
    )
    this.form = this.fb.group({
      seatNumber: fb.control(null, Validators.required),
      seatType: this.fb.control(null, Validators.required)
    })
  }

  public submitBooking() {
    this.submit.emit({
      id: null,
      flightId: this.flight.flightId,
      personId: this.person.id,
      seatNumber: this.form.get('seatNumber').value,
      seatType: this.form.get('seatType').value.type
    })
  }

  public cancelBooking() {
    this.cancel.emit();
  }

  ngOnInit(): void {
  }

}
