import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FlightCheckoutService } from 'rp-travel-ui';
import { Location } from '@angular/common'

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss']
})
export class BookNowComponent implements OnInit {

  public flight = inject(FlightCheckoutService)
  public translate = inject(TranslateService)

  @Output() checkoutSteps = new EventEmitter<number>();
  
  constructor(private location: Location) { }

  ngOnInit(): void {
  } 


  goToNextStep(bookingType:string){
    this.flight.bookingType=bookingType;
    if(bookingType == 'premium' && this.flight.recommendedOfflineService && this.flight.usersArray.at(0).get('email')?.status == 'VALID' && this.flight.usersArray.at(0).get('phoneNumber')?.status == 'VALID'  ){
      this.flight.selectedOfflineServices.push(this.flight.recommendedOfflineService?.serviceCode)
    }else{
      let index = this.flight.selectedOfflineServices.findIndex((s)=>{return s == this.flight.recommendedOfflineService?.serviceCode})
      if(index != -1){
        this.flight.selectedOfflineServices.splice(index,1)
      }
    }
    if(this.flight.usersArray.at(0).get('email')?.status == 'INVALID' || this.flight.usersArray.at(0).get('phoneNumber')?.status == 'INVALID'){
      this.flight.usersArray.at(0).get('email')?.markAsTouched()
      this.flight.usersArray.at(0).get('phoneNumber')?.markAsTouched()
      this.checkoutSteps.emit(-1)
    }else{
      this.location.go('/checkout/step2');
      this.checkoutSteps.emit(2)
    }
    
  }

}
