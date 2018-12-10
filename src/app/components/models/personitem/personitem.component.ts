import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-personitem',
    templateUrl: './personitem.component.html',
    styleUrls: ['./personitem.component.scss']
})
export class PersonitemComponent implements OnInit {

    @Input() public person;
    @Input() public extras = true;
    @Input() public callback: Function = undefined;
    public roles = {
        'Directing': ['Directora', 'Director'], 'Acting': ['Actriz', 'Actor'],
        'Production': ['Productora', 'Productor'], 'Writing': ['Guionista'],
        'Editing': ['Edición'], 'Sound': ['Sonido']
    };

    constructor() {
    }

    ngOnInit() {
    }
    handle($event: Event) {
        if (this.hasCallback()) {
            return this.callback();
        }
    }

    hasCallback() {
        return this.callback instanceof Function;
    }

    getExtras() {
        if (!this.extras) {
            return;
        }
        if (typeof this.person.character !== 'undefined') {
            return this.person.character;
        }
        if (typeof this.person.job !== 'undefined') {
            return this.person.job;
        }
    }

    getKnownAs() {
        if (typeof this.person['known_for_department'] === 'undefined') {
            return null;
        }
        const rol = this.person['known_for_department'];
        const gender = this.person.gender - 1;
        if (rol in this.roles) {
            if (typeof this.roles[rol][gender] !== 'undefined') {
                return this.roles[rol][gender];
            }
            return this.roles[rol][0];
        }
        return rol;
    }
}
