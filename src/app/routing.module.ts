import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

import { ObservableComponent } from './observable/observable.component';
import { StartComponent } from './start/start.component';
import { ObservableComplexComponent } from './observable-complex/observable-complex.component';
import { IteratorComponent } from './iterator/iterator.component';
import { PullVsPushComponent } from './pull-vs-push/pull-vs-push.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionAddComponent } from './subscription-add/subscription-add.component';
import { SubscriptionTakeWhileComponent } from './subscription-take-while/subscription-take-while.component';
import { SubjectComponent } from './subject/subject.component';
import { BehaviourSubjectComponent } from './behaviour-subject/behaviour-subject.component';
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component';
import { NewsService } from './news.service';
import { SanitizeHtml } from './pipes';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'iterator', component: IteratorComponent },
  { path: 'invokable-collection', component: ObservableComponent },
  { path: 'observable/complex', component: ObservableComplexComponent },
  { path: 'pull-vs-push', component: PullVsPushComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'subscription/add', component: SubscriptionAddComponent },
  { path: 'subscription/take-while', component: SubscriptionTakeWhileComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'subject/behavior-subject', component: BehaviourSubjectComponent },
  { path: 'subject/replay-subject', component: ReplaySubjectComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    ObservableComponent,
    StartComponent,
    ObservableComplexComponent,
    IteratorComponent,
    PullVsPushComponent,
    SubscriptionComponent,
    SubscriptionAddComponent,
    SubscriptionTakeWhileComponent,
    SubjectComponent,
    BehaviourSubjectComponent,
    ReplaySubjectComponent,
    SanitizeHtml,
  ],
  providers: [NewsService],
})
export class RoutingRoutingModule { }
