import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightResultComponent } from './flight-result.component';

const routes: Routes = [
  { path: ':language/:currency/:SearchPoint/:flightType/:flightInfo/:searchId/:passengers/:Cclass/:directOnly',
   component: FlightResultComponent,
   pathMatch:'full'
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightResultRoutingModule { }
