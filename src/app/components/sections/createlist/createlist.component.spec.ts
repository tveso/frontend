import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelistComponent } from './createlist.component';

describe('CreatelistComponent', () => {
  let component: CreatelistComponent;
  let fixture: ComponentFixture<CreatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
