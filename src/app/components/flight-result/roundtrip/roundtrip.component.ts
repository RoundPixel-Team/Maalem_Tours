import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlightResultService, flight, airItineraries } from 'rp-travel-ui';

@Component({
  selector: 'app-roundtrip-result',
  templateUrl: './roundtrip.component.html',
  styleUrls: ['./roundtrip.component.scss']
})
export class RoundtripComponent implements OnInit {
  FlightResult= inject(FlightResultService)
  route = inject(ActivatedRoute)
  router=inject(Router);
  public translate = inject(TranslateService)
moreFlights:boolean=false;
showDetails:boolean=false;
showMoreDetails:boolean[]=[];
collapseRoute:boolean=false;
term!:flight;
seqNum!:number;
moreDetailsIndex: number = 0;
searchId!:string
@Input() flight: airItineraries[] = [];
detailsStates: boolean[] = [];
index:number=0;
  constructor() { }

  ngOnInit(): void {
  }
  showMoreFlights(){
    this.moreFlights=!this.moreFlights;
  }
  toggleDetailsCard(term: flight,  sequenceNum: number){
    this.showDetails=!this.showDetails;
    console.log(term,sequenceNum,"show data")
    this.term=term;
    this.seqNum=sequenceNum;
  }
  toggleMoreDetailsCard(m:number){
    this.showMoreDetails[m] = !this.showMoreDetails[m];
    this.moreDetailsIndex = m;
  }
  detailsCollapse(flightIndex: number){
    if (this.detailsStates[flightIndex] === undefined) {
      this.detailsStates[flightIndex] = true;
    } else {
      this.detailsStates[flightIndex] = !this.detailsStates[flightIndex];
    }    }
  toCheckout(sid: string, sequenceNum: number,providerKey: number | undefined) {
    this.router.navigate(["/checkout"], {
      queryParams: { sid: sid, sequenceNum: sequenceNum, providerKey: providerKey },
    });
  }
  getFareRules(sid: string,sequenceNum: number,providerKey: any){
    this.FlightResult.showFareRules( sid,sequenceNum,providerKey)
  }
}
