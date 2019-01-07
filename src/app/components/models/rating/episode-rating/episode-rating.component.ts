import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmDialogComponent} from '../../../utils/confirm-dialog/confirm-dialog.component';
import {FollowService} from '../../../../services/follow.service';
import {MatDialog} from '@angular/material';
import {Episode} from '../../../../entities/episode';

@Component({
  selector: 'app-episode-rating',
  templateUrl: './episode-rating.component.html',
  styleUrls: ['./episode-rating.component.scss']
})
export class EpisodeRatingComponent implements OnInit {
  @Input() episode: Episode;
  @Input() mode = 'list';
  @Output() episodeUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor(private followService: FollowService, public dialog: MatDialog) { }

  ngOnInit() {

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
                delete this.episode.userFollow;
                this.episodeUpdate.emit(this.episode);
            });
            return;
        }
        if (this.mode === 'list') {
            this.watchList();
            return;
        }
        this.followService.watchEpisode(id, false, false).subscribe((es) => {
            this.episode.userFollow = es;
            this.episodeUpdate.emit(this.episode);
        });

    }

    private watchList() {
        const cancel = false;
        let previous = false;
        const id = this.episode.id;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {title: `¿Quieres marcar como visto los episodios anteriores?`,
                message: 'Si pulsas si, se marcarán como visto los capitulos anteriores a este y temporadas pasadas. ' +
                    'Si pulsas no, solo se marcará éste como visto', confirmButton: 'Si, quiero', cancelButton: 'No, marca solo éste'}
        });
        dialogRef.afterClosed().subscribe((a) => {
            previous = a;
            this.followService.watchEpisode(id, cancel, previous).subscribe((es) => {
                this.episode.userFollow = es;
                this.episodeUpdate.emit(this.episode);
            });
        });
    }

    canBeWatched() {
      if (this.episode.air_date === null || typeof this.episode.air_date === 'undefined') {
          return false;
      }
      const nowDate = new Date();
      const episodeAirdate = new Date(this.episode.air_date);

      return nowDate >= episodeAirdate;

    }
}
