import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {Movie} from '../../entities/movie';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-list-movies-compress',
  templateUrl: './list-movies-compress.component.html',
  styleUrls: ['./list-movies-compress.component.css']
})
export class ListMoviesCompressComponent implements  OnInit, OnChanges {
    @Input() movies: Movie[];
    @Input() title;
    private movieService: MoviesService;
    @Input() listSize = 6;
    constructor(movieService: MoviesService) {
        this.movieService = movieService;
    }
    ngOnInit() {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (typeof this.movies !== 'undefined' ) {
            this.movies = this.movies.slice(0, this.listSize);
        }
    }
}