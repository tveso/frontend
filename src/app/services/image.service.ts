import {Injectable, Input} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
    uri = 'https://image.tmdb.org/t/p';
    size = 'w154';
  constructor() { }
  getImageUrl(image: string, size = 'w154') {
      if (typeof image === 'undefined' || image === '' ) {
         return 'http://l.yimg.com/os/mit/media/m/entity/images/movie_placeholder-103642.png';
      }
      if (typeof size !== 'undefined') {
          this.size = size;
      }
    return `${this.uri}/${this.size}/${image}`;
  }
}
