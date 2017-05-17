import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor (private http: Http) {}

  getAll(): Observable<Response[]> {
    return this.http.get('/users')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  get(id: number): Observable<Response[]> {
    return this.http.get(`/users/${id}`)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  create(name: string, email: string, tel: string, position: string, password: string): Observable<Response> {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    return this.http.post('/users', { name, email, tel, position, password }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  destroy(id: number): Observable<Response> {
    return this.http.delete(`/users/${id}`)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
