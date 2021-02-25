import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Booking} from "../model/booking";
import {Observable} from "rxjs";
import {BookingDto} from "../model/booking-dto";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  public post(booking: Booking): Observable<any> {
    return this.http.post('/api/booking', booking);
  }

  public getAll(personId: number): Observable<BookingDto[]> {
    return this.http.get<BookingDto[]>('/api/bookings/person', {
      params: {
        personId: personId.toString()
      }
    })
  }
}
