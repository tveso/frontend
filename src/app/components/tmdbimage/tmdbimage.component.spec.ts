import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmdbimageComponent } from './tmdbimage.component';

describe('TmdbimageComponent', () => {
  let component: TmdbimageComponent;
  let fixture: ComponentFixture<TmdbimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmdbimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmdbimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
