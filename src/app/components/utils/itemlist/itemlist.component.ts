import {AfterContentInit, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-itemlist',
    templateUrl: './itemlist.component.html',
    styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit, AfterContentInit {
    @Input() class;
    @Input() items = [];
    @Input() object = {};
    @Input() type = 'movie';
    @Input() listSize = 6;
    @Input() loading = false;
    @Input() firstLoad = false;
    @Input() searchShow = false;
    @Input() noLoadMore = false;
    @Input() extraDataFunction = undefined;
    @Input() itemCallback: Function;
    @Input() filteredFn;
    @Input() method: Function = () => {
    }

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

    extraData(item: any) {
        if (typeof this.extraDataFunction === 'undefined') {
            return;
        }
        return this.extraDataFunction.bind(this.object)(item);
    }

    getFilteredItems() {
        if (typeof this.filteredFn === 'function') {
            return this.filteredFn(this.items);
        }
        
        return this.items;
    }
}
