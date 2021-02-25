import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SeatInfo} from "../../../model/seat-info";
import {FlightService} from "../../../service/flight.service";
import {SeatType} from "../../../model/seat-type";

@Component({
  selector: 'app-flight-prices',
  templateUrl: './flight-prices.component.html',
  styleUrls: ['./flight-prices.component.css']
})
export class FlightPricesComponent implements OnInit {

  @Input() flightId: number;

  public $seatsInfo = new BehaviorSubject<Map<SeatType, SeatInfo>>(new Map<SeatType, SeatInfo>())

  public seatType = SeatType;

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getSeatsInfo(this.flightId)
      .subscribe(resp => {
        this.$seatsInfo.next(resp);
      });
  }

}
