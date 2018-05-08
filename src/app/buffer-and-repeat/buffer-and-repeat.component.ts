import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

declare var hljs;

@Component({
  selector: 'app-buffer-and-repeat',
  templateUrl: './buffer-and-repeat.component.html',
  styleUrls: ['./buffer-and-repeat.component.css']
})
export class BufferAndRepeatComponent {
  public bufferResult = [];
  public repeatResult = [];
  private $bufferSubscription: Subscription;
  private $repeatSubscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  public run() {
    this.clear();
  }

  public clear() {
    if (this.$bufferSubscription) {
      this.$bufferSubscription.unsubscribe();
    }
    if (this.$repeatSubscription) {
      this.$repeatSubscription.unsubscribe();
    }
  }

  public onDestroy() {
    this.clear();
  }

}
