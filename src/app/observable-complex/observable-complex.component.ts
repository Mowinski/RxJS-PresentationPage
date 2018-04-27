import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

declare var hljs;

@Component({
  selector: 'app-observable-complex',
  templateUrl: './observable-complex.component.html',
  styleUrls: ['./observable-complex.component.css']
})
export class ObservableComplexComponent {

  public result = '';
  public timer = 0;

  private $subscription: Subscription;
  private interval: any;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }
  constructor() { }

  run() {
    this.clear();


    const observable = Observable.create((observer) => {
      setTimeout(() => observer.next(1), 1000);
      setTimeout(() => observer.next(2), 2000);
      setTimeout(() => observer.next(3), 3000);
      setTimeout(() => observer.next(5), 5000);
      setTimeout(() => observer.next(8), 8000);
      setTimeout(() => observer.next(13), 13000);
      setTimeout(() => observer.complete(), 21000);
    }).debounceTime(1500);

    this.interval = setInterval(
      () => this.timer = Math.round( (this.timer + 0.1) * 100) / 100,
      100,
    );

    this.$subscription = observable.subscribe((number) => this.result += number + ' (' + this.timer + 's)<br>');
  }

  public clear() {
    this.result = '';
    this.timer = 0;
    clearInterval(this.interval);
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  onDestroy() {
    this.clear();
  }

}
