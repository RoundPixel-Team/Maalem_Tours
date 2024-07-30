import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FareRules, FlightResultService, airItineraries, flight } from 'rp-travel-ui';

@Component({
  selector: 'app-oneway-result',
  templateUrl: './oneway.component.html',
  styleUrls: ['./oneway.component.scss']
})
export class OnewayComponent implements OnInit {
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
provierKey!:any;
moreDetailsIndex: number = 0;
searchId!:string
@Input() flight: airItineraries[] = [];

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
  detailsCollapse(){
    this.collapseRoute=!this.collapseRoute;
  }
  toCheckout(sid: string, sequenceNum: number,providerKey: number | undefined) {
    this.router.navigate(["/checkout"], {
      queryParams: { sid: sid, sequenceNum: sequenceNum, providerKey: providerKey },
    });
  }
  getFareRules(sid: string,sequenceNum: number,providerKey: any){
    this.FlightResult.showFareRules( sid,sequenceNum,providerKey)
  }
}

