import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightConfimrationRoutingModule } from './flight-confimration-routing.module';
import { FlightConfimrationComponent } from './flight-confimration.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FlightConfimrationComponent
  ],
  imports: [
    CommonModule,
    FlightConfimrationRoutingModule,
    SharedModule
  ]
})
export class FlightConfimrationModule { }
