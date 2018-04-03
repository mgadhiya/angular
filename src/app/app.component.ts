import { Component, AfterViewInit } from '@angular/core';

import { FullTextSearchPipe } from './mypipe';
import { CoreService } from './services/core.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MapService } from './services/map.service';
import { FamilyCount} from './model/familycount.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  center: any[];
  zones: any[];
  cities: any[];

  families: FamilyCount [];
  selectedValueZone: string;
  showMap = false;
  showChart = false;
  location: String;
  radius: Number;

  constructor(private coreService: CoreService, private mapService: MapService) {}

  clearFilters(): void {
    this.selectedValueZone = '-1';
  }

  onChange(value) {
    console.log('value :' + value);
    this.onChangeCity(value);
  }
  onChangeCity(value: number) {
    // console.log('city change :' + value);

    // if (value.toString() === '-1') {
    //   if (this.selectedValueZone.toString() !== '-1') {
    //     const zoneId = this.selectedValueZone.toString();
    //     const city = this.cities;
    //     //    console.log(' zoneid :'  +  zoneid);
    //     const cities = city.filter(function(ci) {
    //       return ci.zoneId.toString() === zoneId;
    //     });

    //     //   console.log(' cityids :'  + JSON.stringify(cities));

    //     const citieids = cities.map(obj => obj.cityId);

    //     this.f = this.families.filter(family =>
    //       citieids.includes(family.cityId)
    //     );

    //     //     console.log('  this.f :'  + JSON.stringify( this.f));
    //   } else {
    //     this.f = this.families;
    //   }
    // } else {
    //   this.f = this.families.filter(family => family.cityId === value);
    // }
  }

  ngOnInit() {

    this.coreService.getcenter().subscribe(response => {
      this.center = response;
      // console.log(' center :'  + JSON.stringify(this.center));
    });
    this.coreService.getzone().subscribe(zones => {
      this.zones = zones;
      // console.log(' zones :'  + JSON.stringify(this.zones[0].zoneId));
    });
    this.coreService.getcity().subscribe(cities => {
      this.cities = cities;
      // console.log(' cities :'  + JSON.stringify(this.cities));
    });

    this.mapService.getFamilyCount().subscribe(families => {
      this.families = families;
      // console.log(' cities :'  + JSON.stringify(this.cities));

    });
    this.selectedValueZone = '-1';
  }

  ShowMap(value) {
    // console.log(' value :'  + value);
    this.showMap = !value;
  }

  ShowChart(value) {

    this.showChart = !value;
    this.families = this.families;
  }
}
