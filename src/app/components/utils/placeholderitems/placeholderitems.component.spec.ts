import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceholderitemsComponent} from './placeholderitems.component';

describe('PlaceholderitemsComponent', () => {
    let component: PlaceholderitemsComponent;
    let fixture: ComponentFixture<PlaceholderitemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlaceholderitemsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlaceholderitemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
