import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItembadgeComponent } from './itembadge.component';

describe('ItembadgeComponent', () => {
  let component: ItembadgeComponent;
  let fixture: ComponentFixture<ItembadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItembadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItembadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
