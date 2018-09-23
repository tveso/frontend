import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../entities/movie';
import {ImageService} from '../../services/image.service';
import {FindService} from '../../services/find.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {
    m: Movie;
    recommendedMovies: Movie[] = [];
  constructor(private movieService: MoviesService, private activatedRouter: ActivatedRoute, private imageService: ImageService,
              private findService: FindService, public utilService: UtilService) { }
  ngOnInit() {
      this.activatedRouter.data.subscribe((data) => {
          this.m = data['movies'];
          this.recommendedMovies = [];
          this.findService.recommend(this.m._id).subscribe((recommendedMovies) => {
              this.recommendedMovies = recommendedMovies;
          });
      });
  }
    getBackground() {
      const poster = this.imageService.getImageUrl(this.m.backdrop_path, 'w1280' );
        return `url(${poster})`;
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

    getTrailer(m) {
        const videos = m.videos.results;
        let result = null;
        videos.forEach((a) => {
            if (a.type == 'Trailer' && a.site == 'YouTube') {
                result = a.key;
            }
        });

        return result;
    }
}
