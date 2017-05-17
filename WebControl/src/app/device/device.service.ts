import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class DeviceService {

  constructor (private http: Http) {}

  getAllGroup(): Observable<Response[]> {
    return this.http.get('/groups')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createGroup(name: string, description: string): Observable<Response> {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    return this.http.post('/groups', { name, description }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  destroyGroup(id: number): Observable<Response> {
    return this.http.delete(`/groups/${id}`)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getAllDevice(): Observable<Response[]> {
    return this.http.get('/devices')
                    .map((res: Response) => res.json())
                    .map(json => {
                      const temp = [];

                      json.forEach(({ did, name, gid }) => {
                        temp.push({
                          did: did,
                          name: name,
                          door: 0,
                          light: 0,
                          temp: 0,
                          gid: gid,
                          status: 'red'
                        })
                      });

                      return temp;
                    })
                    .catch(this.handleError);
  }

  getDevice(id: number): Observable<Response[]> {
    return this.http.get(`/devices/${id}`)
                    .map((res: Response) => res.json())
                    .map(([{ did, name, gid }]) => ({
                      did: did,
                      name: name,
                      door: 0,
                      light: 0,
                      temp: 0,
                      gid: gid
                    }))
                    .catch(this.handleError);
  }

  createDevice(name: string, gid: string): Observable<Response> {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/json' })
    };

    return this.http.post('/devices', { name, gid }, options)
                    .map((res: Response) => res.json())
                    .map(({ did, name, gid }) => ({
                      did: did,
                      name: name,
                      door: 0,
                      light: 0,
                      temp: 0,
                      gid: gid,
                      status: 'red'
                    }))
                    .catch(this.handleError);
  }

  destroyDevice(id: number): Observable<Response> {
    return this.http.delete(`/devices/${id}`)
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
