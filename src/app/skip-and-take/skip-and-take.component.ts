import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

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

  public run() {
    this.clear();
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
