import { Component, OnInit } from '@angular/core';
import { inject, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FlightSearchService } from 'rp-travel-ui';

@Component({
  selector: 'app-searchbox-mobile',
  templateUrl: './searchbox-mobile.component.html',
  styleUrls: ['./searchbox-mobile.component.scss'],
})
export class SearchboxMobileComponent implements OnInit {
  searchbox = inject(FlightSearchService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  public screenWidth: number = 650;
  flightIndex: number = 0;
  flightType?: string;
  hoveredDate: NgbDate | null = null;
  fromDate?: NgbDate;
  startDateValue: any;
  toDate: NgbDate | null = null;
  showPicker: boolean = true;

  constructor(public calendar: NgbCalendar) {
    if(this.searchbox.flightsArray?.at(0).get('departingD')?.value){
      this.fromDate = calendar.getToday()
      this.fromDate.year = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getFullYear()
      this.fromDate.month = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getMonth()+1
      this.fromDate.day = new Date(this.searchbox.flightsArray.at(0).get('departingD')?.value).getDate()

      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
      this.toDate.year = new Date(this.searchbox.searchFlight.get('returnDate')?.value).getFullYear()
      this.toDate.month = new Date(this.searchbox.searchFlight.get('returnDate')?.value).getMonth() + 1
      this.toDate.day = new Date(this.searchbox.searchFlight.get('returnDate')?.value).getDate();
    }
    else{
      this.fromDate = calendar.getToday()
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.flightType = this.searchbox.searchFlight.get('flightType')?.value;
    this.route.paramMap.subscribe((params) => {
      let param = params.get('index');
      this.flightIndex = Number(param);
    });
    this.retStartDate();
  }
  retStartDate() {
    let day = 0;
    let month = 0;
    let year = 0;
    if (this.searchbox.flightsArray?.at(this.flightIndex).get('departingD')?.valid) {
      year = new Date(this.searchbox.flightsArray?.at(this.flightIndex).get('departingD')?.value).getFullYear();
      month = new Date(this.searchbox.flightsArray?.at(this.flightIndex).get('departingD')?.value).getMonth(); 
      day = new Date(this.searchbox.flightsArray?.at(this.flightIndex).get('departingD')?.value).getDate() 

      this.startDateValue = { year: year, month: month+1, day: day };
    } else {
      this.startDateValue = this.calendar.getToday();
    }    
    return this.startDateValue;
  }
  backToSearchBox() {
    this.router.navigate(['/']);
  }
  confirmDate() {
    //update local storage after setting the date **Very important**
    localStorage.setItem(
      'form',
      JSON.stringify(this.searchbox.searchFlight.value)
    );
    this.backToSearchBox();
  }
  //update date value from form Array
  onDateSelection(date: NgbDate) {
    this.searchbox.flightsArray.at(this.flightIndex)?.get('departingD')?.setValue(new Date(date.year, date.month - 1, date.day));
  }
  onDateSelectionRound(date: NgbDate) {    
    if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)){
			this.toDate = date;
      this.searchbox.searchFlight.get('returnDate')?.setValue(new Date(this.toDate?.year, this.toDate?.month-1, this.toDate?.day));
		} else {
      this.toDate = null;
			this.fromDate = date;  
		}
    this.searchbox.flightsArray.at(0).get('departingD')?.setValue(new Date(this.fromDate?.year, this.fromDate?.month - 1, this.fromDate?.day));
    
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
  isHoveredR(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
  }
  isInsideR(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }
  isRangeR(date: NgbDate) {
    return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInsideR(date) ||
			this.isHoveredR(date)
		);
  }
  showDatePicker() {
    this.showPicker = true;
  }
  showTravellers() {
    this.showPicker = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
