import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RecommendatorService} from '../../../services/recommendator.service';
import {StorageService} from '../../../services/persistence/storage.service';

@Component({
    selector: 'app-userrecommended',
    templateUrl: './userrecommended.component.html',
    styleUrls: ['./userrecommended.component.scss']
})
export class UserrecommendedComponent implements OnInit {
    recommended: any[] = [];
    public loading = false;
    public page = 1;
    genres: any;
    public params = {mode: 'automatic', type: 'movie'};
    firstLoad = false;
    private noMoreData = false;
    public selectedShows = [];
    choseShowsExpanded = false;

    constructor(private recommendatorService: RecommendatorService, private storageService: StorageService) {
    }

    ngOnInit() {
        let params: any = localStorage.getItem('userRecommended');
        if (params !== null) {
            params = JSON.parse(params);
            this.params = params.params;
            this.selectedShows = params.selectedShows;
        }
    }

    updateSelectedShows(shows: any[]) {
        this.selectedShows = shows;
        this.update();
    }

    update() {
        localStorage.setItem('userRecommended', JSON.stringify({params: this.params, selectedShows: this.selectedShows}));
        this.initResults();
    }

    setDisabled() {
        if (this.params.mode === 'chose') {
            return this.selectedShows.length === 0;
        }
        if (this.params.mode === 'automatic') {
            return false;
        }
    }
    executeFilter() {
        this.choseShowsExpanded = false;
        this.initResults();
        this.recommend();
    }
    getMoreShows() {
        if (this.loading) {
            return;
        }
        this.page += 1;
        this.recommend();
    }

    recommend() {
        const query: any = {};
        query.page = this.page;
        query.type = this.params.type;
        query.mode = this.params.mode;
        if (this.params.mode === 'chose') {
            query.shows = this.getSelectedShowIds();
        }
        this.loading = true;
        this.recommendatorService.byQuery(query).subscribe((a) => {
            this.loading = false;
            if (a.shows.length === 0) {
                this.noMoreData = true;
                return;
            }
            this.recommended = Array.from(new Set(this.recommended.concat(a.shows)));
        });
    }

    private getSelectedShowIds() {
        let ids = [];
        ids = this.selectedShows.map((a) => {
            return a._id;
        });
        return ids.toString();
    }

    private initResults() {
        this.page = 1;
        this.noMoreData = false;
        this.recommended = [];
    }
}
