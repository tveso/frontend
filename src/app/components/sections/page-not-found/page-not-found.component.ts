import {Component, OnInit} from '@angular/core';
import {quotes} from './quotes';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    public quote: any;
  constructor() { }

  ngOnInit() {
    let q = quotes.slice();
    q = this.shuffle(q);
    this.quote = q[0];
  }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

}
