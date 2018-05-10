import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router } from '@angular/router';

declare var hljs;

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.css']
})
export class CombineComponent {

  public status: boolean;
  public result: string;
  public showCode = false;
  public databaseStatus = false;
  public webserverStatus = false;

  private $subscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }
  @ViewChild('code2') set content2(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/operators/zip');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/operators/merge');
    }
    if (event.key === '.') {
      if (!this.$subscription) {
        this.run();
      } else if (!this.databaseStatus) {
        this.databaseStatus = true;
      } else if (!this.webserverStatus) {
        this.webserverStatus = true;
      } else if (this.databaseStatus && this.webserverStatus) {
        this.databaseStatus = false;
      }
    }
  }

  constructor(private router: Router) { }

  public run() {
    this.clear();

    const databaseObservable = Observable.interval(10).map((value) => this.databaseStatus);
    const webserverObservable = Observable.interval(10).map((value) => this.webserverStatus);
    const articleObservable = Observable.combineLatest(
      databaseObservable,
      webserverObservable,
      (databaseStatus, webserverStatus) => databaseStatus && webserverStatus,
    )
    .distinctUntilChanged();
    this.$subscription = articleObservable.subscribe((article: boolean) => {
      this.result = 'changed';
      this.status = article;
      setTimeout(() => this.result = '', 1000);
    });
  }

  public clear() {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  public onDestroy() {
    this.clear();
  }

}
