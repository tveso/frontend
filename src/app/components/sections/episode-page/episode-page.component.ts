import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EpisodeService} from '../../../services/episode.service';
import {ImageService} from '../../../services/image.service';
import {Episode} from '../../../entities/episode';
import {Movie} from '../../../entities/movie';
import {ConfirmDialogComponent} from '../../utils/confirm-dialog/confirm-dialog.component';
import {FollowService} from '../../../services/follow.service';

@Component({
  selector: 'app-episode-page',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.scss']
})
export class EpisodePageComponent implements OnInit {
    private episode: Episode;
    private poster: string;
    public Movie =  Movie;
    showInfo = '';

  constructor(private activatedRouter: ActivatedRoute, public imageService: ImageService, private followService: FollowService) {}

  ngOnInit() {
      this.activatedRouter.data.subscribe((data) => {
          this.episode = data.episode;
          let posterPath = this.episode.still_path;
          if (posterPath === null) {
              posterPath = this.episode.show.poster_path;
          }
          this.poster = `url(${this.imageService.getImageUrl(posterPath, 'w1280')})`;
      });
  }
    isWatched() {
        const userFollow = this.episode.userFollow;
        if (typeof userFollow === 'undefined') {
            return false;
        }
        return userFollow.mode === 'watched';
    }
    watch() {
        const id = this.episode._id;
        if (this.isWatched()) {
            this.followService.watchEpisode(id, true, false).subscribe((a) => {
                this.episode.userFollow = undefined;
            });
            return;
        }
        const cancel = false;
        const previous = false;
        this.followService.watchEpisode(id, cancel, previous).subscribe((es) => {
                this.episode.userFollow = es;
        });

    }

}
@Injectable()
export class EpisodePageResolver implements Resolve<any> {
    constructor(private episodeService: EpisodeService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.episodeService.getById(route.params.id);
    }
}