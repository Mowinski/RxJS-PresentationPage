import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ObservableComponent } from './observable/observable.component';
import { MapComponent } from './map/map.component';
import { StartComponent } from './start/start.component';
import { ObservableComplexComponent } from './observable-complex/observable-complex.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'map', component: MapComponent },
  { path: 'invokable-collection', component: ObservableComponent },
  { path: 'observable/complex', component: ObservableComplexComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    ObservableComponent,
    MapComponent,
    StartComponent,
    ObservableComplexComponent,
  ],
})
export class RoutingRoutingModule { }
