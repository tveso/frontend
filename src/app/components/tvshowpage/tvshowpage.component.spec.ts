import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowpageComponent } from './tvshowpage.component';

describe('TvshowpageComponent', () => {
  let component: TvshowpageComponent;
  let fixture: ComponentFixture<TvshowpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvshowpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
