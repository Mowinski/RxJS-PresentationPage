import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

declare var hljs;

@Component({
  selector: 'app-merge-all',
  templateUrl: './merge-all.component.html',
  styleUrls: ['./merge-all.component.css']
})
export class MergeAllComponent {

  public result = [];
  private $subscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  public run() {
    this.clear();
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
