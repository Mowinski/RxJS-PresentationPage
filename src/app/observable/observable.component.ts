import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


declare var hljs;

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent {
  public result = '';
  public gap = '?';
  private $subscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/observable/complex');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/iterator');
    }
    if (event.key === '.' && this.gap === 'Observable') {
      this.run();
    }
    if (event.key === '.' && this.gap === '?') {
      this.gap = 'Observable';
    }

  }

  constructor(private router: Router) { }

  public run() {
    this.clear();
    const observable = Observable.of('Observable test');
    this.$subscription = observable.subscribe(text => this.result = text);
  }

  public clear() {
    this.result = '';
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  public onDestroy() {
    this.clear();
  }
}
