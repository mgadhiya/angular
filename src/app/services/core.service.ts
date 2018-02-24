import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

 import { MapDatam } from '../model/mapmock';

 import 'rxjs/add/operator/map';
import { City } from '../model/city.model';
import { Zone } from '../model/zone.model';
import { Center } from '../model/center.model';

@Injectable()

export class CoreService {

  constructor (private http: Http) {

  }
  getcenter(): Observable<Center[]> {

    const req = this.http.get('http://localhost:59607/Person/GetAllCenter');

    return  req.map(response => {
      const body = response.json();
      return body || [];
    });
  }


 getzone(): Observable<Zone[]> {

  const req = this.http.get('http://localhost:59607/Person/GetAllZone');

  return  req.map(response => {
    const body = response.json();
    return body || [];
  });
}
  getcity(): Observable<City[]> {

    const req = this.http.get('http://localhost:59607/Person/GetAllCity');

    return  req.map(response => {
      const body = response.json();
      return body || [];
    });
  }



}
