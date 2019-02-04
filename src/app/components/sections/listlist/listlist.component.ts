import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreatelistComponent} from '../createlist/createlist.component';
import {ListService} from '../../../services/list.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-listlist',
  templateUrl: './listlist.component.html',
  styleUrls: ['./listlist.component.scss']
})
export class ListlistComponent implements OnInit {
    private type = 'list';
    updates$ = new Subject();
  constructor(public dialog: MatDialog, private listService: ListService) {
      this.updates$ = this.listService.changes$;
  }

  ngOnInit() {

  }

  openCreateListDialog() {
      const ref = this.dialog.open(CreatelistComponent, {
          panelClass: 'dialog',
          hasBackdrop: true,
          width: '80%',
          backdropClass: 'dialog-overlay-black',
          position: {top: '0'}
      });
      ref.afterClosed().subscribe((a) => {
          this.updates$.next({callback: 'add', resource: a});
      });
  }

     load(params: any) {
      params.type = this.type;
      return this.listService.all(params);
    }
}
