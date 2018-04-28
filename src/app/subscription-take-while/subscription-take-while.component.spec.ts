import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionTakeWhileComponent } from './subscription-take-while.component';

describe('SubscriptionTakeWhileComponent', () => {
  let component: SubscriptionTakeWhileComponent;
  let fixture: ComponentFixture<SubscriptionTakeWhileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionTakeWhileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionTakeWhileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
