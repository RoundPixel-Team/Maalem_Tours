import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightConfimrationComponent } from './flight-confimration.component';

const routes: Routes = [
  { path: '', component: FlightConfimrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightConfimrationRoutingModule { }
