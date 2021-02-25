import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Person} from "../../model/person";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public user: Observable<Person> = this.loginService.principalSubject.asObservable()

  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit(): void {
  }



  toPage(page: string) {
    this.router.navigate([page])
      .then();
  }

  logout() {
    this.loginService.logout();
    this.toPage('login')
  }

}
