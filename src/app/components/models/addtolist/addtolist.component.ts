import {Component, Directive, ElementRef, HostListener, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CreatelistComponent} from '../../sections/createlist/createlist.component';
import {ListService} from '../../../services/list.service';
import {UserService} from '../../../services/user.service';
import {List} from '../../../entities/list';

@Component({
  selector: 'app-addtolist',
  templateUrl: './addtolist.component.html',
  styleUrls: ['./addtolist.component.scss']
})
export class AddtolistComponent implements OnInit {
    private resource: any;
    private resourceType: string;
    nav = 1;

  constructor(public dialogRef: MatDialogRef<AddtolistComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private listService: ListService, private userService: UserService,
              private matSnackBar: MatSnackBar) {
      this.resource = data.resource;
      this.resourceType = data.resource.type;
  }

  ngOnInit() {
  }

  loadUserLists(params) {
      delete params['type'];
      return  this.listService.userLists(this.userService.getUser().id.$oid, params);
  }
  addToList(list: List) {
      const params = {resource: this.resource._id, type: this.getResourceType()};
      this.listService.addToList(list._id.$oid, params).subscribe((a) => {
          this.matSnackBar.open(`${this.getName()} añadida a la lista ${list.title}`, 'CERRAR', {duration: 3000});
      });
  }



    getResourceType() {
        let result = 'movies';
        switch (this.resource.type) {
            case 'movie':
                result = 'movies';
                break;
            case 'tvshow':
                result = 'tvshows';
                break;
            case 'person':
                result = 'people';
                break;
            case 'episode':
                result = 'episodes';
                break;
        }

        return result;
    }

    getName() {
        let result = 'movies';
        switch (this.resource.type) {
            case 'movie':
                result = this.resource['title'];
                break;
            case 'tvshow':
                result = this.resource['name'];
                break;
            case 'person':
                result = this.resource['name'];
                break;
            case 'episode':
                result = `${this.resource.show.name} ${this.resource.season_number}x${this.resource.episode_number} - ${this.resource.title}`;
                break;
        }

        return result;
    }

}

@Directive({
    selector: '[appAddToListResource]'
})
export class AddToListResourceDirective {
  @Input() resource;

    constructor(public dialog: MatDialog, public el: ElementRef) { }

    @HostListener('click') onClick() {
        this.dialog.open(AddtolistComponent, {
            panelClass: 'dialog',
            hasBackdrop: true,
            data: {resource: this.resource},
            width: '80%',
            backdropClass: 'dialog-overlay-black',
            position: {top: '0'}
        });
    }

}
