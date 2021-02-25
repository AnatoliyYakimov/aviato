import {Component, OnInit} from '@angular/core';
import {FlightService} from "../../../service/flight.service";
import {Router} from "@angular/router";
import {RouteService} from "../../../service/route.service";
import {RouteDto} from "../../../model/RouteDto";
import {Flight} from "../../../model/flight";

@Component({
  selector: 'app-flight-create-page',
  templateUrl: './flight-create-page.component.html',
  styleUrls: ['./flight-create-page.component.css']
})
export class FlightCreatePageComponent implements OnInit {

  routes: RouteDto[];

  constructor(private flightService: FlightService,
              private routeService: RouteService,
              private router: Router) {
    routeService.getAll().subscribe(
      resp => this.routes = resp.content
    )
  }

  public saveFlight(flight: Flight) {
    this.flightService.save(flight)
      .subscribe(
        _ => this.router.navigate(['flights']).then()
      );
  }

  public cancel() {
    this.router.navigate(['flights']).then();
  }

  ngOnInit(): void {
  }

}
