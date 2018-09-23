import { Injectable } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
    title = 'TVesame';
  constructor(private _title: Title) { }
  setTitle(newTitle: string) {
      this._title.setTitle(`${newTitle} | ${this.title}`);
  }
  resetTitle() {
      this._title.setTitle(`${this.title}`);
  }
}
