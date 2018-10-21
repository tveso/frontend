import {Component, Inject, OnInit} from '@angular/core';
import {FindService} from '../../../services/find.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-show-recommended',
    templateUrl: './show-recommended.component.html',
    styleUrls: ['./show-recommended.component.css']
})
export class ShowRecommendedComponent implements OnInit {
    page = 1;
    public show: any;
    public shows: any[] = [];
    public loading = false;

    constructor(private findService: FindService, public dialogRef: MatDialogRef<ShowRecommendedComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.show = this.data.show;
    }

    ngOnInit() {
        this.getRecommendedShows(this.page);
    }

    getRecommendedShows(page) {
        this.loading = true;
        this.findService.recommend(this.show._id, page).subscribe((a) => {
            this.shows = Array.from(new Set(this.shows.concat(a)));
            this.loading = false;
        });
    }

    moreRecommendedShows() {
        console.log('ey');
        if (this.shows.length === 0) {
            return;
        }
        this.page += 1;
        this.getRecommendedShows(this.page);
    }

}
