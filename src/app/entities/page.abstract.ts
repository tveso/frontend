import {ImageService} from '../services/image.service';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../services/util.service';
import {FindService} from '../services/find.service';
import {Injectable, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ShowRecommendedComponent} from '../components/models/show-recommended/show-recommended.component';
import {Movie} from './movie';
import {TitleService} from '../services/title.service';
import {Observable} from 'rxjs';
import {MessageService} from '../services/message.service';
import {TvshowService} from '../services/tvshow.service';
import {RecommendatorService} from '../services/recommendator.service';
import {EventsService} from '../services/events.service';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    observer: Observable<any>;
    public add(observer: any) {
        this.observer = observer;
    }
}

export class PageAbstract implements OnInit {
    departments = {
        'Writing': 'Guionista',
        'Costume & Make-Up': 'Disfraz y maquillaje',
        'Co-Executive Producer': 'Co-Productor Ejecutivo',
        'Production': 'Productor'
    };
    loadingRecommnededMovies = false;
    public recommendedShows: any;
    public show: any;
    protected recommendShowsPage = 1;
    public poster;

    constructor(protected imageService: ImageService, protected findService: FindService,
                protected activatedRouter: ActivatedRoute,
                public dialog: MatDialog, protected titleService: TitleService, public utilService: UtilService,
                protected  sharedService: SharedService, protected messageService: MessageService,
                protected tvshowService: TvshowService, protected recommendatorService: RecommendatorService, protected eventsService: EventsService) {}

    ngOnInit() {
        this.activatedRouter.data.subscribe((data) => {
            this.show = data['show'];
            this.recommendedShows = [];
            this.getRecommendedShows(this.recommendShowsPage);
            const title = Movie.getTitle(this.show);
            this.titleService.setTitle(`${title} (${this.show.year} - ${this.utilService.getRating(this.show)} ⭐)`);
        });
    }
    getJob(creator) {
        if (creator.department in this.departments) {
            return this.departments[creator.department];
        }

        return creator.department;
    }
    getRecommendedShows(page) {
        this.loadingRecommnededMovies = false;
        this.recommendedShows = [];
        this.recommendatorService.byShow(this.show._id, page).subscribe((a) => {
            this.recommendedShows = a;
            this.loadingRecommnededMovies = true;
        });
    }
    getReleaseDate() {
        if (this.show.type === 'movie') {
            return this.show.release_date;
        }
        return this.show.first_air_date;
    }
    getTrailer(m) {
        if (typeof m.videos === 'undefined') {
            return null;
        }
        const videos = m.videos.results;
        let result = null;
        videos.forEach((a) => {
            if (a.type === 'Trailer' && a.site === 'YouTube') {
                result = a.key;
            }
        });

        return result;
    }
    moreRecommendedShows() {
        this.dialog.open(ShowRecommendedComponent, {
            data: {show: this.show},
            panelClass: 'dialog',
            hasBackdrop: true,
            width: '80%',
            backdropClass: 'dialog-overlay-black',
            position: {top: '0'}
        });
    }

    orderCrew(crew) {
        const result = crew.slice();
        return result.sort((a, b) => {
            const ranking = {'Director': 5, 'Executive Producer': 4, 'Production': 4, 'Co-Executive Producer': 4, 'Writing': 3};
            let aValue = 0;
            let bValue = 0;
            if (a.department in ranking) {
                aValue = ranking[a.department];
            }
            if (b.department in ranking) {
                bValue = ranking[b.department];
            }

            return bValue - aValue;
        });
    }


}
