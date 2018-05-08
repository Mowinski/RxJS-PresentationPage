import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanAndReduceComponent } from './scan-and-reduce.component';

describe('ScanAndReduceComponent', () => {
  let component: ScanAndReduceComponent;
  let fixture: ComponentFixture<ScanAndReduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanAndReduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanAndReduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
