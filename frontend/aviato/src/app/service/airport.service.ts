import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../model/airport";

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) {

  }

  public get(id: number): Observable<Airport> {
    return this.http.get<Airport>(`/api/airport/${id}`)
  }

}
