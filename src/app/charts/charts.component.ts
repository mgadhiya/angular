import { Component, OnInit, Input } from '@angular/core';
import {FamilyCount} from '../model/familycount.model';
import { MapService } from '../services/map.service';
import { Data } from '../model/chart.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  demoId: string;
  dataSource: any;
  ChartType: String = 'pie3d';
  families: FamilyCount [];



  constructor(private mapService: MapService) {
    let r: any;
    this.mapService.getFamilyCount().subscribe(families => {
      this.families = families;

        r = this.families.map((family) => Object.assign({
        label: family.city,
        value: family.familycount
      }));


      console.log(' r :'  + JSON.stringify(r));

      console.log(' families :'  + JSON.stringify(families));

      this.dataSource = {
        chart: {
          'caption':  'Family Count',
          'xAxisname': 'City',
          'yAxisName': 'No. Of Families',
          'numberPrefix': '',
          'baseFont': 'Roboto',
          'baseFontSize': '14',
          'labelFontSize': '15',
          'captionFontSize': '20',
          'subCaptionFontSize': '16',
          'paletteColors': '#2c7fb2,#6cc184,#fed466',
          'bgColor': '#ffffff',
          'legendShadow': '0',
          'valueFontColor': '#ffffff',
          'showXAxisLine': '1',
          'xAxisLineColor': '#999999',
          'divlineColor': '#999999',
          'divLineIsDashed': '1',
          'showAlternateHGridColor': '1',
          'subcaptionFontBold': '0',
          'subcaptionFontSize': '14',
          'showHoverEffect': '1',
          'useDataPlotColorForLabels': '1'
        },
        'data': r
      };




  });


  }
  onChange(value: String) {
    this.ChartType = value;

  }
}
