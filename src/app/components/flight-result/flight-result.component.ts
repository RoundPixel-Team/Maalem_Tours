import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlightResultService, flightResultFilter } from 'rp-travel-ui';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class FlightResultComponent implements OnInit,OnDestroy {
  FlightResult= inject(FlightResultService)
  route = inject(ActivatedRoute)
  translate  = inject(TranslateService)

  modifiySearch: boolean = false;
  router = inject(Router)
  searchId!:string
  constructor() { }
  ngOnDestroy(): void {
    this.FlightResult.destroyer()
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log("lang", params['language'], params['directOnly'])
        let lang = params['language']
        let currency = params['currency'];
        let pointOfReservation = params['SearchPoint'];
        let flightType = params['flightType'];
        let flightsInfo = params['flightInfo'];

        let serachId = params['searchId'];
        let passengers = params['passengers'];
        let Cclass = params['Cclass'];
        let showDirect: boolean;

        if (params['directOnly'] == 'false') {
          showDirect = false;
        }
        else {
          showDirect = true;
        }
        this.searchId=params['searchId']
        this.FlightResult.getDataFromUrl(lang, currency, pointOfReservation, flightType, flightsInfo, serachId, passengers, Cclass, showDirect,4,2)
      }
      );
      
  }

  openMobileFilterSideNav(){
    document.getElementById("mobileFilterSideNav")!.style.width = "100%";
  }
  

}
