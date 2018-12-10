import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {text} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.scss']
})
export class ReadmoreComponent implements OnInit, OnChanges {
  @Input() text: any;
  hide: any;
  textCopy: any;
  constructor() {}

    ngOnInit() {
        this.check();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.check();
    }
    check() {
        this.textCopy = this.text;
        if (this.text.length > 800 ) {
            this.hide = false;
            this.textCopy = this.textCopy.slice(0, 800);
        } else {
            this.hide = true;
            this.textCopy = this.text;
        }
    }

    readMore() {
        this.hide = true;
        this.textCopy = this.text;
    }
}
