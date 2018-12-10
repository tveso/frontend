import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if (typeof value === 'undefined') {
          return '';
      }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
