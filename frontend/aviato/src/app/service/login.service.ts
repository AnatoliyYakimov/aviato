import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Person, Role} from "../model/person";
import {map, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private static guest: Person = {
    id: null,
    first_name: '',
    last_name: '',
    middle_name: '',
    role: Role.GUEST,
    username: 'Гость'
  }

  principalSubject: Subject<Person> = new BehaviorSubject(LoginService.guest)

  roleSubject = this.principalSubject.pipe(
    map(person => person.role)
  )

  constructor(private http: HttpClient) {
    let user: string = localStorage.getItem("user");
    if (user != null) {
      this.principalSubject.next(JSON.parse(user));
    }
    this.principalSubject.subscribe(
      person => localStorage.setItem("user", JSON.stringify(person))
    )
  }



  public login(username: string, password: string): Observable<Person> {
    return this.http.get<Person>('/api/user/login', {
      params: {
        password,
        username
      }
    })
      .pipe(
        tap(person => {
          console.log(person);
          this.principalSubject.next(person)
        })
      )
  }

  public logout(): void {
    this.principalSubject.next(LoginService.guest);
    localStorage.removeItem("user");
  }
}
