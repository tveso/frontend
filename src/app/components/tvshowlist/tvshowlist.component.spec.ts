import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowlistComponent } from './tvshowlist.component';

describe('TvshowlistComponent', () => {
  let component: TvshowlistComponent;
  let fixture: ComponentFixture<TvshowlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvshowlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
