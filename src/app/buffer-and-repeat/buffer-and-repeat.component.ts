import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/repeat';

declare var hljs;

@Component({
  selector: 'app-buffer-and-repeat',
  templateUrl: './buffer-and-repeat.component.html',
  styleUrls: ['./buffer-and-repeat.component.css']
})
export class BufferAndRepeatComponent {
  public bufferResult = [];
  public repeatResult = [];
  public showBufferVideo = false;
  public showRepeatVideo = false;
  private $bufferSubscription: Subscription;
  private $repeatSubscription: Subscription;
  private Arr = Array;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  public run() {
    this.clear();

    const waterObservable = Observable.interval(300).map(() => Math.random() < 0.8 ? 1 : 5);
    const triggerObservable = Observable.interval(5000);
    const fontainObservable = waterObservable.buffer(triggerObservable);

    this.$bufferSubscription = fontainObservable.subscribe((water: number[]) => this.bufferResult = water);

    const motherboardProduction = Observable.create((observer) => {
      observer.next('Mount processor');
      setTimeout(() => observer.next('Mount first RAM'), 1000);
      setTimeout(() => observer.next('Mount second RAM'), 3000);
      setTimeout(() => observer.next('Mount third RAM'), 5000);
      setTimeout(() => observer.next('Mount last RAM'), 7000);
      setTimeout(() => observer.next('Voltage test - passed'), 9000);
      setTimeout(() => observer.complete(), 10000);
    });

    this.$repeatSubscription = motherboardProduction.repeat(3)
      .subscribe((command: string) => this.repeatResult.push(command));
  }

  public clear() {
    if (this.$bufferSubscription) {
      this.$bufferSubscription.unsubscribe();
    }
    if (this.$repeatSubscription) {
      this.$repeatSubscription.unsubscribe();
    }
  }

  public onDestroy() {
    this.clear();
  }

}
