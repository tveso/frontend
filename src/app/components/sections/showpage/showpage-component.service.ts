import {AfterViewInit, Component, EventEmitter, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
import {RecommendatorService} from '../../../services/recommendator.service';
import {EventsService} from '../../../services/events.service';
import {EpisodeCalendarProperties} from '../../models/epiosodescalendar/epiosodescalendar.component';
import {CalendarService, CalendarServiceParams} from '../../../services/calendar.service';
import {CalendarDate} from '../../utils/calendar/calendar.component';

@Injectable({
    providedIn: 'root'
})



@Component({
  selector: 'app-showpage',
  templateUrl: './showpage.component.html',
  styleUrls: ['./showpage.component.scss']
})
class ShowpageComponent extends PageAbstract implements OnInit, OnDestroy {
    @Input() activeSeason: number;
    mode: any = 'info';
    observer: Subscription;
    Movie = Movie;

    constructor(imageService: ImageService, protected findService: FindService,
                protected activatedRouter: ActivatedRoute,
                public dialog: MatDialog, protected titleService: TitleService, utilService: UtilService,
                protected  sharedService: SharedService, protected messageService: MessageService, protected tvshowService: TvshowService,
                recommendatorService: RecommendatorService, protected eventsService: EventsService) {
        super(imageService, findService, activatedRouter, dialog, titleService, utilService, sharedService, messageService, tvshowService,
            recommendatorService, eventsService);
    }
    ngOnInit() {
        this.sharedService.add(this.activatedRouter.data);
        this.observer = this.activatedRouter.data.subscribe((data) => {
            this.show = data['show'];
            this.poster = `url(${this.imageService.getImageUrl(this.show.backdrop_path, 'w1280')})`;
            const title = Movie.getTitle(this.show);
            this.titleService.setTitle(`${title} (${this.show.year} - ${this.utilService.getRating(this.show)} ⭐)`);
        });
        this.eventsService.listen('poster_change').subscribe((a) => {
            if (typeof a !== 'undefined') {

            } this.poster = `url(${this.imageService.getImageUrl(a, 'w1280')})`;

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
    styleUrls: ['./showpage.component.scss']
})
class SeasonComponent extends PageAbstract implements OnInit, OnDestroy, AfterViewInit {
    public options = [
        {'value': 'vote_count', 'viewValue': 'Número de votos'},
        {'value': 'vote_average', 'viewValue': 'Puntuación'},
        {'value': 'episode_number', 'viewValue': 'Ordenado'},
    ];
    selectedSeason: any;
    Math: Math = Math;
    Movie = Movie;
    private sucriptions$: any;
    private updating: boolean;
    @Input() orderType = 'episode_number';
    @Input() showFilter = false;
    private show$ = new BehaviorSubject<Movie>(new Movie());
    private episodes: any;

    constructor(imageService: ImageService, protected findService: FindService,
                activatedRouter: ActivatedRoute,
                dialog: MatDialog, titleService: TitleService, utilService: UtilService,
                sharedService: SharedService, messageService: MessageService, tvshowService: TvshowService,
                recommendatorService: RecommendatorService, eventsService: EventsService) {
        super(imageService, findService, activatedRouter, dialog, titleService, utilService, sharedService, messageService, tvshowService,
            recommendatorService, eventsService);
    }

    ngOnInit(): void {
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
            if (typeof data2['season_number'] === 'undefined') {
                this.changeSeason(1);
            } else {
                this.changeSeason(data2['season_number']);
            }
        });
    }

    changeSeason(number) {
        this.selectedSeason = this.show.seasons.find((s) => {
            return s.season_number == number;
        });
        this.eventsService.emit('poster_change', this.selectedSeason.poster_path);
        this.episodes = [];
        this.tvshowService.getSeasonEpisodes(this.show.id, number).subscribe((a) => {
            this.episodes = a;
        });
        this.order();
    }
    ngOnDestroy() {
        this.sucriptions$.unsubscribe();
        this.messageService.add('mode', null);
    }

    private toBeUpdated() {
        if (this.episodes.length === 0) {
            return false;
        }
        const now = + new Date();
        let airDate = this.episodes[0].air_date;
        if (airDate === null) {
            return false;
        }
        airDate = new Date(airDate);
        airDate = + airDate;
        if (airDate > now ) {
            return false;
        }
        if (this.selectedSeason.season_number === 0 ) {
            return false;
        }
        return typeof this.episodes[0].imdb_id === 'undefined' && !this.updating;
    }

    public order() {
        if (typeof this.episodes === 'undefined') {
            return;
        }
        this.episodes.sort((a, b) => {
            if ( this.orderType === 'episode_number') {
                return (a[this.orderType] - b[this.orderType]);
            }
            return (b[this.orderType] - a[this.orderType]);
        });
    }

    getSeasonAverageRating() {
        let result = 0;
        let count = 0;
        if ( typeof this.episodes !== 'undefined') {
            for (const r of this.episodes) {
                if (typeof r.vote_average !== 'undefined' && r.vote_count > 0 ) {
                    result += Number(r.vote_average);
                    count++;
                }
            }
            result = Math.round(result * 100 / count) / 100;
        }
        if (isNaN(result)) {
            return 0;
        }
        return result;
    }

    getTotalNumVotes() {
        let result = 0;
        if (typeof this.episodes !== 'undefined') {
            result = this.episodes.reduce( (a, b) => {
                return a + Number(b.vote_count);
            }, 0);
        }

        return result;
    }
    update($event) {
        this.updateSeason();
        if (typeof this.show.userFollow === 'undefined') {
            this.eventsService.emit(`follow_${this.show._id}`, {
                'name': 'Seguir',
                'show': 'Siguiendo',
                'icon': 'arrow_right_alt',
                'tag': 'following',
            });
        }
    }

    ngAfterViewInit(): void {
        this.messageService.add('mode', 'season');
    }

    private updateSeason() {
        const number = this.selectedSeason.season_number;
        this.tvshowService.getSeasonEpisodes(this.show.id, number).subscribe((a) => {
            this.episodes = a;
        });
    }
}


@Component({
    selector: 'app-tvinfo',
    templateUrl: './info.component.html',
    styleUrls: ['./showpage.component.scss']
})
class TvInfoComponent extends PageAbstract implements OnInit {

    public calendar$ = new EventEmitter<CalendarDate>();
    showInfo = '';

    constructor(imageService: ImageService, protected findService: FindService,
                protected activatedRouter: ActivatedRoute,
                public dialog: MatDialog, protected titleService: TitleService, utilService: UtilService,
                protected  sharedService: SharedService, protected messageService: MessageService,
                protected tvshowService: TvshowService, recommendatorService: RecommendatorService, eventsService: EventsService,
                private calendarService: CalendarService) {
        super(imageService, findService, activatedRouter, dialog, titleService, utilService, sharedService, messageService, tvshowService,
            recommendatorService, eventsService);
    }

    ngOnInit() {
        this.sharedService.observer.subscribe((a) => {
            this.show = a['show'];
            this.getRecommendedShows(this.recommendShowsPage);
        });
    }
    Date() {
        if (this.show.next_episode_to_air === null) {
            return new Date();
        }
        if (typeof this.show.next_episode_to_air.air_date === 'undefined' || this.show.next_episode_to_air.air_date === 'null'
        || this.show.next_episode_to_air.air_date === null) {
            return new Date();
        }
        return new Date(this.show.next_episode_to_air.air_date);
    }
    getEpisodesCallback(props: EpisodeCalendarProperties) {
        return this.calendarService.getTvshowsEpisodesBetweenDates(props.minDate, props.maxDate, [this.show.id]);
    }

}
@Component({
    selector: 'app-tvimages',
    templateUrl: './images.component.html',
    styleUrls: ['./showpage.component.scss']
})
class TvImagesComponent implements OnInit {
    private show$ = new BehaviorSubject<Movie>(new Movie());
    showInfo = '';
    tvshow: any;
    private sucriptions$: Subscription;
    constructor(private sharedService: SharedService, private messageService: MessageService) {
    }
    ngOnInit(): void {
        this.messageService.add('mode', 'images');
        this.show$.asObservable().subscribe((data) => {
            this.tvshow = data;
        });
        this.sucriptions$ = this.sharedService.observer.subscribe((data) => {
            this.show$.next(data['show']);
        });
}
}

@Component({
    selector: 'app-tvcast',
    templateUrl: './cast.component.html',
    styleUrls: ['./showpage.component.scss']
})
class ShowCastComponent implements OnInit {
    show: any;
    showInfo = '';
    private show$ = new BehaviorSubject<Movie>(new Movie());
    private sucriptions$: Subscription;
    constructor(private sharedService: SharedService, private messageService: MessageService) {
    }
    ngOnInit(): void {
        this.messageService.add('mode', 'images');
        this.show$.asObservable().subscribe((data) => {
            this.show = data;
        });
        this.sucriptions$ = this.sharedService.observer.subscribe((data) => {
            this.show$.next(data['show']);
        });
    }
    anchorLink($element) {
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }

    getJobs() {
        const result = new Set();
        this.show.credits.crew.forEach((a) => {
            result.add(a.job);
        });

        return result;
    }
}



export {SeasonComponent, ShowpageComponent, TvInfoComponent, TvImagesComponent, ShowCastComponent};
