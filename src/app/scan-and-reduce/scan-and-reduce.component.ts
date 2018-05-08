import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

declare var hljs;

@Component({
  selector: 'app-scan-and-reduce',
  templateUrl: './scan-and-reduce.component.html',
  styleUrls: ['./scan-and-reduce.component.css']
})
export class ScanAndReduceComponent {
  public scanResult = [];
  public reduceResult = [];
  private $scanSubscription: Subscription;
  private $reduceSubscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  public run() {
    this.clear();
    const simpleObservable = Observable.interval(1000);
    const mappedObservable = Observable.interval(1000).filter((value: number) => value % 2 === 0);

    this.$scanSubscription = simpleObservable.subscribe((value) => this.scanResult.push(value));
    this.$reduceSubscription = mappedObservable.subscribe((value) => this.reduceResult.push(value));
  }

  public clear() {
    if (this.$scanSubscription) {
      this.$scanSubscription.unsubscribe();
    }
    if (this.$reduceSubscription) {
      this.$reduceSubscription.unsubscribe();
    }
  }

  public onDestroy() {
    this.clear();
  }

}
