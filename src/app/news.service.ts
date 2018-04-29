import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { NEWS } from './fixtures';

export interface News {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}


@Injectable()
export class NewsService {
  private $sub: Subscription;
  private newsSubject = new ReplaySubject<News>(3);

  constructor() {}

  create() {
    if (this.$sub) {
      return;
    }
    this.$sub = Observable.interval(5000)
        .take(NEWS.length)
        .map((ind: number) => NEWS[ind])
        .delay(5000)
        .subscribe(this.newsSubject);
  }

  getLatestNews(): ReplaySubject<News> {
    return this.newsSubject;
  }

  destroy() {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
  }
}
