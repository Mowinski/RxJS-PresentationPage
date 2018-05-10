import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

declare var hljs;

@Component({
  selector: 'app-subscription-add',
  templateUrl: './subscription-add.component.html',
  styleUrls: ['./subscription-add.component.css']
})
export class SubscriptionAddComponent {
  public result = 0;
  public childResult = 0;

  private subscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/subscription/take-while');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/subscription');
    }
    if (event.key === '.') {
      if (!this.subscription) {
        this.run();
      } else {
        this.clear();
      }
    }
  }

  constructor(private router: Router) { }

  run() {
    this.result = 0;
    this.childResult = 0;
    this.subscription = Observable.interval(500).subscribe(value => this.result = value);
    const childSubscription = Observable.interval(1000).subscribe(value => this.childResult = value);

    this.subscription.add(childSubscription);
  }

  clear() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
