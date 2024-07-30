import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FlightCheckoutService, HomePageService } from 'rp-travel-ui';
import { SharedService } from 'src/app/shared/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent implements OnInit {

  public flight = inject(FlightCheckoutService)
  public translate = inject(TranslateService)
  public home = inject(HomePageService)
  public shareService = inject(SharedService)

  todayDate = new Date();
  minAdultDateBirth = new Date(1990, 0, 1)
  minChildDateBirth = new Date(2010, 0, 1)
  minInfantDateBirth = new Date(2020, 0, 1)
  passengerCompleted: boolean[]=[];
  step:number = 0;
  @Output() fareBreakup = new EventEmitter<boolean>();

  constructor() { 
   
  }

  ngOnInit(): void {
    console.log(this.flight.bookingType,'show booking type');
    console.log(this.flight.priceWithRecommenedService,'show price');
    for(let i=0;i< this.flight.usersArray.length;i++){
      
      if(i===0){
        this.passengerCompleted.push(true);
      }else{
        this.passengerCompleted.push(false);
      }
    }
    this.flight.usersArray.valueChanges.subscribe(()=>{
      this.initializePassengerCompletion()
    })
    
  }
  
setStep(index:number){
  this.step=index;
}
  initializePassengerCompletion() {
    for(let i=0;i< this.flight.usersArray.length;i++){
      if(this.flight.usersArray.at(i).status==='VALID'){
        for(let passenger=0;passenger < this.passengerCompleted.length;passenger++){
          if(passenger===i){
            if(i === this.passengerCompleted.length){
              this.passengerCompleted[i]=true
            }else{
              
              this.passengerCompleted[i+1]=true
              this.passengerCompleted[i]=false


              
            }
           

          }else{
            this.passengerCompleted[i]=false

          }
        }
      }
    }
      
      
 
    
    
  }
  
  assignGenderToUser(index:number,value:string){
    this.flight.usersArray.at(index).get('title')?.setValue(value)
  }

  assignCountries(event:any,index:number){
    this.flight.usersArray.at(index).get('countryOfResidence')?.setValue(event.option.value)
    this.flight.usersArray.at(index).get('nationality')?.setValue(event.option.value)
  }

  openFareBreakUp(){
    this.fareBreakup.emit(true)
  }

  saveBooking(){
    console.log("show me the form",this.flight.usersArray)
    if(this.flight.usersArray.invalid){
      for(var i = 0; i < this.flight.usersArray.length ; i++){
        this.flight.usersArray.at(i).markAllAsTouched()
      }

      document.getElementById('passengersFormSection')!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      if (this.translate.currentLang=='en'){
        this.Payerror('Oops..','Passengers data are not completed');
      }else{
        this.Payerror('عذرا..','بيانات المسافرين ليست مكتملة');
      }
      
    }
    else{
      this.flight.saveBooking(this.home.selectedCurrency.Currency_Code,'notPremium',this.flight.pcc)
    }
    
  }
Payerror(title:string,message:string){
  Swal.fire({
    icon: 'error',
    title: title,
    text: message,
  });
}
}
