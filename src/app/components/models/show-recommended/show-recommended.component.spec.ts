import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowRecommendedComponent} from './show-recommended.component';

describe('ShowRecommendedComponent', () => {
    let component: ShowRecommendedComponent;
    let fixture: ComponentFixture<ShowRecommendedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowRecommendedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowRecommendedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
