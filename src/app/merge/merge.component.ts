import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

declare var hljs;

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent {
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
