import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

declare var hljs;


@Component({
  selector: 'app-pull-vs-push',
  templateUrl: './pull-vs-push.component.html',
  styleUrls: ['./pull-vs-push.component.css']
})
export class PullVsPushComponent {
  public function = '?';
  public observable = '?';
  public promise = '?';
  public iterator = '?';

  public isError = false;
  public result = '';

  private $subscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/subscription');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/observable/complex');
    }
    if (event.key === '.') {
      if (this.function === '?') {
        this.function = 'Function';
        return;
      }
      if (this.iterator === '?') {
        this.iterator = 'Iterator';
        return;
      }
      if (this.promise === '?') {
        this.promise = 'Promise';
        return;
      }
      if (this.observable === '?') {
        this.observable = 'Observable';
        return;
      }
      this.run();
    }
  }

  constructor(private router: Router) { }

  run() {
    this.clear();
    const observable = Observable.create((observer) => {
      observer.next(1);
      observer.next(2);
      if (this.isError) {
        observer.error('Errors occures');
      }
      observer.next(4);
      observer.complete();
      observer.next(8);
    });

    const observerObj = {
      next: (value: number) => this.result += value + ' ',
      error: (error: Error) => this.result += 'Error: ' + error + ' ',
      complete: () => this.result += 'Complete ',
    } as Observer<number>;

    this.$subscription = observable.subscribe(observerObj);
  }

  clear() {
    this.result = '';
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  onDestroy() {
    this.clear();
  }
}
