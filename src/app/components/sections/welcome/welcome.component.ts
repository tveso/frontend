import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../entities/movie';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MainService} from '../../../services/main.service';
import {Episode} from '../../../entities/episode';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    @Input() popularMovies: Movie[];
    @Input() playingTvshows: Movie[];
    @Input() userRecommended: Movie[];
    articles = {
        'popularMovies': 1,
        'calendar': 2,
        'pendingEpisodes': 3,
        'nowPlayingTvshows': 4,
        'Friends': 5
    };
    public object = this;
    private pendingEpisodes: Episode[];

    constructor(private activatedRouter: ActivatedRoute, private mainService: MainService) {
    }

    ngOnInit(): void {
        this.activatedRouter.data.subscribe((data) => {
            this.popularMovies = data.popular.popularMovies;
            this.playingTvshows = data.popular.playingTvshows;
            this.pendingEpisodes = data.popular.pendingEpisodes;
        });
    }
    load() {
        this.activatedRouter.data.subscribe((data) => {
            this.popularMovies = data.popular.popularMovies;
            this.playingTvshows = data.popular.playingTvshows;
            this.pendingEpisodes = data.popular.pendingEpisodes;
        });
    }
    findKeyIndex(index: number) {
        let result;
        for (const i in this.articles) {
            if (this.articles.hasOwnProperty(i)) {
                if (this.articles[i] === index) {
                    result = i;
                }
            }
        }
        return result;
    }
    drop(event: CdkDragDrop<string[]>) {
        const item = this.findKeyIndex(event.previousIndex + 1);
        const to = this.findKeyIndex(event.currentIndex + 1);
        this.articles[to] = event.previousIndex + 1;
        this.articles[item] = event.currentIndex + 1;
        console.log(item, to);
    }

    updatePendingEpisodes($event: Episode) {
        const episode = this.pendingEpisodes.find(epi => epi._id === $event._id);
        if (typeof episode !== 'undefined') {
            const index = this.pendingEpisodes.indexOf(episode);
            if (index > -1) {
                this.pendingEpisodes.splice(index, 1);
            }
        }
        this.mainService.all().subscribe((a: any) => {
            this.pendingEpisodes = a.pendingEpisodes;
        });
    }

    getStyleArticle(article: string) {
        return {'order': this.articles[article]};
    }
}
