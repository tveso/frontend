import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '../../../entities/list';
import {shuffle} from '../../utils/functions';
import {UserService} from '../../../services/user.service';
import {ListService} from '../../../services/list.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../utils/confirm-dialog/confirm-dialog.component';

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
  constructor(private userService: UserService, private listService: ListService,  public dialog: MatDialog) { }

  ngOnInit() {

  }
    hasCallback() {
        return this.callback instanceof Function;
    }
    handle(list, $event: Event) {
        if (this.hasCallback()) {
            return this.callback(list, $event);
        }
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
    delete() {
      let previous = false;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {title: `¿Quieres borrar tu lista "${this.list.title}"?`,
                message: 'Si pulsas si, se borrará de forma temporal tu lista y podrás recuperarla pero pasado el tiempo se borrará' +
                    'definitivamente', confirmButton: 'Si, borrarla', cancelButton: 'No'}
        });
        dialogRef.afterClosed().subscribe((a) => {
            previous = a;
            if (a === true)  {
                this.listService.delete(this.list._id.$oid).subscribe((message) => {
                    this.listService.changes$.next({resource: this.list, callback: 'delete'});
                });
            }
        });
    }

    canBeDeleted() {
        return this.list.user._id.$oid === this.userService.getUser().id.$oid;
    }
}
