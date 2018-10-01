import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      moment.locale('es');
    const mom = moment(parseFloat(value) * 1000);
    return mom.fromNow();
  }

}
