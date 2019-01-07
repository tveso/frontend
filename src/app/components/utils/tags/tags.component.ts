import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  text;
  @Input() tags: Array<String>;
  @Output() tags$: EventEmitter<Array<String>>;
  constructor() {
    this.tags = [];
    this.tags$ = new EventEmitter();
  }

  ngOnInit() {
  }

  removeTag(tag: string) {
      const index = this.tags.indexOf(tag);
      if (index > -1) {
          this.tags.splice(index, 1);
          this.tags$.emit(this.tags);
      }
  }

  update($event: String) {
      $event = $event.trim();
      const lastChar = $event.slice(-1);
      let textMinusLastChar = $event.slice(0, $event.length - 1);
      if (lastChar === ',') {
          textMinusLastChar = textMinusLastChar.toLowerCase().trim();
          this.tags.push(textMinusLastChar);
          this.tags$.emit(this.tags);
          this.text = '';
          return;
      }
  }
}
