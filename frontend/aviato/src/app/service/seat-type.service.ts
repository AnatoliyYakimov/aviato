import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SeatType} from "../model/seat-type";

@Injectable({
  providedIn: 'root'
})
export class SeatTypeService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<SeatType[]> {
    return this.http.get<SeatType[]>('api/seat-types');
  }
}
