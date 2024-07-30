import { Component, HostListener, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertMsgModel, FlightSearchService, HomePageService } from 'rp-travel-ui';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormArray } from '@angular/forms';
@Component({
  selector: 'app-round-trip',
  templateUrl: './round-trip.component.html',
  styleUrls: ['./round-trip.component.scss'],
})
export class RoundTripComponent implements OnInit {
  //#region variables
  searchbox = inject(FlightSearchService);
  homePageService = inject(HomePageService);
  translate = inject(TranslateService);
  sharedService = inject(SharedService)
  router = inject(Router)

  public screenWidth: number= 650;

  showDatePicker:boolean = true;
  hoveredDate: NgbDate | null = null;
	fromDate!: NgbDate;
	toDate: NgbDate | null = null;
  startDateValue:any;
  endDateValue:any;
  lang:string='en';
  count:number = 0;
  currency?: string;
  resultLink?:string | { adult: AlertMsgModel; child: AlertMsgModel; infant: AlertMsgModel; retDate: AlertMsgModel; depDate: AlertMsgModel; };
  
//#endregion
	constructor(public calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {

    if(this.searchbox.flightsArray.at(0).get('departingD')?.value){
      this.fromDate = calendar.getToday()
      this.fromDate.year = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getFullYear()
      this.fromDate.month = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getMonth() + 1
      this.fromDate.day = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getDate()
      // this.fromDate.day = Number(this.searchbox.flightsArray.at(0).get('departingD')?.value.toString().split(' ')[2])
      

      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
      this.toDate.year = new Date(this.searchbox.searchFlight.get('returnDate')?.value).getFullYear()
      this.toDate.month = new Date(this.searchbox.searchFlight.get('returnDate')?.value).getMonth() + 1
      this.toDate.day = new Date(this.searchbox.searchFlight.get('returnDate')?.value).getDate()

    }
    else{
      this.fromDate = calendar.getToday()
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }
    
	}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth; 
    let day = 0;
    let month = 0;
    let year = 0;
    year = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getFullYear()
    month = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getMonth() + 1
    day = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getDate()
    this.startDateValue =  { year: year, month: month, day: day }
  }
   //update date value from form Array
   onDateSelection(date: NgbDate) {
    this.count++
    if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
      this.searchbox.searchFlight.get('returnDate')?.setValue(new Date(this.toDate?.year, this.toDate?.month -1, this.toDate?.day));
		} else {
      this.toDate = null;
			this.fromDate = date;  
		}
    this.searchbox.flightsArray.at(0).get('departingD')?.setValue(new Date(this.fromDate?.year, this.fromDate?.month - 1, this.fromDate?.day));
    
    if(this.count==2){
      this.showDatePicker = false;
      this.count=0;
    }
    
  }
  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {  
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
  showDate(){
    this.showDatePicker = true;
  }
  showMobileDate(index:number){
    this.router.navigate([`/searchboxMob/${index}`])
  }
  showTravellers(){
    this.showDatePicker = false;
  }
  //get total Passengers
  getTotalPassenger(){
    let adult = this.searchbox.searchFlight?.get('passengers.adults')?.value;
    let child = this.searchbox.searchFlight?.get('passengers.child')?.value;
    let infant = this.searchbox.searchFlight?.get('passengers.infant')?.value;
    return this.searchbox.getTotalPassengers(adult,child,infant);
  }
  submit() {    
  this.lang = this.translate.currentLang != null ?this.translate.currentLang : 'en'; //get language
    this.currency = this.homePageService.selectedCurrency.Currency_Code; //get currency from homepage service
    this.resultLink = this.searchbox.onSubmit(this.lang,this.currency,this.lang,1,','); //call submit function from searchbox service
    let splittedLink = this.resultLink.toString().split('/');
    
    if (typeof this.resultLink == 'object') {
      //loop on resultLink object which have returned messages of unvalid inputs
      Object.entries(this.resultLink).forEach(([key, value], index) => {
        if(value.enMsg){          
          if (this.lang == 'en') {
            this.tinyAlert(value.enMsg);
          } else {
            this.tinyAlert(value.arMsg);
          }
        }
      });
      this.searchbox.searchFlight.updateValueAndValidity();
    } 
    else if (typeof this.resultLink == 'string' && this.resultLink) {
      if(this.searchbox.searchFlight.valid){
        localStorage.setItem('form',JSON.stringify(this.searchbox.searchFlight.value))
        // set land city from share service
        this.sharedService.landCity =((<FormArray>this.searchbox.searchFlight?.get('Flights')).at(0).get('landing')?.value).split(',')[0];
        this.router.navigate([
          '/flightResult', splittedLink[0], splittedLink[1], splittedLink[2], splittedLink[3], splittedLink[4], splittedLink[5], splittedLink[6], splittedLink[7], splittedLink[8],]);
      }
      else{
        this.searchbox.searchFlight.markAllAsTouched();
      }
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
