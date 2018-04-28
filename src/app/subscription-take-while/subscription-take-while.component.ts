import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

declare var hljs;


@Component({
  selector: 'app-subscription-take-while',
  templateUrl: './subscription-take-while.component.html',
  styleUrls: ['./subscription-take-while.component.css']
})
export class SubscriptionTakeWhileComponent {
  public result = 0;
  public childResult = 0;
  public isAlive = true;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }
  constructor() { }

  run() {
    this.result = 0;
    this.isAlive = true;
    const observable = Observable.interval(1000).takeWhile(() => this.isAlive);

    observable.subscribe((value) => this.result = value);
  }

  clear() {
    this.isAlive = false;
  }

  onDestroy() {
    this.clear();
  }

}
