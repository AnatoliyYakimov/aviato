import {Pipe, PipeTransform} from '@angular/core';
import {RouteDto} from "../model/RouteDto";

@Pipe({
  name: 'RouteName'
})
export class RouteNamePipe implements PipeTransform {

  transform(value: RouteDto, ...args: unknown[]): string {
    return `${value.departureAirportCity} (${value.departureAirportName}) - ${value.destinationAirportCity} (${value.destinationAirportName})`;
  }

}
