import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { destinationCard, topDestinationCard } from './interface';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
import { EnvironmentService, FlightSearchService, HomePageService, searchBoxFlights, searchFlightModel } from 'rp-travel-ui';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-top-destination',
  templateUrl: './top-destination.component.html',
  styleUrls: ['./top-destination.component.scss']
})
export class TopDestinationComponent implements OnInit {
  translate = inject(TranslateService);
  flightSearch = inject(FlightSearchService);
  homePageService = inject(HomePageService);
  sharedService = inject(SharedService)
  router = inject(Router);
  cards:Array<destinationCard>=[];
  currency?:string;
  date?:object;
  @Input() destinationView?: boolean;
  constructor({ nativeElement }: ElementRef<HTMLImageElement>, private datePipe: DatePipe) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }

  ngOnInit(): void {
    this.sharedService.getTopDestination().subscribe((res:any)=>{
      this.cards = res;
    })
    
  }
  gotoSearchResult(card:destinationCard){
    const currentDate = new Date();//get current Date 
    currentDate.setDate(currentDate.getDate() + 7); //Add 7 days after current date

    this.flightSearch.changeFlightType('OneWay');//set Flight Type To Oneway
    //make the Flight Array totaly empty then add the flight from Kuwait to the selected destination
    this.flightSearch.flightsArray.clear();
    (<FormArray>this.flightSearch.searchFlight.get('Flights')).push(
      new FormGroup({
        departing:new FormControl('Kuwait,KWI'),
        landing:new FormControl(`${card.distination},${card.airportCode}`),
        departingD:new FormControl(currentDate.toDateString())
      })
    );
    this.currency = this.homePageService.selectedCurrency.Currency_Code; 
    let resultLink=this.flightSearch.getSearchresultLink(this.translate.currentLang,this.currency,this.translate.currentLang,1,',');
    let splittedLink = resultLink.toString().split('/');
    //Navigate To SearchResult
    if(resultLink){
      this.router.navigate([
        '/flightResult',
        splittedLink[0],
        splittedLink[1],
        splittedLink[2],
        splittedLink[3],
        splittedLink[4],
        splittedLink[5],
        splittedLink[6],
        splittedLink[7],
        splittedLink[8],
      ]);
      localStorage.setItem('form',JSON.stringify(this.flightSearch.searchFlight.value))
    }
  }
}
