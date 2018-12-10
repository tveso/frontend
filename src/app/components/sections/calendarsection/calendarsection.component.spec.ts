import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarsectionComponent } from './calendarsection.component';

describe('CalendarsectionComponent', () => {
  let component: CalendarsectionComponent;
  let fixture: ComponentFixture<CalendarsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
