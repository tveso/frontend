import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'extraMdTags'
})
export class ExtraMdTagsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      const re = /-([a-zA-Z]*)-(.*?)-end-/gmiu;
      let m;
      const result: any = [];
      let currentIndex = 0;
      while (true) {
          m = re.exec(value);
          if (m) {
              const index = m.index;
              const length = m[0].length;
              const val = m[2];
              result.push({'type': m[1], 'text': val, 'index': index, 'endindex': index + length});
              currentIndex = index + length;
          } else {
              break;
          }
      }
    if (result.length === 0) {
          result.push({'type': 'text', 'text': value});
    } else {
        let currentIndex = 0;
        result.forEach((a) => {
           if (a.index !== currentIndex) {
               const text = value.toString().substr(currentIndex,  a.index - currentIndex);
               const length = text.length;
               const endIndex = currentIndex + length;
               result.push({'type':  'text', 'text': text, 'index': currentIndex, 'endindex': endIndex});
               currentIndex = a.endindex;
           }
        });
        const text = value.toString().substr(currentIndex);
        const length = text.length;
        const endIndex = currentIndex + length;
        result.push({'type':  'text', 'text': text, 'index': currentIndex, 'endindex': endIndex});
        result.sort((a, b) => {
            return a.index - b.index;
        });
    }
    return result;
  }

}
