import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TvshowepisodeComponent} from './tvshowepisode.component';

describe('TvshowepisodeComponent', () => {
  let component: TvshowepisodeComponent;
  let fixture: ComponentFixture<TvshowepisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvshowepisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowepisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
