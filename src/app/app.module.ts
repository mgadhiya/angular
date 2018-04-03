import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

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
import { CoreService } from './services/core.service';
import {TabModule} from 'angular-tabs-component';


@NgModule({
  declarations: [
    AppComponent,

    FullTextSearchPipe,
    GmapComponent,
    ChartsComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    FusionChartsModule.forRoot(FusionCharts, Charts),
    TabModule
  ],
  providers: [MapService, CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
