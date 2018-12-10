import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSelectorComponent } from './show-selector.component';

describe('ShowSelectorComponent', () => {
  let component: ShowSelectorComponent;
  let fixture: ComponentFixture<ShowSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
