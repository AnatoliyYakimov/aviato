import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  errorActive: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private loginService: LoginService, private router: Router, fb: FormBuilder) {
    this.form = fb.group({
      username: fb.control('', [
        Validators.required
      ]),
      password: fb.control('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let value = this.form.getRawValue();
    console.log(value)
    this.loginService.login(value.username, value.password)
      .subscribe(
        (person) => {
          console.log(person)
          this.router.navigate(['']).then();
        },
        (error => this.errorActive.next(true))
      )
  }

  login() {
    this.router.navigate([''])
      .then();
  }

}
