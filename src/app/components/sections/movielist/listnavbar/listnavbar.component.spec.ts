import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListnavbarComponent} from './listnavbar.component';

describe('ListnavbarComponent', () => {
  let component: ListnavbarComponent;
  let fixture: ComponentFixture<ListnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
