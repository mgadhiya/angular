import { Component} from '@angular/core';

import { FullTextSearchPipe } from './mypipe';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {


  center = [];
  zones = [];
  cities = [];


f = [];
families = [
  {id: 1, cityid: 1, familycnt: '4', distance: '50'},
  {id: 2, cityid: 6, familycnt: '5', distance: '55'},
  {id: 3, cityid: 11, familycnt: '13', distance: '53'},
  {id: 4, cityid: 16, familycnt: '34', distance: '55'},
  {id: 5, cityid: 1, familycnt: '5', distance: '59'},
];

  constructor(private coreService: CoreService) {

    this.f = this.families;

    this.coreService
    .getcenter()
    .subscribe(response => {
        this.center = response;
      });
        this.coreService
        .getzone()
        .subscribe(zones => {
            this.zones = zones;
          });
            this.coreService
            .getcity()
            .subscribe(cities => {
                this.cities = cities;
              });
        }

 selectedValueZone = '99';


 clearFilters(): void {
  this.selectedValueZone = '99';

}

onChange(value: number) {
 // console.log('zone change');
 // console.log(this.cities);
  this.onChangeCity(value);

}
onChangeCity(value: number) {
 // console.log('city change :'  + value);
 // console.log(' this.families :'  +  this.families);

 // console.log('this.selectedValueZone.toString() :'  + this.selectedValueZone.toString());
  if (value.toString() === '99') {
    if (this.selectedValueZone.toString() !== '99') {
      const zoneid = this.selectedValueZone.toString();
      const city = this.cities;
  //    console.log(' zoneid :'  +  zoneid);
      const cities = city.filter(function(ci) {
        return ci.zoneid.toString() === zoneid;
      });

   //   console.log(' cityids :'  + JSON.stringify(cities));


      const citieids = cities.map(obj => obj.id);

      this.f = this.families.filter(family => citieids.includes(family.cityid));

 //     console.log('  this.f :'  + JSON.stringify( this.f));

  } else {
    this.f = this.families;
  }
  } else {

   this.f = this.families.filter(family => family.cityid === value);
  }

}

}
