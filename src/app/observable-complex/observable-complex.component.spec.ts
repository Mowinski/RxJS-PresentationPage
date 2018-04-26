import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableComplexComponent } from './observable-complex.component';

describe('ObservableComplexComponent', () => {
  let component: ObservableComplexComponent;
  let fixture: ComponentFixture<ObservableComplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableComplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
