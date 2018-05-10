import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import { Router } from '@angular/router';

declare var hljs;

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent {

  public result = [];
  private $subscription: Subscription;
  private cakeShape = ['round', 'square', 'micky mouse', 'heart', 'dog', 'flower', 'cat', 'star', 'tree'];
  private stamps = ['owl', 'happy birthday', 'merry christmas', 'avengers mark', 'congratulations'];

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/operators/combine-latest');
    }
    if (event.key === '.') {
      this.run();
    }
  }

  constructor(private router: Router) { }

  public run() {
    this.clear();

    const cakeObservable = Observable.interval(4000).map(() => this.cakeShape[Math.floor(Math.random() * this.cakeShape.length)]);
    const stampObservable = Observable.interval(5000).map(() => this.stamps[Math.floor(Math.random() * this.stamps.length)]);
    const cakeFactoryObservable = Observable.zip(
      cakeObservable,
      stampObservable,
      (cake, stamp) => cake + ' with ' + stamp,
    );

    this.$subscription = cakeFactoryObservable.subscribe((cake) => this.result.push(cake));
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
