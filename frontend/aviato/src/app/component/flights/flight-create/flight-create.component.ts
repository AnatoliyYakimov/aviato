import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteDto} from "../../../model/RouteDto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Flight} from "../../../model/flight";

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {

  @Input() routes: RouteDto[];
  @Output() submit = new EventEmitter<Flight>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      routeId: fb.control(null, Validators.required),
      scheduledDepartureTime: fb.control(new Date(), Validators.required),
      scheduledArrivalTime: fb.control(new Date(), Validators.required)
    })
  }

  ngOnInit(): void {
  }

}
