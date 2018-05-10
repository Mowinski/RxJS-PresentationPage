import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


import { NewsService, News } from '../news.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

declare var hljs;


@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css']
})
export class ReplaySubjectComponent {
  public result = '';

  private subscriptions: [Subscription];
  private colors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF',
  ];

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/operators');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/subject/behavior-subject');
    }
    if (event.key === '.') {
      this.run();
    }
  }

  constructor(
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.subscriptions = [] as [Subscription];
  }

  run() {
    this.newsService.create();
    const indx = this.subscriptions.length;
    this.subscriptions.push(this.newsService.getLatestNews().subscribe(
      (news: News) => this.result += '<span style="color: ' + this.colors[indx] + '">Reader ' + indx + ': ' + news.title + '</span><br>',
    ));
  }

  stop() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [] as [Subscription];
  }

  onDestroy() {
    this.stop();
    this.newsService.destroy();
  }
}
