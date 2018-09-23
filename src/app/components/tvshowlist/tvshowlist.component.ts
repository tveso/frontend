import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TvshowService} from '../../services/tvshow.service';
import {MovielistComponent} from '../movielist/movielist.component';

@Component({
  selector: 'app-tvshowlist',
  templateUrl: './tvshowlist.component.html',
  styleUrls: ['../movielist/movielist.component.css']
})
export class TvshowlistComponent extends MovielistComponent {
    protected type = 'tvshow';



}
