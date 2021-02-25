import {RouteDto} from "./RouteDto";

export interface FlightDto {
  flightId: number,
  routeDto: RouteDto,
  airplaneModelName: string,
  scheduledDepartureTime: Date,
  scheduledArrivalTime: Date,
  actualArrivalTime: Date
  actualDepartureTime: Date
}
