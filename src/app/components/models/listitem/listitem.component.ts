import {Component, Input, OnInit} from '@angular/core';
import {List} from '../../../entities/list';
import {shuffle} from '../../utils/functions';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.scss']
})
export class ListitemComponent implements OnInit {

  @Input() list: List;
  @Input() callback;
  List = List;
  pictures;
  constructor() { }

  ngOnInit() {

  }

    getPictures() {
      if (typeof  this.pictures === 'undefined') {
          let result = [];
          this.list.episodes.forEach(a => result.push(a.image));
          this.list.movies.forEach(a => result.push(a.image));
          this.list.tvshows.forEach(a => result.push(a.image));
          this.list.people.forEach(a => result.push(a.image));
          result = shuffle(result).slice(0, 4);
          this.pictures = result;
      }
      return this.pictures;
    }
}
