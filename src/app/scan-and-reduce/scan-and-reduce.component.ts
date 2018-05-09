import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';

declare var hljs;

@Component({
  selector: 'app-scan-and-reduce',
  templateUrl: './scan-and-reduce.component.html',
  styleUrls: ['./scan-and-reduce.component.css']
})
export class ScanAndReduceComponent {
  public scanResult: number;
  public reduceResult: number;
  private $scanSubscription: Subscription;
  private $reduceSubscription: Subscription;
  private timePeriod: number;
  private maxWeight: number;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  public run() {
    this.clear();

    const piggyBankObservable = Observable.interval(1000)
      .takeWhile((value: number) => value < this.timePeriod)
      .map(() => Math.floor(Math.random() * 500) / 100)
      .reduce((acc: number, cur: number) => acc + cur, 0);

    this.$reduceSubscription = piggyBankObservable.subscribe((value: number) => this.reduceResult = value);

    const backpackProblemObservable = Observable.interval(1000)
      .map(() => Math.floor(Math.random() * 10) / 10)
      .scan((acc, cur) => acc + cur, 0)
      .takeWhile((weight: number) => weight < this.maxWeight);

    this.$scanSubscription = backpackProblemObservable.subscribe((weight: number) => this.scanResult = weight);
  }

  public clear() {
    if (this.$scanSubscription) {
      this.$scanSubscription.unsubscribe();
    }
    if (this.$reduceSubscription) {
      this.$reduceSubscription.unsubscribe();
    }
    this.reduceResult = 0;
  }

  public onDestroy() {
    this.clear();
  }

}
