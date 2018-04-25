import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservableComponent } from './observable/observable.component';
import { MapComponent } from './map/map.component';


const routes: Routes = [
  { path: '', component: ObservableComponent },
  { path: 'map', component: MapComponent },
  { path: '**', component: ObservableComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    ObservableComponent,
    MapComponent,
  ],
})
export class RoutingRoutingModule { }
