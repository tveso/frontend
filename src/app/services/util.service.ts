import {Injectable, Input} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }
    getRating(movie) {
        const rating = movie.rating;
        if (typeof rating === 'undefined' || rating === null) {
            return movie.vote_average;
        }
        if (rating.averageRating === '\N') {
            return movie.vote_average;
        }
        return rating.averageRating;
    }

    getVoteCount(movie) {
        const rating = movie.rating;
        if (typeof rating === 'undefined' || rating === null) {
            return movie.vote_count;
        }
        if (rating.numVotes === '\N') {
            return movie.vote_count;
        }
        return rating.numVotes;
    }

    getReleaseDate(movie) {
        if (movie.type === 'movie') {
            try {
                return movie.release_date.split('-')[0];
            } catch (e) {
                return movie.year;
            }
        }
        try {
            return movie.first_air_date.split('-')[0];
        } catch (e) {
            return movie.year;
        }
    }
}
