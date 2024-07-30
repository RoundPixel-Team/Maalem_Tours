import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  AlertMsgModel,
  FlightSearchService,
  HomePageService,
} from 'rp-travel-ui';
import { SharedService } from 'src/app/shared/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-one-way',
  templateUrl: './one-way.component.html',
  styleUrls: ['./one-way.component.scss'],
})
export class OneWayComponent implements OnInit {
  //#region variables
  searchbox = inject(FlightSearchService);
  homePageService = inject(HomePageService);
  translate = inject(TranslateService);
  sharedService = inject(SharedService);
  router = inject(Router);

  public screenWidth: number = 650;

  showDatePicker: boolean = true;
  lang: string = 'en';
  startDateValue:any;
  endDateValue: Date = new Date(2023, 9, 30);
  currency?: string;
  resultLink?:| string| {
        adult: AlertMsgModel;
        child: AlertMsgModel;
        infant: AlertMsgModel;
        retDate: AlertMsgModel;
        depDate: AlertMsgModel;};
  //#endregion
  constructor(public calendar :NgbCalendar) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  isHovered(date: NgbDate) {
		return (
			this.startDateValue && date.after(this.startDateValue) && date.before(this.startDateValue)
		);
	}

	isInside(date: NgbDate) {  
		return date.after(this.startDateValue) && date.before(this.startDateValue);
	}
	isRange(date: NgbDate) {
		return (
			date.equals(this.startDateValue) ||
			(this.startDateValue && date.equals(this.startDateValue)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
  retStartDate(index:number){
    let day = 0;
    let month = 0;
    let year = 0;
    if(this.searchbox.flightsArray.at(index).get('departingD')?.value != null){
      year = new Date(this.searchbox.flightsArray.at(index).get('departingD')?.value).getFullYear()
      month = new Date(this.searchbox.flightsArray.at(index).get('departingD')?.value).getMonth() + 1
      day = Number(this.searchbox.flightsArray.at(index).get('departingD')?.value.toString().split(' ')[2])
  
      return this.startDateValue =  { year: year, month: month, day: day }
    }
    else{
      this.searchbox.flightsArray.at(index).get('departingD')?.setValue(this.calendar.getToday())
      return this.startDateValue  =this.calendar.getToday();
    }
  }
  showDate() {
    this.showDatePicker = true;
  }
  showMobileDate(index: number) {
    this.router.navigate([`/searchboxMob/${index}`]);
  }
  showTravellers() {
    this.showDatePicker = false;
  }
  //get total Passengers
  getTotalPassenger() {
    let adult = this.searchbox.searchFlight?.get('passengers.adults')?.value;
    let child = this.searchbox.searchFlight?.get('passengers.child')?.value;
    let infant = this.searchbox.searchFlight?.get('passengers.infant')?.value;
    return this.searchbox.getTotalPassengers(adult, child, infant);
  }
  //update date value from form Array
  onDateSelection(date: NgbDate) {
    this.searchbox.flightsArray
      .at(0)
      .get('departingD')
      ?.setValue(new Date(date.year, date.month - 1, date.day));
      console.log("DATEEEEE", this.searchbox.searchFlight.controls['Flights'].value);
      this.showDatePicker = false;
  }
  submit() {
    this.lang = this.translate.currentLang != null ?this.translate.currentLang : 'en'; //get language
    this.currency = this.homePageService.selectedCurrency.Currency_Code; //get currency from homepage service
    this.resultLink = this.searchbox.onSubmit(
      this.lang,
      this.currency,
      this.lang,
      1,
      ','
    ); //call submit function from searchbox service
    
    let splittedLink = this.resultLink.toString().split('/');
    if (typeof this.resultLink == 'object') {
      //loop on resultLink object which have returned messages of unvalid inputs
      Object.entries(this.resultLink).forEach(([key, value], index) => {
        if (this.lang == 'en') {
          if(value.enMsg != ''){
            this.tinyAlert(value.enMsg);
          }
        } else {
          if(value.arMsg != ''){
            this.tinyAlert(value.arMsg);
          }
        }
      });
      this.searchbox.searchFlight.updateValueAndValidity();
    } else if (typeof this.resultLink == 'string' && this.resultLink != '') {
      // set land city from share service
      this.sharedService.landCity =((<FormArray>this.searchbox.searchFlight?.get('Flights')).at(0).get('landing')?.value).split(',')[0];
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
      localStorage.setItem('form',JSON.stringify(this.searchbox.searchFlight.value))
    }
  }

  tinyAlert(message: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
