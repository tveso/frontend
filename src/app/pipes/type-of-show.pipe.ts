import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'typeOfShow'
})
export class TypeOfShowPipe implements PipeTransform {

    transform(value: any, args?: any): any {
      if (value === 'movie') {
        return 'Película';
      }
      if (value === 'tvshow') {
        return 'Serie';
      }
      if (value === 'person') {
          return 'Persona';
      }
        return value;
    }

}
