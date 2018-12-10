import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FindService} from '../../../services/find.service';
import {ConfigService} from '../../../services/config.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {
    public callback: any;
    protected type = 'movie';

    constructor(protected findService: FindService, protected router: Router, public activatedRouter: ActivatedRoute,
              public configService: ConfigService) {
  }

  ngOnInit() {
        this.callback = this.load.bind(this);
  }

  load(params) {
        params.type = this.type;
        return this.findService.all(params);
  }

}

