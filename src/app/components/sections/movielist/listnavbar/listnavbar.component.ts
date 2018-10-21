import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-listnavbar',
  templateUrl: './listnavbar.component.html',
  styleUrls: ['./listnavbar.component.css']
})
export class ListnavbarComponent implements OnInit {

  @Input() params = {sort: {}, type: null};
  constructor() { }

  ngOnInit() {
  }
    getNavClass(...type) {
      let result = false;
      type.forEach((a) => {
          if (this.params.sort === a) {
              result = true;
              return;
          }
      });

      return result;
    }

    getDateObject() {
        return (this.params.type === 'movie') ? {sort: 'release_date'} : {sort: 'first_air_date'} ;
    }
}
