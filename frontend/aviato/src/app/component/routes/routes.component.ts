import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from "rxjs";
import {RouteService} from "../../service/route.service";
import {RouteDto} from "../../model/RouteDto";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ApiResponse} from "../../model/apiResponse";
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-flights',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit, AfterViewInit {

  displayedColumns = [
    'departureAirportCity',
    'destinationAirportCity',
    'departureAirportName',
    'destinationAirportName',
    'flights']

  public routesSubject = new Subject<ApiResponse<RouteDto>>()
  public $routes = this.routesSubject
    .pipe(map(resp => resp == null ? [] : resp.content))

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public form: FormGroup;

  public $page: Observable<PageEvent>;

  public availableCities = [];

  constructor(private routeService: RouteService,
              private router: Router,
              private fb: FormBuilder) {
    this.form = fb.group({
      destinationAirportCity: fb.control(null),
      departureAirportCity: fb.control(null)
    })
    this.routeService.getAllCities()
      .subscribe(resp => this.availableCities = resp);
  }


  public toFlightPage(routeId: number) {
    this.router.navigate(['flights'], {
      queryParams: {
        route: routeId
      }
    })
      .then();
  }

  public setPage(pageEvent: PageEvent) {
    this.refreshData(pageEvent.pageIndex, pageEvent.pageSize);
  }


  public refreshData(page: number = 0, size: number = 20, departureAirportCity: string = null, destinationAirportCity: string = null) {
    this.routeService.getAll(page, size, departureAirportCity, destinationAirportCity)
      .subscribe(resp => {
        this.routesSubject.next(resp)
      })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.$page = this.paginator.page.asObservable();
    combineLatest([this.$page, this.form.valueChanges])
      .subscribe(a => {
        this.refreshData(a[0].pageIndex, a[0].pageSize, a[1].departureAirportCity, a[1].destinationAirportCity)
      })

    this.routesSubject
      .subscribe(resp => {
        this.paginator.length = resp.totalElements;
      })

    this.paginator.page.next(new PageEvent());
  }

}
