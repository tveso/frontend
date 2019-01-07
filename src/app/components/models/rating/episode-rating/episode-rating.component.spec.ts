import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeRatingComponent } from './episode-rating.component';

describe('EpisodeRatingComponent', () => {
  let component: EpisodeRatingComponent;
  let fixture: ComponentFixture<EpisodeRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
