import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  @Input() genre: string;
    @Input() type: string;
    genres = {'Acción': 'c2361c', 'Aventuras': '8c6f55', 'Sci-Fi': '9c3e97', 'Ciencia ficción': '9c3e97', 'Drama': '37d054',
        'Romance': 'ee2a8d', 'Thriller': '295364', 'Crimen': '858774', 'Aventura': '8c6f55', 'Sci-Fi & Fantasy': '9c3e97',
    'Action & Adventure': 'c2361c', 'Terror': '141139', 'Misterio': '0f9184', 'Suspense': '295364'};
  constructor() { }

  ngOnInit() {
  }

    getBg(genre: string) {
      if (genre in this.genres) {
          return "#" + this.genres[genre];
      }
    }

}
