import { Component, OnInit, inject } from '@angular/core';
import { FlightSearchService, airPorts } from 'rp-travel-ui';
import { flightType } from './interfaces/interfaces';

@Component({
  selector: 'app-searchBox',
  templateUrl: './searchBox.component.html',
  styleUrls: ['./searchBox.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  //#region variables
  public flightSearch = inject(FlightSearchService);
  flightTypes: Array<flightType> = [
    { type: 'OneWay', label: 'One-way' },
    { type: 'RoundTrip', label: 'Round-trip' },
    { type: 'MultiCity', label: 'Multi-city' },
  ];
  //#endregion

  constructor() {}

  ngOnInit() {
    //Get local storage Form
    let form = JSON.parse(localStorage.getItem('form') as string);
    //check if local storage have value
    if(form){
      let cityPattern = form.Flights[0].departing
      let pattern = /,/;
      //check pattern of depart and land cities if it does'nt match remove th form from local storage
      if(!pattern.test(cityPattern)){
        localStorage.removeItem("form");
      }
    }
    this.flightSearch.initSearchForm(form);
  }
  //select flight type from HTML and set value to searchFlight form
  selectFlightType(flightType: string) {
    this.flightSearch.changeFlightType(flightType);
  }
}