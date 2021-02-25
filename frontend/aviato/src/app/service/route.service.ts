import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiResponse} from "../model/apiResponse";
import {Observable} from "rxjs";
import {RouteDto} from "../model/RouteDto";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) {
  }

  public getAll(page: number = 0, size: number = 20,
                departureAirportCity: string = null, destinationAirportCity: string = null): Observable<ApiResponse<RouteDto>> {
    let params = new HttpParams()
      .append("page", page.toString())
      .append("size", size.toString());
    if (departureAirportCity != null) {
      params = params.append('departureAirportCity', departureAirportCity);
    }
    if (destinationAirportCity != null) {
      params = params.append('destinationAirportCity', destinationAirportCity);
    }
    return this.http.get<ApiResponse<RouteDto>>(`/api/routes/dto`, {
      params: params
    })
  }

  public getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('/api/routes/dto/cities');
  }
}
