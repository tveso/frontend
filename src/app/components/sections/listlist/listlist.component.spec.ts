import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlistComponent } from './listlist.component';

describe('ListlistComponent', () => {
  let component: ListlistComponent;
  let fixture: ComponentFixture<ListlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
