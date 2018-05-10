import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import { Router } from '@angular/router';

declare var window;
declare var hljs;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  public result = 0;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/subscription/add');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/pull-vs-push');
    }
    if (event.key === '.') {
      this.run();
    }
  }

  constructor(private router: Router) { }

  run() {
    this.result = 0;
    if (window.memory_leak) {
      this.result = window.memory_leak;
    }
    Observable.interval(1000).subscribe(value => {
      window.memory_leak = value;
      this.result += 1;
    });
  }

}
