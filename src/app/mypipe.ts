import { Pipe, PipeTransform } from '@angular/core';
import { City } from './City';
@Pipe({
  name: 'fullTextSearch',
  pure: false
})
export class FullTextSearchPipe implements PipeTransform {

  constructor() { }

  transform(values: any, query: number, field: string): any {
    const  cities: any[] = [];
   //console.log(' values :'  + JSON.stringify(values));
   // console.log(' query :'  + query);
  // console.log(' field :'  + field);
    if (query == -1) {
      if (values)      {
      cities.push(values[0]);
      for (let i = 1; i < values.length; i++) {

          cities.push(values[i]);
        }
      }


    }    else {
      cities.push(values[0]);
    for (let i = 0; i < values.length; i++) {

          if (values[i].zoneId == query) {
            cities.push(values[i]);

  }
    }

  }
  return cities;


}
}
