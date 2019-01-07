import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FindService} from '../../../services/find.service';
import {MatSnackBar} from '@angular/material';
import {PeopleService} from '../../../services/people.service';

@Component({
  selector: 'app-person-selector',
  templateUrl: './person-selector.component.html',
  styleUrls: ['./person-selector.component.scss']
})
export class PersonSelectorComponent implements OnInit {

    searchControl: FormControl = new FormControl();
    @Input() searchText;
    @Input() selecteds = [];
    @Input() showFilter = {};
    @Input() peopleLength = 100;
    callback;
    public results: any[] = [];
    constructor(private peopleService: PeopleService, private matSnack: MatSnackBar) { }
    @Output() output: EventEmitter<any> = new EventEmitter<any>();
    ngOnInit() {
        this.callback = this.load.bind(this);
    }

    load(params) {
        return this.peopleService.all(params);
    }


    select(id, $event) {
        if (this.exists(id)) {
            this.remove(id);
        } else {
            if (this.selecteds.length < this.peopleLength) {
                this.selecteds.push(id);
            } else {
                this.matSnack.open('Solo puedes seleccionar un máximo de ' + this.peopleLength, 'CERRAR');
            }
        }
        this.output.emit(this.selecteds);
    }
    filteredFn(items: Array<any>) {
        return items.filter((a: any) => {
            return this.selecteds.indexOf(a) === -1;
        });
    }

    getClass(id) {
        return (this.exists(id) === true) ? 'selected' : 'no-selected';
    }

    private exists(id: any) {
        return this.getIndex(id) > -1;
    }

    public get(id: any) {
        return this.selecteds.find((a) => {
            return a._id === id._id;
        });
    }

    private getIndex(id: any) {
        const item = this.get(id);
        return this.selecteds.indexOf(item);
    }

    private remove(id: any) {
        const index = this.getIndex(id);
        if (index > -1) {
            this.selecteds.splice(index, 1);
        }
    }

}
