import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/scan';

declare var hljs;

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.css']
})
export class CombineComponent {

  public result = '';
  private $subscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }
  constructor() {}

  public run() {
    this.clear();

    const textObservable = Observable.interval(4000).map((value) => 'Lorem ipsum ' + value + '<br>');
    const photoObservable = Observable.interval(2000).map((value) => 'Photo ' + value + '<br>');
    const articleObservable = Observable.combineLatest(
      textObservable,
      photoObservable,
      (text, photo) => text + photo,
    )
    .scan((acc, cur) => acc + cur);
    this.$subscription = articleObservable.subscribe((article: string) => this.result = article);
  }

  public clear() {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  public onDestroy() {
    this.clear();
  }

}
