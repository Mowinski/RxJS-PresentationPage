import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ObservableComponent } from './observable/observable.component';
import { StartComponent } from './start/start.component';
import { ObservableComplexComponent } from './observable-complex/observable-complex.component';
import { IteratorComponent } from './iterator/iterator.component';
import { PullVsPushComponent } from './pull-vs-push/pull-vs-push.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'iterator', component: IteratorComponent },
  { path: 'invokable-collection', component: ObservableComponent },
  { path: 'observable/complex', component: ObservableComplexComponent },
  { path: 'pull-vs-push', component: PullVsPushComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
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
  ],
})
export class RoutingRoutingModule { }
