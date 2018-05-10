import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/scan';
import { Router } from '@angular/router';

declare var hljs;

@Component({
  selector: 'app-scan-and-reduce',
  templateUrl: './scan-and-reduce.component.html',
  styleUrls: ['./scan-and-reduce.component.css']
})
export class ScanAndReduceComponent {
  public scanResult: number;
  public reduceResult: number;
  public timePeriod: number;
  public maxWeight: number;

  private $scanSubscription: Subscription;
  private $reduceSubscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/operators/buffer-and-repeat');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/operators/skip-and-take');
    }
    if (event.key === '.') {
      if (!this.timePeriod) {
        this.timePeriod = 10;
      }
      if (!this.maxWeight) {
        this.maxWeight = 10;
      }
      this.run();
    }
  }

  constructor(private router: Router) { }

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
