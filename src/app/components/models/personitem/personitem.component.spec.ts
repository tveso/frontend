import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonitemComponent} from './personitem.component';

describe('PersonitemComponent', () => {
    let component: PersonitemComponent;
    let fixture: ComponentFixture<PersonitemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersonitemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonitemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
