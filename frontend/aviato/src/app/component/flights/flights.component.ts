import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Flight} from "../../model/flight";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {FlightService} from "../../service/flight.service";
import {map} from "rxjs/operators";
import {ApiResponse} from "../../model/apiResponse";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, AfterViewInit {

  displayedColumns = [
    'route',
    'airplane',
    'scheduledDepartureTime',
    'scheduledArrivalTime',
    'seats',
    'booking'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public $page: Observable<PageEvent>;
  public routesSubject = new Subject<ApiResponse<Flight>>();
  public $flights = this.routesSubject.asObservable().pipe(map(resp => resp == null ? [] : resp.content));
  public routeId: number;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private flightsService: FlightService,
              public login: LoginService) {
    this.routeId = this.activeRoute.snapshot.queryParams.routeId;
    this.refreshData(0, 5, this.routeId);
  }

  public toCreatePage() {
    this.router.navigate(['flights', 'new']).then();
  }

  public toBookingPage(flightId: number) {
    this.router.navigate(['booking', 'new'], {
      queryParams: {
        flightId: flightId.toString()
      }
    }).then();

  }

  public refreshData(page: number = 0, size: number = 5, routeId: number | null) {
    this.flightsService.getAll(page, size, routeId)
      .subscribe(resp => {
        console.log(resp);
        this.routesSubject.next(resp)
      })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.$page = this.paginator.page.asObservable();
    this.$page
      .subscribe(page => {
        console.log(page);
        this.refreshData(page.pageIndex, page.pageSize, this.routeId)
      })
    this.routesSubject
      .subscribe(resp => {
        this.paginator.length = resp.totalElements;
      })
  }

}
