import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenService {

  constructor (private http: Http, private router: Router) {}

  loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(email: string, password: string) {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    const response: Observable<Response> = this.http.post('/sessions', { email, password }, options);

    this.setToken(response);
    this.router.navigateByUrl('/home');
  }

  logout() {
    this.loggedIn.next(false);
  }

  register(email: string, password: string) {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    const response: Observable<Response> = this.http.post('/users', { email, password }, options);

    this.setToken(response);
    this.router.navigateByUrl('/home');
  }

  private setToken(observable: Observable<Response>) {
    observable
      .map(res => res.headers.get('Authorization'))
      .map((token: string) => token.match(/Bearer (.*)/)[1])
      .subscribe((token: string) => {
        this.storeToken(token);
        this.loggedIn.next(true);
      });
  }

  private storeToken(token: string) {
    localStorage.setItem('access-token', token);
  }
}
