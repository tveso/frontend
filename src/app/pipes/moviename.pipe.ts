import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moviename'
})
export class MovienamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value.titles !== 'undefined') {
      return value.titles.ES;
    }
    return value.title;
  }

}
