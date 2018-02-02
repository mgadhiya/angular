import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { FullTextSearchPipe } from './mypipe';

import { AppComponent } from './app.component';
import { GmapComponent } from './gmap/gmap.component';
import { ChartsComponent } from './charts/charts.component';

// Import angular2-fusioncharts
import { FusionChartsModule } from 'angular2-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Import FusionCharts Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';

import { MapService } from './services/map.service';



@NgModule({
  declarations: [
    AppComponent,
    FullTextSearchPipe,
    GmapComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FusionChartsModule.forRoot(FusionCharts, Charts)
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
