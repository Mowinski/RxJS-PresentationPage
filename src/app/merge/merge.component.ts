import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

declare var hljs;

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent {
  public result = [];
  private $subscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  public run() {
    this.clear();

    const dailyBugleObservable = Observable.create((observer) => {
      let number = 0;
      setInterval(() => observer.next(['Spider-Man - Threat or menace ' + number++, 'green']), 5000);
    });
    const dailyNewsObservable = Observable.create((observer) => {
      let number = 0;
      setInterval(() => observer.next(['World leaders meet ... ' + number++, 'blue']), 10000);
    });
    const pudelekObservable = Observable.create((observer) => {
      let number = 0;
      setInterval(() => observer.next(['Słodkie pocałunki... zobacz kogo: ' + number++, 'purple']), 2500);
    });

    const newsObservable = merge(
      dailyBugleObservable,
      dailyNewsObservable,
      pudelekObservable,
    );

    this.$subscription = newsObservable.subscribe((news) => this.result.push(news));
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
