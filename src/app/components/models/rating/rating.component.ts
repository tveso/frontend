import {Component, Input, OnInit} from '@angular/core';
import {RatingService} from '../../../services/rating.service';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    @Input() resource;
    emojis = ['😖', '😟', '😐', '🙂', '😍'];
    value = 5;
    rating = false;
    userRate: boolean | number | any;

    constructor(public ratingService: RatingService) {
    }

    ngOnInit() {
        if (typeof this.resource.userRate !== 'undefined') {
            this.userRate = this.resource.userRate.rate;
            this.value = this.userRate;
        }
    }

    float(number) {
        return number.toFixed(1);
    }

    getRating() {
        const rating = this.resource.rating;
        if (typeof rating === 'undefined') {
            return this.resource.vote_average;
        }
        if (rating.averageRating === '\N') {
            return this.resource.vote_average;
        }
        return rating.averageRating;
    }

    getClass(i) {
        const length = this.emojis.length;
        const val = i * 2;
        if (this.value < val) {
            return 'opacity';
        }
    }

    change($event) {
        this.value = $event.value;
    }

    rate() {
        const obj = {id: this.resource._id, rating: this.value};
        this.userRate = this.value;
        this.ratingService.rate(obj).subscribe((a) => {
            this.rating = false;
        });
    }

}
