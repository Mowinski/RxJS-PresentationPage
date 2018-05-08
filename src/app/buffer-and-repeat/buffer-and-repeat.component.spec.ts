import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferAndRepeatComponent } from './buffer-and-repeat.component';

describe('BufferAndRepeatComponent', () => {
  let component: BufferAndRepeatComponent;
  let fixture: ComponentFixture<BufferAndRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BufferAndRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BufferAndRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
