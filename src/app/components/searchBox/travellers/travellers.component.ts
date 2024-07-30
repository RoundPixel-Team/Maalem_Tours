import { Component, OnInit, inject } from '@angular/core';
import { FlightSearchService } from 'rp-travel-ui';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.scss'],
})
export class TravellersComponent implements OnInit {
  //#region variables
  searchbox = inject(FlightSearchService);
  translate = inject(TranslateService);
  selectedValue?: string;
  adultValid:boolean=true;
  childValid:boolean=true;
  infantValid:boolean=true;
  classes: string[] = ['Economy', 'Business', 'First'];
  //#endregion
  constructor() {}

  ngOnInit(): void {}

  changeAdultValue(action:string){
    if(this.searchbox.searchFlight?.get('passengers.adults')?.value >= 9){
      if (action =='increase'){
        this.searchbox.searchFlight?.get('passengers.adults')?.setValue(9)
        this.adultValid =false;
      }
      else{
        this.searchbox.searchFlight?.get('passengers.adults')?.setValue(this.searchbox.searchFlight?.get('passengers.adults')?.value-1)
        this.adultValid =true;
      }
    }
    else if(this.searchbox.searchFlight?.get('passengers.adults')?.value <= 1){
      if(action =='increase'){
        this.searchbox.searchFlight?.get('passengers.adults')?.setValue(this.searchbox.searchFlight?.get('passengers.adults')?.value+1)
        this.adultValid = true;
      }
      else{
        this.searchbox.searchFlight?.get('passengers.adults')?.setValue(1)
      }
    }
    else{
      this.adultValid =true;
      if(action =='increase'){
        this.searchbox.searchFlight?.get('passengers.adults')?.setValue(this.searchbox.searchFlight?.get('passengers.adults')?.value+1)
      }
      else{
        this.searchbox.searchFlight?.get('passengers.adults')?.setValue(this.searchbox.searchFlight?.get('passengers.adults')?.value-1)
      }
    }
  }
  changeChildValue(action:string){
    if(action == 'increase'){
      this.searchbox.searchFlight?.get('passengers.child')?.setValue(this.searchbox.searchFlight?.get('passengers.child')?.value+1)
      this.childValid = true;
      if(this.searchbox.searchFlight?.get('passengers.child')?.value >= 8){
        this.searchbox.searchFlight?.get('passengers.child')?.setValue(8);
        this.childValid = false;
      }
    }
    else{
      this.searchbox.searchFlight?.get('passengers.child')?.setValue(this.searchbox.searchFlight?.get('passengers.child')?.value-1)
      this.childValid = true;
      if(this.searchbox.searchFlight?.get('passengers.child')?.value <=0){
        this.searchbox.searchFlight?.get('passengers.child')?.setValue(0);
        this.childValid = true;
      }
    }
  }
  changeInfantValue(action:string){
    let adultValue = this.searchbox.searchFlight?.get('passengers.adults')?.value;
    if(action == 'increase'){
      this.searchbox.searchFlight?.get('passengers.infant')?.setValue(this.searchbox.searchFlight?.get('passengers.infant')?.value+1)
      this.infantValid = true;
      let infantValue = this.searchbox.searchFlight?.get('passengers.infant')?.value;
      if(infantValue > 4){
        this.searchbox.searchFlight?.get('passengers.infant')?.setValue(4);
        this.infantValid = false;
      }
      if(infantValue > adultValue){
        this.searchbox.searchFlight?.get('passengers.infant')?.setValue(adultValue);
        this.infantValid = false;
      }
    }
    else{
      this.searchbox.searchFlight?.get('passengers.infant')?.setValue(this.searchbox.searchFlight?.get('passengers.infant')?.value-1)
      this.infantValid = false;
      if(this.searchbox.searchFlight?.get('passengers.infant')?.value <=0){
        this.searchbox.searchFlight?.get('passengers.infant')?.setValue(0);
        this.infantValid = true;
      }
    }
  }
}
