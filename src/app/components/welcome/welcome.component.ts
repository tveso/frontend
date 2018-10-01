///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Movie} from '../../entities/movie';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

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

  constructor(private activatedRouter: ActivatedRoute, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.activatedRouter.data.subscribe((data) => {
            this.popularmovies = data.popular.popularmovies;
            this.upcomingmovies = data.popular.upcomingmovies;
            this.upcomingtvshows = data.popular.upcomingtv;
        });
    }
    filterEpisodesOnAir(date) {
      if (typeof this.upcomingtvshows === 'undefined') {
          return [];
      }
      const result =  this.upcomingtvshows.filter((a) => {
          return a.next_episode_to_air.air_date == date;
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
