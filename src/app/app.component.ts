import { Component} from '@angular/core';

import { FullTextSearchPipe } from './mypipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {



  zones = [
    {id: 99, name: 'All'},
    {id: 1, name: 'Passaic'},
    {id: 2, name: 'Clifton'},
    {id: 3, name: 'Lodi'},
    {id: 4, name: 'Paramus'},
  ];
f = [];
    cities = [
    {id: 99, name: 'All', zoneid: 99},

    {id: 1, name: 'Passaic', zoneid: 1},
    {id: 2, name: 'Bloomfield', zoneid: 1},
    {id: 3, name: 'Nutley', zoneid: 1},
    {id: 4, name: 'Belleville', zoneid: 1},
    {id: 5, name: 'West Orange', zoneid: 1},

    {id: 6, name: 'Clifton', zoneid: 2},
    {id: 7, name: 'Wayne', zoneid: 2},
    {id: 8, name: 'Cedar Grove', zoneid: 2},
    {id: 9, name: 'Woodland Park', zoneid: 2},
    {id: 10, name: 'Little Falls', zoneid: 2},

    {id: 11, name: 'Lodi', zoneid: 3},
    {id: 12, name: 'Elmwood Park', zoneid: 3},
    {id: 13, name: 'Rutherford', zoneid: 3},
    {id: 14, name: 'Wallington', zoneid: 3},
    {id: 15, name: 'Saddle Brook', zoneid: 3},

    {id: 16, name: 'Paramus', zoneid: 4},
    {id: 17, name: 'Fair Lawn', zoneid: 4},
    {id: 18, name: 'Mahwah', zoneid: 4},
    {id: 19, name: 'Hackensack', zoneid: 4},
    {id: 20, name: 'Bergenfield', zoneid: 4},
  ];
  families = [
    {id: 1, cityid: 1, familycnt: '4', distance: '50'},
    {id: 2, cityid: 6, familycnt: '5', distance: '55'},
    {id: 3, cityid: 11, familycnt: '13', distance: '53'},
    {id: 4, cityid: 16, familycnt: '34', distance: '55'},
    {id: 5, cityid: 1, familycnt: '5', distance: '59'},
  ];

  constructor() {
  this.f = this.families;
}
 selectedValueZone = '99';


 clearFilters(): void {
  this.selectedValueZone = '99';

}

onChange(value: number) {
  console.log('zone change');
  console.log(this.cities);
  this.onChangeCity(value);

}
onChangeCity(value: number) {
  console.log('city change :'  + value);
  console.log(' this.families :'  +  this.families);

  console.log('this.selectedValueZone.toString() :'  + this.selectedValueZone.toString());
  if (value.toString() === '99') {
    if (this.selectedValueZone.toString() !== '99') {
      const zoneid = this.selectedValueZone.toString();
      const city = this.cities;
      console.log(' zoneid :'  +  zoneid);
      const cities = city.filter(function(ci) {
        return ci.zoneid.toString() === zoneid;
      });

      console.log(' cityids :'  + JSON.stringify(cities));


      const citieids = cities.map(obj => obj.id);

      this.f = this.families.filter(family => citieids.includes(family.cityid));

      console.log('  this.f :'  + JSON.stringify( this.f));

  } else {
    this.f = this.families;
  }
  } else {

   this.f = this.families.filter(family => family.cityid === value);
  }

}

}
