import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FindService} from '../../../services/find.service';
import {MatSnackBar} from '@angular/material';
import {Movie} from '../../../entities/movie';
import {MoviesService} from '../../../services/movies.service';
import {TvshowService} from '../../../services/tvshow.service';

@Component({
  selector: 'app-episode-selector',
  templateUrl: './episode-selector.component.html',
  styleUrls: ['./episode-selector.component.scss']
})
export class EpisodeSelectorComponent implements OnInit {
    searchControl: FormControl = new FormControl();
    @Input() searchText;
    @Input() selecteds = [];
    @Input() showFilter = {'type': 'tvshow'};
    @Input() showLength = 100;
    callback;
    public results: any[] = [];
    selectedTvshow: Movie;
    private episodes: any;
    constructor(private findService: FindService, private matSnack: MatSnackBar, private movieService: MoviesService,
                private tvshowService: TvshowService) { }
    @Output() output: EventEmitter<any> = new EventEmitter<any>();
    selectedSeason: any;
    ngOnInit() {
        this.callback = this.load.bind(this);
    }

    load(params) {
        return this.findService.all(params);
    }
    selectTvshow(tvshow: Movie) {
      const id = tvshow._id;
      this.movieService.getById(id).subscribe((ts: Movie) => {
          this.selectedTvshow = ts;
      });
    }

    filteredFn(items: Array<any>) {
        return items.filter((a: any) => {
            return this.selecteds.indexOf(a) === -1;
        });
    }

    select(id, $event) {
        if (this.exists(id)) {
            this.remove(id);
        } else {
            if (this.selecteds.length < this.showLength) {
                this.selecteds.push(id);
            } else {
                this.matSnack.open('Solo puedes seleccionar un máximo de ' + this.showLength, 'CERRAR');
            }
        }
        this.output.emit(this.selecteds);
    }

    getClass(id) {
        return (this.exists(id) === true) ? 'selected' : 'no-selected';
    }

    private exists(id: any) {
        return this.getIndex(id) > -1;
    }

    public get(id: any) {
        return this.selecteds.find((a) => {
            return a._id === id._id;
        });
    }

    private getIndex(id: any) {
        const item = this.get(id);
        return this.selecteds.indexOf(item);
    }

    private remove(id: any) {
        const index = this.getIndex(id);
        if (index > -1) {
            this.selecteds.splice(index, 1);
        }
    }

    selectSeason(s) {
        this.selectedSeason = s;
        this.tvshowService.getSeasonEpisodes(this.selectedTvshow.id, s.season_number).subscribe((a) => {
            this.episodes = a;
        });
    }

    filterEpisodes() {
        return this.episodes.filter((a: any) => {
            return this.selecteds.indexOf(a) === -1;
        });
    }
}
