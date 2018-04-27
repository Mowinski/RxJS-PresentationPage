import { Component, ViewChild, ElementRef } from '@angular/core';

declare var hljs;

@Component({
  selector: 'app-iterator',
  templateUrl: './iterator.component.html',
  styleUrls: ['./iterator.component.css']
})
export class IteratorComponent {

  public result = '';
  private interval: any;
  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  constructor() { }

  run() {
    this.clear();

    const fibonnaci = this.generate_fibonnaci();
    this.interval = setInterval(() => this.result += fibonnaci.next().value + ' ', 1000);
  }

  *generate_fibonnaci() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      const tmp = b;
      b = a + b;
      a = tmp;
    }
  }

  clear() {
    clearInterval(this.interval);
    this.result = '';
  }
}
