import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../entities/movie';
import {ImageService} from '../../services/image.service';
import {FindService} from '../../services/find.service';
import {UtilService} from '../../services/util.service';
import {PageAbstract} from '../../entities/page.abstract';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['../tvshowpage/tvshowpage.component.css']
})
export class MoviepageComponent extends PageAbstract implements OnInit {
    m: Movie;
    recommendedMovies: Movie[];
    departments = {
        'Writing': 'Guionista',
        'Costume & Make-Up': 'Disfraz y maquillaje',
        'Co-Executive Producer': 'Co-Productor Ejecutivo',
        'Production': 'Productor'
    };
    constructor(private movieService: MoviesService, private activatedRouter: ActivatedRoute, imageService: ImageService,
                private findService: FindService, public utilService: UtilService) {
        super(imageService);
    }
  ngOnInit() {
      this.activatedRouter.data.subscribe((data) => {
          this.m = data['movies'];
          this.recommendedMovies = [];
          this.findService.recommend(this.m._id).subscribe((recommendedMovies) => {
              this.recommendedMovies = recommendedMovies;
          });
      });
  }

    sortByVoteAverage(posters: Array<any>) {
      if (typeof posters === 'undefined' || posters === null) {
          return posters;
      }
      posters = posters.slice();

      posters.sort((a, b) => {
          return b.vote_average - a.vote_average;
      });
      return posters;
    }
    getJob(creator) {
        if (creator.department in this.departments) {
            return this.departments[creator.department];
        }

        return creator.department;
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
}
