import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/delay';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

declare var hljs;

class Newspaper {
  constructor(public title: string, public release: number) {}
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  public resultForObservableA = '';
  public resultForObservableB = '';
  public resultForSubjectA = '';
  public resultForSubjectB = '';

  private $subObservable: Subscription;
  private $subObservable2: Subscription;
  private $subSubject: Subscription;
  private $subSubject2: Subscription;

  @ViewChild('codeObserver') set codeObserver(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @ViewChild('codeSubject') set codeSubject(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/subject/behavior-subject');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/subscription/take-while');
    }
  }

  constructor(private router: Router) { }

  runObservable() {
    this.clearObservable();

    this.resultForObservableA = '';
    this.resultForObservableB = '';

    const observable = Observable.create((observer) => {
      let release = 0;
      setInterval(() => observer.next(new Newspaper('TheNewYorkTimes', release++)), 4000);
    });

    this.$subObservable = observable.subscribe((value: Newspaper) => {
      value.title = 'TheWroclawTimes';
      this.resultForObservableA = value.title + ' ' + value.release;
    });
    this.$subObservable2 = observable.delay(1000).subscribe((value: Newspaper) => {
      this.resultForObservableB = value.title + ' ' + value.release;
    });
  }


  runSubject() {
    this.clearSubject();
    this.resultForSubjectA = '';
    this.resultForSubjectB = '';

    const observable = Observable.create((observer) => {
      let release = 0;
      setInterval(() => observer.next(new Newspaper('TheNewYorkTimes', release++)), 4000);
    });

    const subject = new Subject();

    this.$subSubject = subject.subscribe((value: Newspaper) => {
      value.title = 'TheWroclawTimes';
      this.resultForSubjectA = value.title + ' ' + value.release;
    });
    this.$subSubject2 = subject.delay(1000).subscribe((value: Newspaper) => {
      this.resultForSubjectB = value.title + ' ' + value.release;
    });

    observable.subscribe(subject);
  }

  clearObservable() {
    if (this.$subObservable) {
      this.$subObservable.unsubscribe();
    }
    if (this.$subObservable2) {
      this.$subObservable2.unsubscribe();
    }
  }

  clearSubject() {
    if (this.$subSubject) {
      this.$subSubject.unsubscribe();
    }
    if (this.$subSubject2) {
      this.$subSubject2.unsubscribe();
    }
  }

  observerA(value: Newspaper) {
    value.title = 'TheWroclawTimes';
    this.resultForSubjectA = value.title + ' ' + value.release;
  }

  observerB(value: Newspaper) {
    this.resultForSubjectB = value.title + ' ' + value.release;
  }

  onDestroy() {
    this.clearObservable();
    this.clearSubject();
  }
}
