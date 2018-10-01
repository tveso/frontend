import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moviename'
})
export class MovienamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if (typeof value.name !== 'undefined') {
          return value.name;
      }
    if (typeof value.title !== 'undefined') {
      return value.title;
    }
    return value.title;
  }

}
