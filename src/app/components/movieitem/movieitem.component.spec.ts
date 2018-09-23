import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieitemComponent } from './movieitem.component';

describe('MovieitemComponent', () => {
  let component: MovieitemComponent;
  let fixture: ComponentFixture<MovieitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
