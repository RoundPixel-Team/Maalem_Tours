import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FlightCheckoutService, FlightResultService } from 'rp-travel-ui';

@Component({
  selector: 'app-round-trip-checkout',
  templateUrl: './round-trip.component.html',
  styleUrls: ['./round-trip.component.scss']
})
export class RoundTripComponent implements OnInit {
  public flight = inject(FlightCheckoutService) 
  public translate = inject(TranslateService)
  FlightResult= inject(FlightResultService)

  showDetails:boolean=false;
  index:number=0;
  detailsStates: boolean[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  toggleDetailsCard(){
    this.showDetails=!this.showDetails;
  }
  detailsCollapse(flightIndex: number){
    if (this.detailsStates[flightIndex] === undefined) {
      this.detailsStates[flightIndex] = true;
    } else {
      this.detailsStates[flightIndex] = !this.detailsStates[flightIndex];
    }  }
    getFareRules(sid: string,sequenceNum: number,providerKey: any){
      this.FlightResult.showFareRules( sid,sequenceNum,providerKey)
    }
}
