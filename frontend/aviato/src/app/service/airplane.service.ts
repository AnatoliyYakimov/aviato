import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airplane} from "../model/airplane";
import {AirplaneDto} from "../model/airplane-dto";

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  constructor(private http: HttpClient) {

  }

  public get(id: number): Observable<Airplane> {
    return this.http.get<Airplane>(`/api/airplane/${id}`)
  }

  public getAll(): Observable<AirplaneDto[]> {
    return this.http.get<AirplaneDto[]>('/api/airplane')
  }

}
