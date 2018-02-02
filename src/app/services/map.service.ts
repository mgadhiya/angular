import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MapData } from '../model/mapdata';


// import { MapDatam } from '../model/mapmock';

@Injectable()

export class MapService {

  MapDatam: MapData[] =  [
    {

        'latitude': 40.75,
        'longitude': -73.98,
        'locationName': 'Prime warehouse A',
        'count': 50,
        'label' : 'first'

    },
    {

        'latitude': 40.75,
        'longitude': -73.997,
        'locationName': 'Prime warehouse A',
        'count': 50,
        'label' : 'second'

    },
    {

      'latitude': 40.75,
      'longitude': -73.97,
      'locationName': 'Prime warehouse A',
      'count': 600,
      'label' : 'third'
  }
  ];

  constructor() { }

  getMapdata(): Observable<MapData[]> {

    return of(this.MapDatam);
  }
}
