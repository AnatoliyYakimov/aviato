import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Person} from "../model/person";
import {LoginService} from "../service/login.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonResolver implements Resolve<Person> {
  constructor(private loginService: LoginService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person> | Promise<Person> | Person {
    return this.loginService.principalSubject.asObservable().pipe(
      take(1)
    );
  }
}
