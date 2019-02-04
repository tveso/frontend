import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {SimpleMdService} from '../../../services/simple-md-service';
import {Movie} from '../../../entities/movie';
import {getNumPad} from '../../models/tvshowepisode/tvshowepisode.component';
import {ListService} from '../../../services/list.service';
import {List} from '../../../entities/list';

@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.scss']
})
export class CreatelistComponent implements OnInit {
    @Output() created = new EventEmitter<List>();
    public  info: FormGroup;
    public step = 1;
    public limits = {'tvshows': 100, 'movies': 100, 'people': 100, 'episodes': 100};
    public options: any;
    public params = {mode: 'automatic', type: 'movie'};
    public selected = {'movies': [], 'tvshows': [], 'people': [], 'episodes': []};
    search = {'tvshow': '', 'movie': '', 'people': '', 'episode': ''};
  constructor( public dialogRef: MatDialogRef<CreatelistComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,  protected SMDE: SimpleMdService, protected listService: ListService) {
  }

  ngOnInit() {
      this.options = this.SMDE.options;
      this.info = new FormGroup({
          description: new FormControl(),
          title: new FormControl(),
      });
  }
  isValid() {
      return this.selected.episodes.length < this.limits.episodes && this.selected.people.length < this.limits.people
      && this.selected.tvshows.length < this.limits.tvshows && this.selected.movies.length < this.limits.movies;
  }


    getFilteredResults(search: string, resource) {
        if (search === '' || typeof search === 'undefined') {
            return this.selected[resource];
        }
        return this.selected[resource].filter((a: Movie) => {
            if (a.title.toLowerCase().trim().search(search.toLowerCase().trim()) > -1) {
                return true;
            }
        });
    }

    removeResource(movie: any, resource: string) {
      const res = this.selected[resource];
      const index = res.indexOf(movie);
      if (index > -1) {
          res.splice(index, 1);
      }
    }
    getNumericalEpisode(episode) {
        return `${episode.season_number}x${getNumPad(episode.episode_number)}`;
    }

    editList() {

      if (!this.isValid()) {
          return;
      }
        let data = this.info.getRawValue();
        const selected = Object.assign({}, this.selected);
        selected.movies = selected.movies.map(a => a._id);
        selected.tvshows = selected.tvshows.map(a => a._id);

        selected.episodes = selected.episodes.map(a => a._id);
        selected.people = selected.people.map(a => a._id);
        data = Object.assign(data, selected);
        this.listService.create(data).subscribe((a: List) => {
            this.created.emit(a);
            this.dialogRef.close(a);
        });
    }
    changeStep(step) {
      this.step = step;
    }
}

@Component({
    selector: 'app-editlist',
    templateUrl: './createlist.component.html',
    styleUrls: ['./createlist.component.scss']
})
export class EditlistComponent extends CreatelistComponent  implements OnInit {
    private list: List;
    constructor( public dialogRef: MatDialogRef<CreatelistComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: any,  protected SMDE: SimpleMdService, protected listService: ListService) {
        super(dialogRef, data, SMDE, listService);
        this.list = data.list;
    }
    ngOnInit() {
        this.options = this.SMDE.options;
        this.info = new FormGroup({
            description: new FormControl(),
            title: new FormControl(),
        });
        this.info.controls.description.setValue(this.list.description);
        this.info.controls.title.setValue(this.list.title);
        this.selected.movies = this.list.movies;
        this.selected.episodes = this.list.episodes;
        this.selected.tvshows = this.list.tvshows;
        this.selected.people = this.list.people;
    }
    editList() {

        if (!this.isValid()) {
            return;
        }
        let data = this.info.getRawValue();
        const selected = Object.assign({}, this.selected);
        selected.movies = selected.movies.map(a => a._id);
        selected.tvshows = selected.tvshows.map(a => a._id);

        selected.episodes = selected.episodes.map(a => a._id);
        selected.people = selected.people.map(a => a._id);
        data = Object.assign(data, selected);
        this.listService.edit(this.list._id.$oid, data).subscribe((a: List) => {
            this.created.emit(a);
            this.dialogRef.close(a);
        });
    }
}

