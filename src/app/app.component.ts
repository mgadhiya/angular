import { Component, AfterViewInit } from '@angular/core';
import { FullTextSearchPipe } from './mypipe';
import { CoreService } from './services/core.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MapService } from './services/map.service';
import { ChartService } from './services/chart.service';
import { EnvironmentSpecificService } from './services/environment.specific.service';
import { ChartData } from './model/chartdata.model';
import { MapData } from './model/mapdata.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chartList: ChartData[];
  chartListByZone: ChartData[];
  chartListByCity: ChartData[];
  locations: MapData[];

  showMap = false;
  showChart = false;

  currentaddress: string;
  currentradius = 5;
  currentlatitude: any;
  currentlongitude: any;
  currentzipcode: any;

  public userSettingsforlocation: any = {
    showSearchButton: false,
    inputPlaceholderText: 'Enter Address Here...',
    currentLocIconUrl:
      'https://cdn4.iconfinder.com/data/icons/proglyphs-traveling/512/Current_Location-512.png',
    locationIconUrl:
      'http://www.myiconfinder.com/uploads/iconsets/369f997cef4f440c5394ed2ae6f8eecd.png',
    noOfRecentSearchSave: 8
  };

  constructor(
    private coreService: CoreService,
    private mapService: MapService,
    private chartService: ChartService,
    private envSpecificService: EnvironmentSpecificService
  ) {}

  ngOnInit() {
    this.currentaddress = null;
    this.currentradius = 5;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentlatitude = position.coords.latitude;
        this.currentlongitude = position.coords.longitude;

        this.loadmapchart();
      });
    }
  }

  onChangeRadius(value: number) {
    this.showMap = false;
    this.showChart = false;
    this.currentradius = value;
    if (this.currentaddress == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.currentlatitude = position.coords.latitude;
          this.currentlongitude = position.coords.longitude;
          this.loadmapchart();
        });
      }
     } else {
      this.loadmapchart();
     }
  }

  autoCompleteCallback1(selectedData: any) {

    console.log( 'in load autoCompleteCallback1: ');
    this.showMap = false;
    this.showChart = false;

    this.currentaddress = JSON.stringify(selectedData.data.formatted_address);
    this.currentlatitude = selectedData.data.geometry.location.lat;
    this.currentlongitude = selectedData.data.geometry.location.lng;
    this.currentzipcode = JSON.stringify(selectedData.data.address_components[7].long_name);

    console.log( ' this.currentaddress' +  this.currentaddress);
    console.log( ' this.Zipcode : ' +  this.currentzipcode);
    if (this.currentaddress == null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.currentlatitude = position.coords.latitude;
          this.currentlongitude = position.coords.longitude;
          this.loadmapchart();
        });
      }
     }  else {
      this.loadmapchart();
     }

  }

  loadmapchart() {
    console.log('this.currentaddress : ' +  this.currentaddress);
    console.log('this.currentlatitude : ' + this.currentlatitude);
     console.log('this.currentlongitude : ' + this.currentlongitude);
     console.log('this.currentradius : ' + this.currentradius * 1609.34);

    console.log( 'in load mapchart: ');
    this.chartService
    .getFamilyCountByCatLatLng(
      this.currentlatitude,
      this.currentlongitude,
      this.currentradius,
      this.currentzipcode
    )
    .subscribe(chartList => {
      this.chartList = chartList || [];
      this.showChart = true;
    });
    this.chartService
    .getFamilyCountByCatLatLngZone(
      this.currentlatitude,
      this.currentlongitude,
      this.currentradius
    )
    .subscribe(chartList => {
      this.chartListByZone = chartList || [];
      this.showChart = true;
    });
    this.chartService
    .getFamilyCountByCatLatLngCity(
      this.currentlatitude,
      this.currentlongitude,
      this.currentradius
    )
    .subscribe(chartList => {
      this.chartListByCity = chartList || [];
      this.showChart = true;
    });
  this.mapService
    .getMapDataByLatLng(
      this.currentlatitude,
      this.currentlongitude,
      this.currentradius
    )
    .subscribe(locations => {
      this.locations = null;
      this.locations = locations;
      this.showMap = true;
    });
  }
}
