import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ListMoviesCompressComponent} from './list-movies-compress.component';

describe('ListMoviesCompress', () => {
  let component: ListMoviesCompressComponent;
  let fixture: ComponentFixture<ListMoviesCompressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMoviesCompressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMoviesCompressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
