import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FlightCheckoutService } from 'rp-travel-ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fare-breakup',
  templateUrl: './fare-breakup.component.html',
  styleUrls: ['./fare-breakup.component.scss']
})
export class FareBreakupComponent implements OnInit{
  public flight = inject(FlightCheckoutService)
  private router = inject(Router)
  totalServicePrice:number=0;
  constructor() { }

  ngOnInit(): void {
 
    this.flight.selectedOfflineServices.forEach((selectedServiceCode)=>{
      let selectedService = this.flight.allOfflineServices.find((service) => service.serviceCode === selectedServiceCode);
      if (selectedService) {
        this.handleNavigation();
        this.totalServicePrice =this.totalServicePrice+ selectedService.servicePrice;

      }
      
    });
  
  }
  handleNavigation(){
    window.addEventListener('popstate', () => {
      this.resetTotalPrice();
    });
  }
 
 resetTotalPrice(){
  let index = this.flight.selectedOfflineServices.findIndex((s)=>{return s == this.flight.recommendedOfflineService?.serviceCode})
  if(index != -1){
    this.flight.selectedOfflineServices.splice(index,1)
  } }

}
