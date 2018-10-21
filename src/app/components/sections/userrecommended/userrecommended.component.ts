import {Component, OnInit} from '@angular/core';
import {FindService} from '../../../services/find.service';

@Component({
    selector: 'app-userrecommended',
    templateUrl: './userrecommended.component.html',
    styleUrls: ['./userrecommended.component.css']
})
export class UserrecommendedComponent implements OnInit {
    recommended: any[] = [];
    public loading = false;
    public page = 1;
    genres: any;
    firstLoad = false;
    crews: any;
    casts: any;
    languages: any;
    private noMoreData = false;

    constructor(private findService: FindService) {
    }

    ngOnInit() {
        this.loadMovies();
    }

    loadMovies() {
        this.loading = true;
        this.findService.getRecommendedUser(this.page).subscribe((a) => {
            if (a.length === 0) {
                this.noMoreData = true;
            }
            this.firstLoad = true;
            this.recommended = Array.from(new Set(this.recommended.concat(a.shows)));
            this.genres = a.genres;
            this.casts = a.cast;

            this.crews = a.crew;
            this.languages = a.language;
            this.loading = false;
        });
    }

    updatePage() {
        if (this.loading) {
            return;
        }

        this.page += 1;
        this.loadMovies();
    }

}