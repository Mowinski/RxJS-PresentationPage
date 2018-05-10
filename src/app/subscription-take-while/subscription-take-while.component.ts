import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { Router } from '@angular/router';

declare var hljs;


@Component({
  selector: 'app-subscription-take-while',
  templateUrl: './subscription-take-while.component.html',
  styleUrls: ['./subscription-take-while.component.css']
})
export class SubscriptionTakeWhileComponent {
  public result = 0;
  public childResult = 0;
  public isAlive = true;

  private isRun = false;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/subject');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/subscription/add');
    }
    if (event.key === '.') {
      if (!this.isRun) {
        this.run();
      } else {
        this.isAlive = !this.isAlive;
      }
    }
  }

  constructor(private router: Router) { }

  run() {
    this.result = 0;
    this.isAlive = true;
    const observable = Observable.interval(1000).takeWhile(() => this.isAlive);

    observable.subscribe((value) => this.result = value);
    this.isRun = true;
  }

  clear() {
    this.isAlive = false;
  }

  onDestroy() {
    this.clear();
  }

}
