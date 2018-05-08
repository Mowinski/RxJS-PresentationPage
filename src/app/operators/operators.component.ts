import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatMap';


declare var hljs;

class Sheep {
  static _id = 0;
  public id: number;
  constructor(public color: string) {
    this.id = Sheep._id++;
  }
}


@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent {
  public simpleResult = [];
  public filterResult = [];
  private $simpleSubscription: Subscription;
  private $filterSubscription: Subscription;

  @ViewChild('code') set content(content: ElementRef) {
    if (content) {
      hljs.highlightBlock(content.nativeElement);
    }
  }

  public run() {
    this.clear();
    const flock = Array.from({length: 15}, () => Math.random() < 0.8 ? new Sheep('white') : new Sheep('black'));

    const simpleObservable = Observable.from(flock).concatMap((sheep) => Observable.of(sheep).delay(1000));
    const mappedObservable = Observable.from(flock)
      .concatMap((sheep) => Observable.of(sheep).delay(1000))
      .filter((sheep: Sheep) => sheep.color !== 'black');

    this.$simpleSubscription = simpleObservable.subscribe((value) => this.simpleResult.push(value));
    this.$filterSubscription = mappedObservable.subscribe((value) => this.filterResult.push(value));
  }

  public clear() {
    if (this.$simpleSubscription) {
      this.$simpleSubscription.unsubscribe();
    }
    if (this.$filterSubscription) {
      this.$filterSubscription.unsubscribe();
    }
    this.simpleResult = [];
    this.filterResult = [];
    Sheep._id = 0;
  }

  public onDestroy() {
    this.clear();
  }
}
