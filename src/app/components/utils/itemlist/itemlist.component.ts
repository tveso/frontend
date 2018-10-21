import {AfterContentInit, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-itemlist',
    templateUrl: './itemlist.component.html',
    styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit, AfterContentInit {
    @Input() class;
    @Input() items = [];
    @Input() object = {};
    @Input() type = 'movie';
    @Input() loading = false;
    @Input() firstLoad = false;
    @Input() noLoadMore = false;
    @Input() method: Function = () => {
    };

    constructor() {
    }

    ngOnInit() {
    }

    rangeArray(num) {
        const result = [];
        for (let i = 0; i <= num; i++) {
            result.push(num);
        }
        return result;
    }

    callback() {
        if (this.noLoadMore) {
            return;
        }
        const callback = this.method.bind(this.object);
        callback();
    }

    ngAfterContentInit() {

    }
}
