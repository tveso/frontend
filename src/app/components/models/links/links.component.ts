import {Component, Inject, OnInit} from '@angular/core';
import {LinkService} from '../../../services/link.service';
import {MAT_DIALOG_DATA, MatDialogRef, Sort} from '@angular/material';
import {TvshowService} from '../../../services/tvshow.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
    seasonNumber;
    episodeNumber;
    showId;
    showName;
    episodeName;
    links = [];
    loading: boolean;
    episode: any;
    constructor(
        public dialogRef: MatDialogRef<LinksComponent>, private tvshowService: TvshowService, @Inject(MAT_DIALOG_DATA) public data: any,
        private linkService: LinkService) {
        this.seasonNumber = this.data.seasonNumber;
        this.episodeNumber = this.data.episodeNumber;
        this.showName =  this.data.showName;
        this.episodeName =  this.data.episodeName;
        this.episode = this.data.episode;
        this.showId = this.data.showId;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
  ngOnInit() {
        this.loading = true;
  }
    sortData(sort: Sort) {
        const type = (sort.direction === 'asc') ? -1 : 1;
        const property = sort.active;
        const qualities = {'Hd1080': 2, 'Hd720': 1, 'Rip': 0};
        this.links.sort((a, b) => {
            if ( property === 'quality') {
                const aq = qualities[a[property]];
                const bq = qualities[b[property]];
                return (bq - aq) * type;
            }
            if ( property === 'language') {
                return a[property]['voice'].localeCompare(b[property]['voice']) * type;
            }
            return b[property].localeCompare(a[property]) * type;
        });
    }
    go(link) {
       const id = link._id.$oid;
       this.linkService.getLinkById(id).subscribe((data) => {
           const a = document.createElement('a');
           a.href = data.link;
           a.target = '_blank';
           a.click();
       });
    }

}

