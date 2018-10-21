import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-spoiler',
    templateUrl: './spoiler.component.html',
    styleUrls: ['./spoiler.component.css']
})
export class SpoilerComponent implements OnInit {
    @Input() text;
    showSpoiler = false;

    constructor() {
    }

    ngOnInit() {
    }

}
