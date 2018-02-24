import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import {} from '@types/googlemaps';
import {} from '@types/markerclustererplus';

import { MapService } from '../services/map.service';
import { MapData } from '../model/mapdata';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
 // template: `<button (click)="LoadMap()">Load Map</button> <div #map style="width:800px; height:600px">loading...</div>`,
  styleUrls: ['./gmap.component.css']

})
export class GmapComponent implements AfterViewInit {
  @ViewChild('map') gmapElement: any;

  map: google.maps.Map;
  mapcircle: google.maps.Circle;
  mapractangle: google.maps.Rectangle;
  markercluster: any;
  markers = [];
  locations: MapData[];


  constructor(private mapService: MapService) {}

  ngAfterViewInit() {

    this.mapService
    .getMapdata()
    .subscribe(response => {
        this.locations = response;
        console.log('In ngAfterViewInit' + JSON.stringify(this.locations));
     // initiate map
      this.map = new google.maps.Map(this.gmapElement.nativeElement, {
        center: new google.maps.LatLng(Number(this.locations[1].latitude),Number(this.locations[1].longitude)),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: true
      });
           this.drawcircleinmap(this.map);
           this.markthemap(this.map);
           this.setclusterformarkers(this.map);
           // this.mapcircle.bindTo('center', this.markers[0], 'position');
  }); // scscribe

  }

  private drawcircleinmap(map) {
     this.mapcircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFFF00',
      fillOpacity: 0.35,
      center: map.center,
      radius: 500000,
      editable: true
     // draggable: true
    });

  //  this.mapcircle.bindTo('center', map.center, 'position');
    this.mapcircle.setMap(this.map);
    google.maps.event.addListener(this.mapcircle, 'radius_changed', () => {
      this.mapactionspherical(this.map);
    });

    google.maps.event.addListener(this.mapcircle, 'center_changed', () => {
      this.mapactionspherical(this.map);
    });
  }

  private drawRactangleinmap(map,bounds) {
  //  const bounds = this.mapcircle.getBounds();
  if (this.mapractangle) {
    this.mapractangle.setMap(null);
  }
    this.mapractangle = new google.maps.Rectangle({
      strokeColor   : '#FF0099',
      strokeWeight  : 2,
      fillOpacity   : 0,
      bounds        : bounds
   });

   this.mapractangle.setMap(this.map);

}
  private mapaction(map) {
    const bounds = this.mapcircle.getBounds();


    console.log('In mapaction');
    console.log('original cluster : ' + this.markercluster.getMarkers().length);
    console.log('original maker :' + this.markers.length);
    console.log('bounds :' + bounds);


    let marker1 = [];
    for (let p = 0; p < this.markercluster.getMarkers().length; p++) {
      marker1 = this.markercluster.getMarkers();
    }
    for (let i = 0; i < this.markers.length; i++) {
      if (bounds.contains(this.markers[i].position)) {
        console.log('in if');
        if (!marker1.includes(this.markers[i])) {
          this.markercluster.addMarker(this.markers[i]);
          this.markers[i].setMap(map);

        }
      } else {
        console.log('in else');

        if (marker1.includes(this.markers[i])) {
          this.markercluster.removeMarker(this.markers[i]);
          this.markers[i].setMap(null);
        }
      }
    }

    console.log('original cluster : ' + this.markercluster.getMarkers().length);
    console.log('original maker :' + this.markers.length);

    this.drawRactangleinmap(this.map,bounds);

  }

  private mapactionspherical(map) {
    const bounds = this.mapcircle.getBounds();
    const radius = this.mapcircle.getRadius();
    const center = this.mapcircle.getCenter();


    console.log('In mapaction');
    console.log('original cluster : ' + this.markercluster.getMarkers().length);
    console.log('original maker :' + this.markers.length);
    console.log('bounds :' + bounds);


    let marker1 = [];
    for (let p = 0; p < this.markercluster.getMarkers().length; p++) {
      marker1 = this.markercluster.getMarkers();
    }
    for (let i = 0; i < this.markers.length; i++) {

      const dist =  google.maps.geometry.spherical.computeDistanceBetween(
        center,
        this.markers[i].position
    ) <= radius;


      if (dist) {
        console.log('in if');
        this.markers[i].setMap(map);

        if (!marker1.includes(this.markers[i])) {
          this.markercluster.addMarker(this.markers[i]);

        }
      } else {
        console.log('in else');
        this.markers[i].setMap(null);
        if (marker1.includes(this.markers[i])) {
          this.markercluster.removeMarker(this.markers[i]);

        }
      }
    }

    console.log('original cluster : ' + this.markercluster.getMarkers().length);
    console.log('original maker :' + this.markers.length);

    this.drawRactangleinmap(this.map,bounds);

  }
  private setclusterformarkers(map) {
    this.markercluster = new MarkerClusterer(this.map, this.markers, {
      styles: [
        {
          url: 'assets/images/Home/FF6600.png',
          width: 35,
          height: 35,
          fontStyle: 'bold'
        }
      ]
    });

    this.markercluster.setCalculator(function(markers, numStyles) {
      let index = 0;
      let count = 0;
      for (let j = 0; j < markers.length; j++) {
        if (markers[j].label) {
          count += Number(markers[j].label);
        } else {
          count++;
        }
      }
      let dv = Number(markers.length);
      while (dv !== 0) {
        dv = Number(dv) / 10;
        index++;
      }

      index = Math.min(index, numStyles);
      return {
        text: count,
        index: index
      };
    });

  }
  private markthemap(map)  {

    let marker;
     for (let i = 0; i < this.locations.length; i++) {
      marker  = new google.maps.Marker({
        position: new google.maps.LatLng(this.locations[i].latitude,this.locations[i].longitude),
        label: this.locations[i].count.toString(),
        icon: { url: 'assets/images/Man/FF6600.png' },
        title : this.locations[i].city.toString()
      });
      marker.setMap(this.map);
      let infowindow = null;
      google.maps.event.addListener(marker, 'click', function() {

          infowindow = new google.maps.InfoWindow();

        infowindow.setContent('City : ' + this.title + '\n No. of people:' + this.label );
        infowindow.open(this.map, this);
      });
      this.markers.push(marker);

    }


  }




    // }

    LoadMap() {
    console.log(this.locations);

    // let infowindow = null;

      // google.maps.event.addListener(marker, 'click', function() {
      //   if (!infowindow) {
      //     infowindow = new google.maps.InfoWindow();
      //   }
      //   infowindow.setContent('No. of people:' + this.locations[i].count);
      //   infowindow.open(this.map, marker);
      // });
      // tempmarkers.push(marker);
    }





}
