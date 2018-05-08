import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import 'rxjs/add/operator/observeOn';

declare var hljs;

@Component({
  selector: 'app-schedulers',
  templateUrl: './schedulers.component.html',
  styleUrls: ['./schedulers.component.css']
})
export class SchedulersComponent {

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }
  constructor() { }

  run() {
    const observable = Observable.create(function (observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    })
    .observeOn(async);

    console.log('just before subscribe');
    observable.subscribe({
      next: x => console.log('got value ' + x),
      error: err => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done'),
    });
    console.log('just after subscribe');

  }
}
