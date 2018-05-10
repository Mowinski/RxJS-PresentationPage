import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

declare var hljs;

@Component({
  selector: 'app-behaviour-subject',
  templateUrl: './behaviour-subject.component.html',
  styleUrls: ['./behaviour-subject.component.css']
})
export class BehaviourSubjectComponent {
  public result: number;
  public subjectResult: number;

  private myAge = 18;

  private behaviorSubject: BehaviorSubject<number>;
  private subject: Subject<number>;
  private $sub1: Subscription;
  private $sub2: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/subject/replay-subject');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/subject');
    }
  }

  constructor(private router: Router) { }

  run(runBehavior: boolean) {
    if (runBehavior) {
      this.behaviorSubject = new BehaviorSubject(this.myAge);
      this.result = undefined;
      this.$sub1 = this.behaviorSubject.subscribe((age: number) => this.result = age);
    } else {
      this.subject = new Subject();
      this.subjectResult = undefined;
      this.$sub2 = this.subject.subscribe((age: number) => this.subjectResult = age);
    }
  }

  next() {
    this.myAge++;
    if (this.behaviorSubject) {
      this.behaviorSubject.next(this.myAge);
    }
    if (this.subject) {
      this.subject.next(this.myAge);
    }
  }

  clear() {
    if (this.$sub1) {
      this.$sub1.unsubscribe();
    }
    if (this.$sub2) {
      this.$sub2.unsubscribe();
    }
  }

  onDestroy() {
    this.clear();
  }
}
