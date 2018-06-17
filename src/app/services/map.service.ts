import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MapData } from '../model/mapdata.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { EnvironmentSpecificService } from '../services/environment.specific.service';
@Injectable()

export class MapService {
  private mapUrl: string ;

  MapDatam1: MapData[];
  constructor (private http: Http, private envSpecificService: EnvironmentSpecificService) {
    this.envSpecificService.getJSON().subscribe( es => {
      this.mapUrl = es.apiUrl + 'Map/';
      console.log( 'this.mapUrl: ' + this.mapUrl);
    });
  }

  //  getMapDataByAddress(currentaddress: string, currentradius: number): Observable<MapData[]> {
  //   console.log( 'in map service currentaddress: ' + currentaddress);
  //   const currentradiusinmeter = currentradius * 1609.34;
  //   const uri = this.mapUrl + 'FamilyCountByDistanceAddress?address=' + currentaddress + '&dist=' + currentradiusinmeter;
  //   const finaluri = decodeURI(uri);
  //   const req = this.http.get(finaluri);
  //   return  req.map(response => {
  //     const body = response.json();
  //     console.log( 'in map service body ' + body);
  //     return body || [];
  //   });
  // }

  getMapDataByLatLng(latitude: number, longitude: number, currentradius: number): Observable<MapData[]> {

    const currentradiusinmeter = currentradius * 1609.34;
    const uri = this.mapUrl + 'FamilyCountByDistanceLatLong?latitude='
    + latitude + '&longitude=' + longitude + '&dist=' + currentradiusinmeter;
    const finaluri = decodeURI(uri);
    const req = this.http.get(finaluri);
    return  req.map(response => {
      const body = response.json();
      return body || [];
    });
  }
}
