import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-personitem',
    templateUrl: './personitem.component.html',
    styleUrls: ['./personitem.component.css']
})
export class PersonitemComponent implements OnInit {

    @Input() public person;
    public roles = {
        'Directing': ['Directora', 'Director'], 'Acting': ['Actriz', 'Actor'],
        'Production': ['Productora', 'Productor'], 'Writing': ['Guionista'],
        'Editing': ['Edición'], 'Sound': ['Sonido']
    };

    constructor() {
    }

    ngOnInit() {
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
