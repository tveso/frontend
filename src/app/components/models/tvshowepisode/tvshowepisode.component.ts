import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageService} from '../../../services/image.service';
import {FollowService} from '../../../services/follow.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../utils/confirm-dialog/confirm-dialog.component';
import {Movie} from '../../../entities/movie';

@Component({
  selector: 'app-tvshowepisode',
  templateUrl: './tvshowepisode.component.html',
  styleUrls: ['./tvshowepisode.component.scss']
})
export class TvshowepisodeComponent implements OnInit {

   @Input() public episode;
    spoiler = true;
    @Input() public alternativePosterPath;
    public Math = Math;
    Movie = Movie;
    @Input() mode = 'explicit';
    @Output() episodeUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private imageService: ImageService, private followService: FollowService, public dialog: MatDialog) { }

  ngOnInit() {
  }


    getBackground() {
      const path = (this.episode.still_path === null || typeof this.episode.still_path === 'undefined') ?
          this.alternativePosterPath : this.episode.still_path;
        const poster = this.imageService.getImageUrl(path, 'w1280');
        return `${poster}`;
    }

    getVotes() {
      if (typeof this.episode.vote_average === 'undefined') {
          return 'NR';
      }
        return Math.round(this.episode.vote_average * 100) / 100;
    }
    isWatched() {
      const userFollow = this.episode.userFollow;
      if (typeof userFollow === 'undefined') {
          return false;
      }
      return userFollow.mode === 'watched';
    }
    watch() {
        const id = this.episode.id;
      if (this.isWatched()) {
          this.followService.watchEpisode(id, true, false).subscribe((a) => {
              this.episodeUpdate.emit(this.episode);
          });
          return;
      }
      const cancel = false;
      let previous = false;
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {title: `¿Quieres marcar como visto los episodios anteriores?`,
            message: 'Si pulsas si, se marcarán como visto los capitulos anteriores a este y temporadas pasadas. ' +
                'Si pulsas no, solo se marcará éste como visto', confirmButton: 'Si, quiero', cancelButton: 'No, marca solo éste'}
        });
      dialogRef.afterClosed().subscribe((a) => {
          previous = a;
          this.followService.watchEpisode(id, cancel, previous).subscribe((es) => {
              this.episode.userFollow = es;
              this.episodeUpdate.emit(true);
          });
      });

    }
    getNumericalEpisode() {
        return `${this.episode.season_number}x${getNumPad(this.episode.episode_number)}`;
    }

}

export const getNumPad = (num: Number) => {
    if (num < 10) {
        return `0${num}`;
    }

    return `${num}`;
};