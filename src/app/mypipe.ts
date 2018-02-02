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

    if (query == 99) {
      cities.push(values[0]);
      for (let i = 1; i < values.length; i++) {

          cities.push(values[i]);
        }
        console.log('in 99');


    }    else {
      cities.push(values[0]);
    for (let i = 0; i < values.length; i++) {

          if (values[i].zoneid == query) {
            cities.push(values[i]);

  }
    }

  }
  return cities;


}
}
