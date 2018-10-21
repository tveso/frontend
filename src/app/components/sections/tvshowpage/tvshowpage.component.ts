import {Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImageService} from '../../../services/image.service';
import {Movie} from '../../../entities/movie';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MessageService} from '../../../services/message.service';
import {TvshowService} from '../../../services/tvshow.service';
import {TitleService} from '../../../services/title.service';
import {MatDialog} from '@angular/material';
import {FindService} from '../../../services/find.service';
import {UtilService} from '../../../services/util.service';
import {PageAbstract, SharedService} from '../../../entities/page.abstract';

@Injectable({
    providedIn: 'root'
})



@Component({
  selector: 'app-tvshowpage',
  templateUrl: './tvshowpage.component.html',
  styleUrls: ['./tvshowpage.component.css']
})
class TvshowpageComponent extends PageAbstract implements OnInit, OnDestroy {
    @Input() activeSeason: number;
    mode: any = 'info';
    observer: Subscription;

    constructor(imageService: ImageService, protected findService: FindService,
                protected activatedRouter: ActivatedRoute,
                public dialog: MatDialog, protected titleService: TitleService, protected utilService: UtilService,
                protected  sharedService: SharedService, protected messageService: MessageService, protected tvshowService: TvshowService) {
        super(imageService, findService, activatedRouter, dialog, titleService, utilService, sharedService, messageService, tvshowService);
    }
    ngOnInit() {
        this.sharedService.add(this.activatedRouter.data);
        this.observer = this.activatedRouter.data.subscribe((data) => {
            this.show = data['show'];
            const title = Movie.getTitle(this.show);
            this.titleService.setTitle(`${title} (${this.show.year} - ${this.utilService.getRating(this.show)} ⭐)`);
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


    ngOnDestroy() {
        this.observer.unsubscribe();
    }

}


@Component({
    selector: 'app-seasoncomponent',
    templateUrl: './season.component.html',
    styleUrls: ['./tvshowpage.component.css']
})
class SeasonComponent extends PageAbstract implements OnInit, OnDestroy, OnChanges {
    public options = [
        {'value': 'vote_count', 'viewValue': 'Número de votos'},
        {'value': 'vote_average', 'viewValue': 'Puntuación'},
        {'value': 'episode_number', 'viewValue': 'Ordenado'},
    ];
    selectedSeason: any;
    Math: Math = Math;
    private sucriptions$: any;
    private updating: boolean;
    @Input() orderType = 'episode_number';
    @Input() showFilter = false;
    private show$ = new BehaviorSubject<Movie>(new Movie());

    constructor(imageService: ImageService, protected findService: FindService,
                activatedRouter: ActivatedRoute,
                dialog: MatDialog, titleService: TitleService, utilService: UtilService,
                sharedService: SharedService, messageService: MessageService, tvshowService: TvshowService) {
        super(imageService, findService, activatedRouter, dialog, titleService, utilService, sharedService, messageService, tvshowService);
    }

    ngOnInit(): void {
        this.messageService.add('mode', 'season');
        this.show$.asObservable().subscribe((data) => {
            this.show = data;
            if (this.selectedSeason) {
                this.changeSeason(this.selectedSeason.season_number);
            }
        });
        this.sucriptions$ = this.sharedService.observer.subscribe((data) => {
            this.show$.next(data['show']);
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
                this.tvshowService.update(this.selectedSeason.season_number, this.show._id).subscribe((data) => {
                    this.show$.next(data);
                    this.updating = false;
                });
            }
        });
    }

    changeSeason(number) {
        this.selectedSeason = this.show.seasons.find((s) => {
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
}


@Component({
    selector: 'app-tvinfo',
    templateUrl: './info.component.html',
    styleUrls: ['./tvshowpage.component.css']
})
class TvInfoComponent extends PageAbstract implements OnInit {

    departments = {
        'Writing': 'Guionista',
        'Costume & Make-Up': 'Disfraz y maquillaje',
        'Co-Executive Producer': 'Co-Productor Ejecutivo',
        'Production': 'Productor'
    };
    public creatorsShown = 4;

    constructor(imageService: ImageService, protected findService: FindService,
                protected activatedRouter: ActivatedRoute,
                public dialog: MatDialog, protected titleService: TitleService, protected utilService: UtilService,
                protected  sharedService: SharedService, protected messageService: MessageService, protected tvshowService: TvshowService) {
        super(imageService, findService, activatedRouter, dialog, titleService, utilService, sharedService, messageService, tvshowService);
    }

    ngOnInit() {
        this.sharedService.observer.subscribe((a) => {
            this.show = a['show'];
            this.getRecommendedShows(this.recommendShowsPage);
        });
    }

}
@Component({
    selector: 'app-tvimages',
    templateUrl: './images.component.html',
    styleUrls: ['./tvshowpage.component.css']
})
class TvImagesComponent implements OnInit {
    private tvshow$ = new BehaviorSubject<Movie>(new Movie());
    private tvshow: any;
    private sucriptions$: Subscription;
    constructor(private sharedService: SharedService, private messageService: MessageService) {
    }
    ngOnInit(): void {
        this.messageService.add('mode', 'images');
        this.tvshow$.asObservable().subscribe((data) => {
            this.tvshow = data;
        });
        this.sucriptions$ = this.sharedService.observer.subscribe((data) => {
            this.tvshow$.next(data['tvshows']);
        });
}
}


export {SeasonComponent, TvshowpageComponent, TvInfoComponent, TvImagesComponent};
