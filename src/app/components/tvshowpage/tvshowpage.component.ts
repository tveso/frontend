

import {Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageService} from '../../services/image.service';
import {Movie} from '../../entities/movie';
import {MoviesService} from '../../services/movies.service';
import {BehaviorSubject, Observable, Observer, Subscription} from 'rxjs';
import {MessageService} from '../../services/message.service';
import {TvshowService} from '../../services/tvshow.service';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../services/title.service';
import {MatDialog} from '@angular/material';
import {LinksComponent} from '../links/links.component';
import {FindService} from '../../services/find.service';
import {UtilService} from '../../services/util.service';

@Injectable({
    providedIn: 'root'
})
class SharedService {
    observer: Observable<any>;
    public add(observer: any) {
        this.observer = observer;
    }
}


@Component({
  selector: 'app-tvshowpage',
  templateUrl: './tvshowpage.component.html',
  styleUrls: ['./tvshowpage.component.css']
})
class TvshowpageComponent implements OnInit, OnDestroy {
    tvshow: Movie;
    @Input() activeSeason: number;
    mode: any = 'info';
    observer: Subscription;
    protected recommendedTvshows = undefined;

    constructor(private activatedRouter: ActivatedRoute, private imageService: ImageService,
                private router: Router, private sharedService: SharedService, private messageService: MessageService,
                private titleService: TitleService, private findService: FindService, public utilService: UtilService) {}
    ngOnInit() {
        this.sharedService.add(this.activatedRouter.data);
        this.observer = this.activatedRouter.data.subscribe((data) => {
            this.tvshow = data['tvshows'];
            const title = Movie.getTitle(this.tvshow);
            this.recommendedTvshows = undefined;
            this.findService.recommend(this.tvshow._id).subscribe((recommendedTvshows) => {
                this.recommendedTvshows = recommendedTvshows;
            });
            this.titleService.setTitle(`${title} (${this.tvshow.year} - ${this.utilService.getRating(this.tvshow)} ⭐)`);
        });
        this.messageService.listen().subscribe((data) => {
            const mode = data.get('mode');
            if (typeof mode !== 'undefined' && mode !== null ) {
                this.mode = mode;
            } else {
                this.mode = 'info';
            }
        });
    }

    getBackground() {
        const poster = this.imageService.getImageUrl(this.tvshow.backdrop_path, 'w1280');
        return `url(${poster})`;
    }
    ngOnDestroy() {
        this.observer.unsubscribe();
    }
}


@Component({
    selector: 'app-seasoncomponent',
    templateUrl: './season.component.html',
    styleUrls: ['./tvshowpage.component.css']
})
class SeasonComponent implements OnInit, OnDestroy, OnChanges {
    tvshow: Movie;
    private tvshow$ = new BehaviorSubject<Movie>(new Movie());
    selectedSeason: any;
    Math: Math = Math;
    private sucriptions$: any;
    private updating: boolean;
    public options: any;
    @Input() orderType = 'episode_number';
    @Input() showFilter = false;

    constructor(private sharedService: SharedService, private activatedRouter: ActivatedRoute, private messageService: MessageService,
                private tvshowService: TvshowService, private router: Router, private _titleService: TitleService,
                public dialog: MatDialog) {
        this.options = [
            {'value': 'vote_count', 'viewValue': 'Número de votos'},
            {'value': 'vote_average', 'viewValue': 'Puntuación'},
            {'value': 'episode_number', 'viewValue': 'Ordenado'},
        ];
    }

    ngOnInit(): void {
        this.messageService.add('mode', 'season');
        this.tvshow$.asObservable().subscribe((data) => {
            this.tvshow = data;
            if (this.selectedSeason) {
                this.changeSeason(this.selectedSeason.season_number);
            }
        });
        this.sucriptions$ = this.sharedService.observer.subscribe((data) => {
            this.tvshow$.next(data['tvshows']);
        });
        this.activatedRouter.queryParams.subscribe((data2) => {
            this.changeSeason(1);
            if (typeof data2['number'] === 'undefined') {
                this.changeSeason(1);
            } else {
                this.changeSeason(data2['number']);
            }
            if (this.toBeUpdated()) {
                this.updating = true;
                this.tvshowService.update(this.selectedSeason.season_number, this.tvshow._id).subscribe((data) => {
                    this.tvshow$.next(data);
                    this.updating = false;
                });
            }
        });
    }

    changeSeason(number) {
        this.selectedSeason = this.tvshow.seasons.find((s) => {
            return s.season_number == number;
        });
        this.order();
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnDestroy() {
        this.sucriptions$.unsubscribe();
        this.messageService.add('mode', null);
    }

    private toBeUpdated() {
        return typeof this.selectedSeason.episodes[0].imdb_id === 'undefined' && !this.updating;
    }

    public order() {
        if (typeof this.selectedSeason.episodes === 'undefined') {
            return;
        }
        this.selectedSeason.episodes.sort((a, b) => {
            if ( this.orderType === 'episode_number') {
                return (a[this.orderType] - b[this.orderType]);
            }
            return (b[this.orderType] - a[this.orderType]);
        });
    }

    getSeasonAverageRating() {
        let result = 0;
        let count = 0;
        if (typeof this.selectedSeason !== 'undefined' && typeof this.selectedSeason.episodes !== 'undefined') {
            for (const r of this.selectedSeason.episodes) {
                if (typeof r.vote_average !== 'undefined' && r.vote_count > 0 ) {
                    result += Number(r.vote_average);
                    count++;
                }
            }
            result = Math.round(result * 100 / count) / 100;
        }

        return result;
    }

    getTotalNumVotes() {
        let result = 0;
        if (typeof this.selectedSeason !== 'undefined' && typeof this.selectedSeason.episodes !== 'undefined') {
            result = this.selectedSeason.episodes.reduce( (a, b) => {
                return a + Number(b.vote_count);
            }, 0);
        }

        return result;
    }
    getLinks(e) {
        const dialogRef = this.dialog.open(LinksComponent, {
            data: {episodeNumber: e.episode_number, seasonNumber: e.season_number, showName: Movie.getTitle(this.tvshow),
                episodeName: e.name,
            showId: this.tvshow._id, episode: e},
            panelClass: 'dialog',
            position: {top: '10px'}
        });

    }
}


@Component({
    selector: 'app-tvinfo',
    templateUrl: './info.component.html',
    styleUrls: ['./tvshowpage.component.css']
})
class TvInfoComponent extends TvshowpageComponent {
}


export {SeasonComponent, TvshowpageComponent, TvInfoComponent};
