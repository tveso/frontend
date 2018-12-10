import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-itembadge',
  templateUrl: './itembadge.component.html',
  styleUrls: ['./itembadge.component.scss']
})
export class ItembadgeComponent implements OnInit {
  @Input() item: any = {};
  constructor() { }

  ngOnInit() {
  }
  getName() {
    if (this.item.type === 'movie') {
      return this.item.title;
    }
    if (this.item.type === 'person' || this.item.type === 'tvshow') {
      return this.item.name;
    }
  }
  getIcon() {
      if (this.item.type === 'movie') {
          return 'movie';
      }
      if (this.item.type === 'person') {
          return 'person';
      }
      if (this.item.type === 'tvshow') {
          return 'tv';
      }
      return ';'
  }

}
