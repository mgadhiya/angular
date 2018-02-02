import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import {} from '@types/markerclustererplus';

import { MapService } from '../services/map.service';
import { MapData } from '../model/mapdata';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements AfterViewInit {
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markercluster: any;
  markers = [];
  locations: MapData[];

  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.mapService
        .getMapdata()
        .subscribe(locations => (this.locations = locations));

      this.map = new google.maps.Map(this.gmapElement.nativeElement, {
        center: new google.maps.LatLng(
          Number(this.locations[0].latitude),
          Number(this.locations[0].longitude)
        ),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: true
      });

      let marker;
      const tempmarkers = [];
      for (let i = 0; i < this.locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            this.locations[i].latitude,
            this.locations[i].longitude
          ),
          label: this.locations[i].count.toString(),
          icon: { url: 'assets/images/Home/FF6600.png' }
        });
        marker.setMap(this.map);
        let infowindow = null;
        google.maps.event.addListener(marker, 'click', function() {
          if (!infowindow) {
            infowindow = new google.maps.InfoWindow();
          }
          infowindow.setContent('No. of people:' + this.locations[i].count);
          infowindow.open(this.map, marker);
        });
        tempmarkers.push(marker);
      }
      this.markercluster = new MarkerClusterer(this.map, tempmarkers, {
        imagePath:
          'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        styles: [
          {
            url: 'assets/images/Man/FF6600.png',
            width: 35,
            height: 35
          }
        ],
        gridSize: 5
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

      const tempmarkersclusterer = this.markercluster;
      const cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFFF00',
        fillOpacity: 0.35,
        center: new google.maps.LatLng(
          Number(this.locations[0].latitude),
          Number(this.locations[0].longitude)
        ),
        radius: 1000,
        editable: true,
        draggable: true
      });

      cityCircle.setMap(this.map);
      cityCircle.bindTo('center', tempmarkers[0], 'position');

      google.maps.event.addListener(cityCircle, 'radius_changed', () => {
        setMap1(this.map);
      });

      google.maps.event.addListener(cityCircle, 'dragend', () => {
        setMap1(this.map);
      });

      function setMap1(map) {
        console.log('radius_changed : ');
        const bounds = cityCircle.getBounds();

        console.log(
          'before getMarkers()' + tempmarkersclusterer.getMarkers().length
        );
        let marker1 = [];
        for (let p = 0; p < tempmarkersclusterer.getMarkers().length; p++) {
          marker1 = tempmarkersclusterer.getMarkers();
        }
        for (let i = 1; i < tempmarkers.length; i++) {
          if (!bounds.contains(tempmarkers[i].position)) {
            tempmarkers[i].setMap(null);
            if (marker1.includes(tempmarkers[i])) {
              tempmarkersclusterer.removeMarker(tempmarkers[i]);
            }
          } else {
            tempmarkers[i].setMap(map);

            if (!marker1.includes(tempmarkers[i])) {
              tempmarkersclusterer.addMarker(tempmarkers[i]);
            }
          }
        }
        console.log(
          'before getMarkers()' + tempmarkersclusterer.getMarkers().length
        );
      }
    }, 1000);
  }
}
