import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skip';
import { Router } from '@angular/router';

declare var hljs;


@Component({
  selector: 'app-skip-and-take',
  templateUrl: './skip-and-take.component.html',
  styleUrls: ['./skip-and-take.component.css']
})
export class SkipAndTakeComponent {
  public skipResult = [];
  public takeResult = [];
  private $skipSubscription: Subscription;
  private $takeSubscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/operators/scan-and-reduce');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/operators');
    }
    if (event.key === '.') {
      this.run();
    }
  }

  constructor(private router: Router) { }

  public run() {
    this.clear();

    const pancakesObservable = Observable.interval(3000).map((value) => 'Pancakes ' + (value + 1));
    this.$skipSubscription = pancakesObservable.skip(2).subscribe((pancakes: string) => this.skipResult.push(pancakes));

    const queueObservable = Observable.interval(1000).map((value) => 'Client number ' + (value + 1));
    this.$takeSubscription = queueObservable.take(5).subscribe((client: string) => this.takeResult.push(client));
  }

  public clear() {
    if (this.$skipSubscription) {
      this.$skipSubscription.unsubscribe();
    }
    if (this.$takeSubscription) {
      this.$takeSubscription.unsubscribe();
    }
  }

  public onDestroy() {
    this.clear();
  }

}
