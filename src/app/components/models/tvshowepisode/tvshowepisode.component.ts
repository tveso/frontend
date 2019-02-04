import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageService} from '../../../services/image.service';
import {FollowService} from '../../../services/follow.service';
import {MatDialog} from '@angular/material';
import {Movie} from '../../../entities/movie';

@Component({
  selector: 'app-tvshowepisode',
  templateUrl: './tvshowepisode.component.html',
  styleUrls: ['./tvshowepisode.component.scss']
})
export class TvshowepisodeComponent implements OnInit {

   @Input() public episode;
    spoiler = true;
    @Input() callback;
    @Input() public alternativePosterPath;
    public Math = Math;
    Movie = Movie;
    @Input() mode = 'explicit';
    @Output() episodeUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private imageService: ImageService, private followService: FollowService) { }

  ngOnInit() {
  }

    isWatched() {
        const userFollow = this.episode.userFollow;
        if (typeof userFollow === 'undefined') {
            return false;
        }
        return userFollow.mode === 'watched';
    }

    getBackground() {
      const path = (this.episode.still_path === null || typeof this.episode.still_path === 'undefined') ?
          this.alternativePosterPath : this.episode.still_path;
        const poster = this.imageService.getImageUrl(path, 'w1280');
        return `${poster}`;
    }
    getNumericalEpisode() {
        return `${this.episode.season_number}x${getNumPad(this.episode.episode_number)}`;
    }
    update($event) {
      this.episodeUpdate.emit($event);
    }
    hasCallback() {
      return typeof this.callback !== 'undefined';
    }
    handle() {
      if (this.hasCallback()) {
          this.callback(this.episode);
      }
    }

}

export const getNumPad = (num: Number) => {
    if (num < 10) {
        return `0${num}`;
    }

    return `${num}`;
};