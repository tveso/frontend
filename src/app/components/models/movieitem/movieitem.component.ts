import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../../services/util.service';
import {slugify} from '../../utils/functions';
import {Movie} from '../../../entities/movie';


@Component({
  selector: 'app-movieitem',
  templateUrl: './movieitem.component.html',
  styleUrls: ['./movieitem.component.scss']
})
export class MovieitemComponent implements OnInit {
    @Input() movie;
    @Input() mode = 'poster';
    @Input() callback;
    Movie = Movie;
    private imagePath: string;
    private orientation: string;
  constructor(public utilService: UtilService) { }

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
      return
    }
    hasCallback() {
        return typeof this.callback !== 'undefined';
    }
}
