import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserrecommendedComponent} from './userrecommended.component';

describe('UserrecommendedComponent', () => {
    let component: UserrecommendedComponent;
    let fixture: ComponentFixture<UserrecommendedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserrecommendedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserrecommendedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
