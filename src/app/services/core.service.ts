import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
 import 'rxjs/add/operator/map';
import { City } from '../model/city.model';
import { Zone } from '../model/zone.model';
import { Center } from '../model/center.model';
import { environment } from '../../environments/environment';
import { EnvironmentSpecificService } from '../services/environment.specific.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()

export class CoreService implements OnInit {

 // private coreUrl = environment.apiUrl + 'Core/';

   coreUrl: string;

  constructor (private http: Http, private envSpecificService: EnvironmentSpecificService) {
    this.envSpecificService.getJSON().subscribe( es => {
      this.coreUrl = es.apiUrl + 'Core/';
      console.log( 'this.coreUrl: ' + this.coreUrl);
    });
  }

  ngOnInit () {
    this.envSpecificService.getJSON().subscribe( es => {
      this.coreUrl = es.apiUrl + 'Core/';
      console.log( 'this.coreUrl: ' + this.coreUrl);
    });
  }
  getcenter(): Observable<Center[]> {
    console.log( 'in getcenter this.coreUrl: ' + this.coreUrl);
    const req = this.http.get(this.coreUrl + 'GetAllCenter');

    return  req.map(response => {
      const body = response.json();
      return body || [];
    });
  }


 getzone(): Observable<Zone[]> {

  const req = this.http.get(this.coreUrl + 'GetAllZone');

  return  req.map(response => {
    const body = response.json();
    return body;
  });
}
  getcity(): Observable<City[]> {

    const req = this.http.get(this.coreUrl + 'GetAllCity');

    return  req.map(response => {
      const body = response.json();
      return body || [];
    });
  }
  getCityZoneByLatLng(latitude: number, longitude: number): Observable<string> {

    const req = this.http.get(this.coreUrl + 'GetCityZoneByLatLng?latitude=' + latitude + '&longitude=' + longitude);

    return  req.map(response => {
      const body = response.json();
      return body || [];
    });
  }


}
