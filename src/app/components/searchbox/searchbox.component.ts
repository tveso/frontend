import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/internal/operators';
import {MoviesService} from '../../services/movies.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {
    searchTerm$ = new Subject<string>();
    results = [];
    @Input() wclass;
    searchControl: FormControl = new FormControl();
    @Input() searchText;
    selected = 0;
    showSearchList = false;
    focused = false;
    searched = false;
  constructor(private movieService: MoviesService, private router: Router, private activatedRouter: ActivatedRoute) { }
  ngOnInit() {
      this.searchControl.valueChanges.pipe(debounceTime(400),
          switchMap((value) => {
              this.searched = false;
              this.results = [];
              if (typeof value === 'undefined' || value.length === 0 ) {
                  this.results = [];
                  return [];
              }
              this.searchText = value;
              return this.movieService.search(value, 5);
          })).subscribe((value) => {
              this.results = value;
              this.searched = true;
      });
  }

    changeSelected($event) {
        const key = $event.key;
        switch (key) {
            case 'ArrowDown':
                if (this.selected + 1 < this.results.length ) {
                    this.selected += 1;
                }
                break;
            case 'ArrowUp':
                if (this.selected - 1 >= 0) {
                    this.selected -= 1;
                }
                break;
            case 'Enter':
                if (typeof this.results[this.selected] === 'undefined') {
                    this.router.navigate(['search'], {queryParams: {query: this.searchControl.value}});
                    break;
                }
                 this.router.navigate([ this.results[this.selected].type, this.results[this.selected]._id] );
                break;
        }
    }

    searchBox() {
        if (this.searchControl.value.length === 0) {
            return;
        }

        this.router.navigate(['search'], {queryParams: {query: this.searchControl.value}});
    }
}
