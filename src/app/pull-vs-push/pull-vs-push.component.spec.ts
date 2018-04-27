import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullVsPushComponent } from './pull-vs-push.component';

describe('PullVsPushComponent', () => {
  let component: PullVsPushComponent;
  let fixture: ComponentFixture<PullVsPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullVsPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullVsPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
