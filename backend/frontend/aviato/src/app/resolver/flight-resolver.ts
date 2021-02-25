import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {FlightService} from "../service/flight.service";
import {Injectable} from "@angular/core";
import {FlightDto} from "../model/flight-dto";

@Injectable({
  providedIn: 'root'
})
export class FlightResolver implements Resolve<FlightDto> {

  constructor(private flightService: FlightService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlightDto> | Promise<FlightDto> | FlightDto {
    return this.flightService.getById(route.queryParams.flightId);
  }

}
