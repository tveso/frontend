import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../../services/util.service';


@Component({
  selector: 'app-movieitem',
  templateUrl: './movieitem.component.html',
  styleUrls: ['./movieitem.component.css']
})
export class MovieitemComponent implements OnInit {
    @Input() movie;
  constructor(public utilService: UtilService) { }

  ngOnInit() {
  }
}
