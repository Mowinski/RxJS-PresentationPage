import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipAndTakeComponent } from './skip-and-take.component';

describe('SkipAndTakeComponent', () => {
  let component: SkipAndTakeComponent;
  let fixture: ComponentFixture<SkipAndTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipAndTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipAndTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
