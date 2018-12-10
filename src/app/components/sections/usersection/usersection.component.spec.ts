import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersectionComponent } from './usersection.component';

describe('UsersectionComponent', () => {
  let component: UsersectionComponent;
  let fixture: ComponentFixture<UsersectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
