import {Component, Inject, Input, OnInit} from '@angular/core';
import {Movie} from '../../../entities/movie';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    @Input() popularmovies: Movie[];
    @Input() upcomingmovies: Movie[];
    @Input() upcomingtvshows: Movie[];
    public object = this;

    constructor(private activatedRouter: ActivatedRoute, public dialog: MatDialog, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.activatedRouter.data.subscribe((data) => {
            this.upcomingtvshows = data.popular.upcomingtv;
        });
    }
    filterEpisodesOnAir(date) {
      if (typeof this.upcomingtvshows === 'undefined') {
          return [];
      }
      const result =  this.upcomingtvshows.filter((a) => {
          return a.next_episode_to_air.air_date === date;
      });
      return result;
    }

    openDay(date) {
      const episodes = this.filterEpisodesOnAir(date.date);
      this.dialog.open(DialogEpisodeToWatchComponent, {
          data: {episodes: episodes, date: date.date},
          panelClass: 'dialog',
          position: {top: '10px'}});
    }
}

@Component({
    selector: 'app-episodes-to-watch',
    templateUrl: 'dialogs/episodes.to.watch.html',
    styleUrls: ['./welcome.component.css']
})
export class DialogEpisodeToWatchComponent {
    public date: any;

    constructor(
        public dialogRef: MatDialogRef<DialogEpisodeToWatchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.data = data.episodes;
        this.date = data.date;
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    closeDialog() {
        this.dialogRef.close();
    }

}
