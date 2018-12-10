import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-placeholderitems',
    templateUrl: './placeholderitems.component.html',
    styleUrls: ['./placeholderitems.component.scss']
})
export class PlaceholderitemsComponent implements OnInit {

    @Input() num = 30;
    @Input() heigth = 150;

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

}
