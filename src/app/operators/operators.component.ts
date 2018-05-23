import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatMap';
import { Router } from '@angular/router';


declare var hljs;

class Sheep {
  static _id = 0;
  public id: number;
  private ramName = ['Billy', 'Lambert', 'Midnight', 'Smokey', 'Stormy', 'Licorice', 'Shadow', 'Latte', 'Cocoa', 'Brownie', 'Sandy', 'Toffee', 'Fuzzy', 'Curly', 'Mephistopheles'];
  private sheepName = ['Nanny', 'Pan', 'Wooly', 'Bo Peep', 'Snowy', 'Snow White', 'Daisy', 'Snowflake', 'Cloud', 'Cream', 'Amber', 'Carmel', 'Cuddles', 'Fluffy', 'Snowball'];
  constructor(public isRam: boolean) {
    this.id = Sheep._id++;
  }

  public getName() {
    if(this.isRam) {
      return this.ramName[this.id];
    }
    return this.sheepName[this.id];
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

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'PageDown') {
      this.router.navigateByUrl('/operators/skip-and-take');
    }
    if (event.key === 'PageUp') {
      this.router.navigateByUrl('/subject/replay-subject');
    }
    if (event.key === '.') {
      this.run();
    }
  }

  constructor(private router: Router) { }

  public run() {
    this.clear();
    const flock = Array.from({length: 15}, () => Math.random() < 0.8 ? new Sheep(false) : new Sheep(true));

    const simpleObservable = Observable.from(flock).concatMap((sheep) => Observable.of(sheep).delay(1000));
    const filteredObservable = Observable.from(flock)
      .concatMap((sheep) => Observable.of(sheep).delay(1000))
      .filter((sheep: Sheep) => sheep.isRam);

    this.$simpleSubscription = simpleObservable.subscribe((value) => this.simpleResult.push(value));
    this.$filterSubscription = filteredObservable.subscribe((value) => this.filterResult.push(value));
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
