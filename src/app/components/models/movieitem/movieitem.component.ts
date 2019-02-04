import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UtilService} from '../../../services/util.service';
import {Movie} from '../../../entities/movie';
import {MoviesService} from '../../../services/movies.service';
import {ImageService} from '../../../services/image.service';


@Component({
  selector: 'app-movieitem',
  templateUrl: './movieitem.component.html',
  styleUrls: ['./movieitem.component.scss']
})
export class MovieitemComponent implements OnInit {
    @Input() movie;
    @ViewChild('tooltip') tooltipElement: ElementRef;
    @Input() mode = 'poster';
    @Input() callback;
    public completeMovie: Movie;
    Movie = Movie;
    private imagePath: string;
    private orientation: string;
    movie: any = false;
  constructor(public utilService: UtilService, private movieService: MoviesService, private imageService: ImageService) { }

  ngOnInit() {
    if (this.mode === 'poster') {
      this.imagePath = 'poster_path';
      this.orientation = 'vertical';
    } else {
      this.imagePath = 'backdrop_path';
      this.orientation = 'horizontal';
    }
  }

    handle(show, $event) {
      if (this.hasCallback()) {
          return this.callback(show, $event);
      }
    }

    getUrl() {
      return;
    }
    hasCallback() {
        return typeof this.callback !== 'undefined';
    }


}
