import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../model/flight";
import {ApiResponse} from "../model/apiResponse";
import {SeatInfo} from "../model/seat-info";
import {SeatType} from "../model/seat-type";
import {FlightDto} from "../model/flight-dto";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) {

  }

  public getSeatsInfo(flightId: number): Observable<Map<SeatType, SeatInfo>> {
    return this.http.get<Map<SeatType, SeatInfo>>('/api/flights/seats', {
      params: new HttpParams().append('flightId', flightId.toString())
    });
  }

  public getAll(page: number = 0, size: number = 20, routeId: number = null): Observable<ApiResponse<Flight>> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
    if (routeId != null) {
      params = params.append('routeId', routeId.toString());
    }

    return this.http.get<ApiResponse<Flight>>(`/api/flights`, {
      params: params
    })
  }

  public save(flight: Flight): Observable<void> {
    return this.http.post<void>('/api/flight', flight);
  }

  getById(flightId: number): Observable<FlightDto> {
    return this.http.get<FlightDto>(`/api/flights/${flightId}`);
  }

  getFreeSeats(flightId: number, seatType: string): Observable<number[]> {
    return this.http.get<number[]>('/api/flights/seats/free', {
      params: {
        flightId: flightId.toString(),
        seatType: seatType
      }
    })
  }
}
