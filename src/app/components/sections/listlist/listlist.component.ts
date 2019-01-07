import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ShowRecommendedComponent} from '../../models/show-recommended/show-recommended.component';
import {CreatelistComponent} from '../createlist/createlist.component';
import {ListService} from '../../../services/list.service';
import {List} from '../../../entities/list';

@Component({
  selector: 'app-listlist',
  templateUrl: './listlist.component.html',
  styleUrls: ['./listlist.component.scss']
})
export class ListlistComponent implements OnInit {
    private type = 'list';

  constructor(public dialog: MatDialog, private listService: ListService) { }

  ngOnInit() {
  }

  openCreateListDialog() {
      this.dialog.open(CreatelistComponent, {
          panelClass: 'dialog',
          hasBackdrop: true,
          width: '80%',
          backdropClass: 'dialog-overlay-black',
          position: {top: '0'}
      });
  }

     load(params: any) {
      params.type = this.type;
      return this.listService.all(params);
    }
}
