import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input
} from '@angular/core';
import { ChartData } from '../model/chartdata.model';
import { Data } from '../model/chart.model';
import { ChartService } from '../services/chart.service';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  demoId: string;
  dataSource: any;
  ChartType: String = 'msColumn3D';
  families: ChartData[];

  @Input() chartList: ChartData[];

  ngOnInit() {
    let p: any;
    let q: any;
    p = [
      {
        category: this.chartList.map(family =>
          Object.assign({
            label: family.city + '(' + family.distanceInMiles + ')'
          })
        )
      }
    ];
    q = [
      {
        seriesname: 'Satsangi',
        data: this.chartList.map(family =>
          Object.assign({
            value: family.satsangi
          })
        )
      },
      {
        seriesname: 'Gunbhavi',
        data: this.chartList.map(family =>
          Object.assign({
            value: family.gunbhavi
          })
        )
      },
      {
        seriesname: 'Visitor',
        data: this.chartList.map(family =>
          Object.assign({
            value: family.visitor
          })
        )
      },
      {
        seriesname: 'Unknown-Category',
        data: this.chartList.map(family =>
          Object.assign({
            value: family.unknown
          })
        )
      }
    ];

    this.dataSource = {
      chart: {
        caption: 'Family Count',
        xAxisname: 'City',
        yAxisName: 'No. Of Families',
        numberPrefix: '',
        plotFillAlpha: '80',

      },
      // 'data': r,
      dataset: q,
      categories: p
    };
  }

  constructor(
    private chartService: ChartService,
    private coreService: CoreService
  ) {}

  onChange(value: String) {
    console.log('this.ChartType : ' + this.ChartType);
    this.ChartType = value;

  }
}
