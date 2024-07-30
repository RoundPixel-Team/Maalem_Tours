import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightResultRoutingModule } from './flight-result-routing.module';
import { FlightResultComponent } from './flight-result.component';
import { OnewayComponent } from './oneway/oneway.component';
import { RoundtripComponent } from './roundtrip/roundtrip.component';
import { MulticityComponent } from './multicity/multicity.component';
import { FlightsFiltersComponent } from './flights-filters/flights-filters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    FlightResultComponent,
    OnewayComponent,
    RoundtripComponent,
    MulticityComponent,
    FlightsFiltersComponent,
  ],
  imports: [
    CommonModule,
    FlightResultRoutingModule,
    MatProgressBarModule,
    SharedModule,
  ]
})
export class FlightResultModule { }
