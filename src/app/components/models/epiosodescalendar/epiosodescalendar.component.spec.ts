import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiosodescalendarComponent } from './epiosodescalendar.component';

describe('EpiosodescalendarComponent', () => {
  let component: EpiosodescalendarComponent;
  let fixture: ComponentFixture<EpiosodescalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiosodescalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiosodescalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
