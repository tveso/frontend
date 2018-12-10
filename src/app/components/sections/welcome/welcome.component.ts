import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../entities/movie';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    @Input() popularMovies: Movie[];
    @Input() playingTvshows: Movie[];
    @Input() userRecommended: Movie[];
    public object = this;
    private pendingEpisodes: any;

    constructor(private activatedRouter: ActivatedRoute, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.activatedRouter.data.subscribe((data) => {
            this.popularMovies = data.popular.popularMovies;
            this.playingTvshows = data.popular.playingTvshows;
            this.pendingEpisodes = data.popular.pendingEpisodes;
        });
    }
}
