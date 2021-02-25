import {FlightDto} from "./flight-dto";

export interface BookingDto {
  bookingId: number,
  flightDto: FlightDto,
  seatTypeName: string,
  seatNumber: number
}
