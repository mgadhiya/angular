import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MapData } from '../model/mapdata';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

 import { MapDatam } from '../model/mapmock';

 import 'rxjs/add/operator/map';

@Injectable()

export class MapService {
  MapDatam1: MapData[];
  constructor (private http: Http) {

  }
  MapDatam: MapData[] =  [
    {

        'latitude': 40.75,
        'longitude': -73.98,
        'locationName': 'Prime warehouse A',
        'count': 50,
        'city' : 'first'

    },
    {

        'latitude': 40.75,
        'longitude': -73.997,
        'locationName': 'Prime warehouse A',
        'count': 50,
        'city' : 'second'

    },
    {

      'latitude': 40.75,
      'longitude': -73.97,
      'locationName': 'Prime warehouse A',
      'count': 600,
      'city' : 'third'
  }
  ];


   getMapdata(): Observable<MapData[]> {

    const req = this.http.get('http://localhost:59607/Person/Latlong?address=Mundelein, IL, USA&dist= 260933.4');

    return  req.map(response => {
      const body = response.json();
      return body || [];
    });
  }
}
