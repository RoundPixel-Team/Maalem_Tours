import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class FlightSearchService {
    //#endregion
    constructor(datePipe) {
        this.datePipe = datePipe;
        this.subscription = new Subscription();
        //#region Variablses
        this.searchFlight = new FormGroup({});
        this.passengerAlert = {
            arMsg: '',
            enMsg: '',
        };
        this.flightAlert = {
            arMsg: '',
            enMsg: '',
        };
        this.removeFlightAlert = {
            arMsg: '',
            enMsg: '',
        };
        this.dateAlert = {
            arMsg: '',
            enMsg: '',
        };
        this.retDateAlert = {
            arMsg: '',
            enMsg: '',
        };
        this.validMultiDateAlert = {
            arMsg: '',
            enMsg: '',
        };
    }
    /**
     * this function is responsible to fill the searchbox form from local storage if it has a previous data
     */
    initSearchForm(form) {
        if (form) {
            this.flightType = form.flightType;
            //get the flight type based
            if (this.flightType == 'OneWay' || this.flightType == 'oneway' || this.flightType == 'oneWay') {
                this.oneWayData(form);
            }
            else if (this.flightType == 'RoundTrip' ||
                this.flightType == 'roundTrip' ||
                this.flightType == 'roundtrip') {
                this.roundTripData(form);
            }
            else if (this.flightType == 'MultiCity' ||
                this.flightType == 'multiCity' ||
                this.flightType == 'multicity') {
                this.multiData(form);
            }
        }
        //no values on local storage 
        else {
            this.searchFlight = new FormGroup({
                flightType: new FormControl('RoundTrip', [Validators.required]),
                Direct: new FormControl(false, [Validators.required]),
                Flights: new FormArray([], [Validators.required]),
                returnDate: new FormControl(''),
                passengers: new FormGroup({
                    adults: new FormControl(1, [
                        Validators.required,
                        Validators.min(1),
                    ]),
                    child: new FormControl(0, [Validators.required, Validators.min(0)]),
                    infant: new FormControl(0, [
                        Validators.required,
                        Validators.max(4),
                        Validators.min(0),
                    ]),
                }, []),
                class: new FormControl('Economy', [Validators.required]),
            });
            //Intialize Empty Flight
            this.searchFlight.get('Flights').push(new FormGroup({
                departing: new FormControl('', [
                    Validators.required,
                ]),
                landing: new FormControl('', [
                    Validators.required,
                ]),
                departingD: new FormControl('', [
                    Validators.required,
                ]),
            }));
        }
    }
    /**
     * this function is responsible to fill the oneway searchbox data from data storage
     */
    oneWayData(localForm) {
        //fill the form with data from local storage
        this.searchFlight = new FormGroup({
            flightType: new FormControl(localForm['flightType'], [
                Validators.required,
            ]),
            Direct: new FormControl(localForm['Direct'], [Validators.required]),
            Flights: new FormArray([], [Validators.required]),
            returnDate: new FormControl(''),
            passengers: new FormGroup({
                adults: new FormControl(localForm['passengers']['adults'], [
                    Validators.required,
                    Validators.min(1),
                ]),
                child: new FormControl(localForm['passengers']['child'], [
                    Validators.required,
                    Validators.min(0),
                ]),
                infant: new FormControl(localForm['passengers']['infant'], [
                    Validators.required,
                    Validators.min(0),
                ]),
            }, []),
            class: new FormControl(localForm['class'], [Validators.required]),
        });
        //push the first Flight to the flights form array
        this.searchFlight.get('Flights').push(new FormGroup({
            departing: new FormControl(localForm.Flights[0].departing, [
                Validators.required,
            ]),
            landing: new FormControl(localForm.Flights[0].landing, [
                Validators.required,
            ]),
            departingD: new FormControl(localForm.Flights[0].departingD, [
                Validators.required,
            ]),
        }));
    }
    /**
     * this function is responsible to fill the roundTrip searchbox data from data storage
     */
    roundTripData(localForm) {
        //fill the form with data from local storage
        this.searchFlight = new FormGroup({
            flightType: new FormControl(localForm['flightType'], [
                Validators.required,
            ]),
            Direct: new FormControl(localForm['Direct'], [Validators.required]),
            Flights: new FormArray([], [Validators.required]),
            returnDate: new FormControl(localForm['returnDate'], [
                Validators.required,
            ]),
            passengers: new FormGroup({
                adults: new FormControl(localForm['passengers']['adults'], [
                    Validators.required,
                    Validators.min(1),
                ]),
                child: new FormControl(localForm['passengers']['child'], [
                    Validators.required,
                    Validators.min(0),
                ]),
                infant: new FormControl(localForm['passengers']['infant'], [
                    Validators.required,
                    Validators.min(0),
                ]),
            }, []),
            class: new FormControl(localForm['class'], [Validators.required]),
        });
        //push the first Flight to the flights form array
        this.searchFlight.get('Flights').push(new FormGroup({
            departing: new FormControl(localForm.Flights[0].departing, [
                Validators.required,
            ]),
            landing: new FormControl(localForm.Flights[0].landing, [
                Validators.required,
            ]),
            departingD: new FormControl(localForm.Flights[0].departingD, [
                Validators.required,
            ]),
        }));
        //change between depart and land cities and pushing it to flights array
        this.searchFlight.get('Flights').push(new FormGroup({
            departing: new FormControl(localForm.Flights[0].landing, [
                Validators.required,
            ]),
            landing: new FormControl(localForm.Flights[0].departing, [
                Validators.required,
            ]),
            departingD: new FormControl(localForm.returnDate, [
                Validators.required,
            ]),
        }));
    }
    /**
     * this function is responsible to fill the Multi City searchbox data from data storage
     */
    multiData(localForm) {
        this.searchFlight = new FormGroup({
            flightType: new FormControl(localForm['flightType'], [
                Validators.required,
            ]),
            Direct: new FormControl(localForm['Direct'], [Validators.required]),
            Flights: new FormArray([], [Validators.required]),
            returnDate: new FormControl(''),
            passengers: new FormGroup({
                adults: new FormControl(localForm['passengers']['adults'], [
                    Validators.required,
                    Validators.min(1),
                ]),
                child: new FormControl(localForm['passengers']['child'], [
                    Validators.required,
                    Validators.min(0),
                ]),
                infant: new FormControl(localForm['passengers']['infant'], [
                    Validators.required,
                    Validators.min(0),
                ]),
            }, []),
            class: new FormControl(localForm['class'], [Validators.required]),
        });
        //push all my flights to flights form array
        for (let i = 0; i < localForm.Flights?.length; i++) {
            this.searchFlight.get('Flights').push(new FormGroup({
                departing: new FormControl(localForm.Flights[i].departing, [
                    Validators.required,
                ]),
                landing: new FormControl(localForm.Flights[i].landing, [
                    Validators.required,
                ]),
                departingD: new FormControl(localForm.Flights[i].departingD, [
                    Validators.required,
                ]),
            }));
        }
    }
    /**
     * this function is responsible to update the flight Type
     * @param flightType (oneWay or roundTrip or multiCity)
     */
    changeFlightType(flightType) {
        this.searchFlight.controls['flightType'].setValue(flightType);
    }
    /**
     * this function is responsible to get flights form array
     */
    get flightsArray() {
        return this.searchFlight?.get('Flights');
    }
    /**
     * this function is responsible to add flight at multi city
     * @return object of string error message (flightAlert)
     */
    addFlight() {
        let len = this.flightsArray.length;
        if (len >= 4) {
            this.flightAlert.enMsg = "Maximum Flights Shouldn't be more than 4";
            this.flightAlert.arMsg = 'يجب ألا يزيد الحد الأقصى لعدد الرحلات عن 4';
            return this.flightAlert;
        }
        else {
            if (len > 1) {
                this.lastFlight = this.searchFlight.get('Flights').value[len - 1]['landing'];
            }
            this.searchFlight.get('Flights').push(new FormGroup({
                departing: new FormControl(this.lastFlight, [Validators.required]),
                landing: new FormControl('', [Validators.required]),
                departingD: new FormControl('', [Validators.required]),
            }));
            return this.flightAlert;
        }
    }
    /**
     * this function is responsible to remove flight from multi city
     * @return object of string error message (removeFlightAlert)
     */
    removeFlight() {
        let len = this.flightsArray.length;
        if (len > 1) {
            this.searchFlight.get('Flights').removeAt(len - 1);
            return this.removeFlightAlert;
        }
        else {
            this.removeFlightAlert.enMsg = "You Don't have any flights to remove";
            this.removeFlightAlert.arMsg = 'ليس لديك أي رحلات لإزالتها';
            return this.removeFlightAlert;
        }
    }
    /**
     * this function is responsible to get Total Number of passengers
     * @return object of string error message (passengerAlert)
     * if message is empty then the validation is true
     */
    getTotalPassengers(adult, child, infant) {
        return adult + child + infant;
    }
    /**
     * this function is responsible to change Value Of Adult passenger
     * @return object of string error message (passengerAlert)
     */
    changeAdultPassenger(num) {
        this.passengerAlert.arMsg = '';
        this.passengerAlert.enMsg = '';
        //get total number of passenger with new selected adult value
        let Total = this.getTotalPassengers(num, this.searchFlight?.get('passengers.child')?.value, this.searchFlight?.get('passengers.infant')?.value);
        if (num <= 9 && num != 0 && Total <= 9) {
            this.searchFlight?.get('passengers.adults')?.setValue(num);
            this.passengerAlert.arMsg = '';
            this.passengerAlert.enMsg = '';
            return this.passengerAlert;
        }
        else {
            this.passengerAlert.enMsg =
                'You Should Have at least 1 Adult Passenger and maximum number Of passenger Is 9';
            this.passengerAlert.arMsg =
                'يجب أن يكون لديك راكب بالغ واحد على الأقل وأن لا يزيد عدد الركاب عن 9';
            return this.passengerAlert;
        }
    }
    /**
     * this function is responsible to change Value Of child passenger
     * @return object of string error message (passengerAlert)
     * if message is empty then the validation is true
     */
    changeChildPassenger(num) {
        this.passengerAlert.arMsg = '';
        this.passengerAlert.enMsg = '';
        //get total number of passenger with new selected child value
        let Total = this.getTotalPassengers(this.searchFlight?.get('passengers.adults')?.value, num, this.searchFlight?.get('passengers.infant')?.value);
        if (num <= 9 && Total <= 9) {
            this.searchFlight?.get('passengers.child')?.setValue(num);
            this.passengerAlert.arMsg = '';
            this.passengerAlert.enMsg = '';
            return this.passengerAlert;
        }
        else {
            this.passengerAlert.enMsg = 'maximum number Of passenger Should Be 9';
            this.passengerAlert.arMsg = 'يجب أن يكون الحد الأقصى لعدد الركاب 9';
            return this.passengerAlert;
        }
    }
    /**
     * this function is responsible to change Value Of infant passenger
     * @return object of string error message (passengerAlert)
     * if message is empty then the validation is true
     */
    changeinfantPassenger(num) {
        this.passengerAlert.arMsg = '';
        this.passengerAlert.enMsg = '';
        let adultVal = this.searchFlight?.get('passengers.adults')?.value;
        //get total number of passenger with new selected infant value
        let Total = this.getTotalPassengers(adultVal, this.searchFlight?.get('passengers.child')?.value, num);
        if (num <= adultVal && Total <= 9) {
            this.searchFlight?.get('passengers.infant')?.setValue(num);
            this.passengerAlert.arMsg = '';
            this.passengerAlert.enMsg = '';
            return this.passengerAlert;
        }
        else {
            this.passengerAlert.enMsg =
                'infants number should be equal or less than Adults number and maximum number Of passenger Should Be 9';
            this.passengerAlert.arMsg =
                'يجب أن يكون عدد الأطفال الرضع مساوياً أو أقل من عدد البالغين والحد الأقصى لعدد الركاب يجب أن يكون 9';
            return this.passengerAlert;
        }
    }
    /**
     * this function is responsible to change Value Of Class Type
     * @params class value selected from list view
     */
    setClassValue(classVal) {
        this.searchFlight.controls['class'].setValue(classVal);
    }
    /**
     * this function is responsible to exchange between destinations
     * @params item which i want to exchange (from Type searchBoxFlights)
     */
    switchDestination(item) {
        let destination1 = item.get("landing")?.value;
        let destination2 = item.get("departing")?.value;
        item.get("departing")?.setValue(destination1);
        item.get("landing")?.setValue(destination2);
        item.updateValueAndValidity();
    }
    /**
     * this function is responsible to return current Date
     */
    todayDate() {
        let date = new Date();
        return date.toISOString().split('T')[0];
    }
    /**
   * this function is responsible to validate the Multi City searchbox Dates
   * @retuer string with alert message if it has error else return true
   */
    validateMultiCityDates() {
        if (this.flightsArray.length > 1) {
            for (let i = 0; i < this.flightsArray.length; i++) {
                //if the current date is the last one in array compare it with the previous one 
                if (i == this.flightsArray.length - 1) {
                    if (this.flightsArray.at(i)?.get('departingD')?.value < this.flightsArray.at(i - 1).get('departingD')?.value) {
                        this.validMultiDateAlert.enMsg = 'The First Flight should Have A date Before next Flight';
                        this.validMultiDateAlert.arMsg = 'يجب أن يكون للرحلة الأولى تاريخ قبل الرحلة التالية';
                    }
                    break;
                }
                else {
                    let nextDate = new Date(this.flightsArray.at(i + 1)?.get('departingD')?.value);
                    let currentDate = this.flightsArray.at(i).get('departingD')?.value;
                    //check if we have a next date with value Or not
                    if (nextDate == undefined || nextDate == null) {
                        break;
                    }
                    else {
                        //compare between current and next Date
                        if (nextDate.getTime() < currentDate.getTime()) {
                            this.validMultiDateAlert.enMsg = 'The First Flight should Have A date Before next Flight';
                            this.validMultiDateAlert.arMsg = 'يجب أن يكون للرحلة الأولى تاريخ قبل الرحلة التالية';
                            this.flightsArray.at(i + 1)?.get('departingD')?.setValue('');
                        }
                        else {
                            this.validMultiDateAlert.enMsg = 'True';
                            this.validMultiDateAlert.arMsg = 'True';
                        }
                    }
                }
            }
        }
        return this.validMultiDateAlert;
    }
    /**
     * this function is responsible to set the value of depart Date after validate it
     * @params depart date should be format as 2023-08-01
     * @params flightIndex number for
     * @retuen object with empty message if validation is true or object with error messages
     */
    setDepDate(depDate, flightIndex) {
        let date = new Date(depDate).toISOString().split('T')[0]; //making date as 2023-08-01 format to check the condition
        this.dateAlert.enMsg = '';
        this.dateAlert.arMsg = '';
        //check if date is previous than today or not
        if (date < this.todayDate()) {
            this.searchFlight?.get('Flights')
                .at(flightIndex)
                .get('departingD')
                ?.setValue(this.todayDate());
            this.dateAlert.enMsg = "You Shouldn't select a Previous Date";
            this.dateAlert.arMsg = 'لا يجب عليك تحديد تاريخ سابق';
        }
        else {
            //check if the return date equal to depart (when the user enters the return date first)
            if (this.searchFlight.controls['returnDate'].value == date) {
                this.dateAlert.enMsg =
                    'This Date Is Similar to Return date, You Should Select Another one';
                this.dateAlert.arMsg =
                    'هذا التاريخ مشابه لتاريخ العودة ، يجب عليك تحديد تاريخ آخر';
                this.searchFlight?.get('Flights')
                    .at(flightIndex)
                    .get('departingD')
                    ?.setValue(this.todayDate());
            }
            else {
                this.searchFlight?.get('Flights')
                    .at(flightIndex)
                    .get('departingD')
                    ?.setValue(depDate);
            }
        }
        return this.dateAlert;
    }
    /**
     * this function is responsible to set the value of Return Date after validate it
     * @params Return date should be format as 2023-08-01
     * @retuen object with empty message if validation is true or object with error messages
     */
    setRetDate(retDate) {
        this.retDateAlert.enMsg = '';
        this.retDateAlert.arMsg = '';
        if (retDate) {
            let depDate = this.searchFlight?.get('Flights')
                .at(0)
                ?.get('departingD')?.value;
            //check if date is previous than today
            if (retDate <= this.todayDate()) {
                this.retDateAlert.enMsg = 'You Should select a date after this day';
                this.retDateAlert.arMsg = 'يجب عليك تحديد تاريخ بعد هذا اليوم';
            }
            //check of date is is previous than depart date
            else if (retDate < depDate) {
                this.retDateAlert.enMsg =
                    'You Should Select a date After your Depart Date';
                this.retDateAlert.arMsg =
                    'يجب عليك تحديد تاريخ بعد تاريخ المغادرة الخاص بك';
            }
            //if all validation is true then go to else condition
            else {
                this.searchFlight.controls['returnDate'].setValue(retDate);
            }
        }
        else {
            this.retDateAlert.enMsg = 'You Should Select a return Date';
            this.retDateAlert.arMsg = 'يجب عليك تحديد تاريخ العودة';
        }
        return this.retDateAlert;
    }
    /**
     * this function is responsible to set the second flight of flights array if the flight type is roundtrip
     */
    setRetFlight() {
        if (this.flightsArray.length == 1)
            this.searchFlight.get('Flights').push(new FormGroup({
                departing: new FormControl(this.flightsArray.at(0).get('landing')?.value, [
                    Validators.required,
                ]),
                landing: new FormControl(this.flightsArray.at(0).get('departing')?.value, [
                    Validators.required,
                ]),
                departingD: new FormControl(this.searchFlight.get('returnDate')?.value),
            }));
    }
    /**
     * this function is responsible to generate Search Id
     */
    id() {
        let date = new Date();
        let myId = date.getFullYear() +
            'B' +
            date.getUTCMonth() +
            'I' +
            date.getUTCDay() +
            'S' +
            date.getMilliseconds() +
            'H' +
            Math.floor(Math.random() * (9 - 0 + 1)) +
            0 +
            'B' +
            Math.floor(Math.random() * (9 - 0 + 1)) +
            0 +
            'I' +
            Math.floor(Math.random() * (9 - 0 + 1)) +
            0 +
            'S' +
            Math.floor(Math.random() * (9 - 0 + 1)) +
            0 +
            'H' +
            Math.floor(Math.random() * (9 - 0 + 1)) +
            0 +
            'I' +
            Math.floor(Math.random() * (9 - 0 + 1)) +
            0;
        return myId;
    }
    /**
     * this function is responsible to split the airport code from Depart Or Land input
     * @params spiltIndex with index hav the airport code (0 or 1)
     * @params splitPattern pattern used to split the airport string and get separate code alone
     * @params airport whicj selected from depart or land airports Input
     * @retuen airport code
     */
    getAirportCode(spiltIndex, splitPattern, airport) {
        let airportCode = airport.split(splitPattern)[spiltIndex];
        return airportCode;
    }
    /**
     * match Flights form array values with FlightInfoModule
     */
    getFlightInfo(spiltIndex, splitPattern) {
        let flightout = [];
        //if flight type is round trip return array of two flights with depart city, land city and depart date
        if (this.searchFlight.get('flightType')?.value == 'RoundTrip') {
            const roundElement1 = this.searchFlight.get('Flights')
                .controls[0]; //first flight of RoundTrip
            var depart = this.getAirportCode(spiltIndex, splitPattern, roundElement1.value['departing']);
            var landing = this.getAirportCode(spiltIndex, splitPattern, roundElement1.value['landing']);
            let depFlight = {
                departing: depart,
                landing: landing,
                departingD: this.datePipe.transform(roundElement1.value['departingD'], 'MMMM dd, y'),
            };
            flightout.push(depFlight);
            //switch depart and land airport codes for the second flight and push it on flightout array
            let landFlight = {
                departing: landing,
                landing: depart,
                departingD: this.datePipe.transform(this.searchFlight.controls['returnDate'].value, 'MMMM dd, y'),
            };
            flightout.push(landFlight);
            return flightout;
        }
        //if flight type is oneWay Or Multi then loop on flights array length and push all the flights into flightout
        for (let index = 0; index < this.searchFlight.get('Flights').length; index++) {
            const element = this.searchFlight.get('Flights').controls[index];
            let flight = {
                departing: this.getAirportCode(spiltIndex, splitPattern, element.value['departing']),
                landing: this.getAirportCode(spiltIndex, splitPattern, element.value['landing']),
                departingD: this.datePipe.transform(element.value['departingD'], 'MMMM dd, y'),
            };
            flightout.push(flight);
        }
        return flightout;
    }
    /**
     * this function is responsible to return string of flights in KWI-CAI-March%2015%202019_ format
     */
    flightInfoFormatter(array) {
        let FlightsInfoArray = '';
        for (let element of array) {
            let fligt = element.departing +
                '-' +
                element.landing +
                '-' +
                element.departingD +
                '_';
            FlightsInfoArray = FlightsInfoArray + fligt;
        }
        return FlightsInfoArray.slice(0, -1);
    }
    /**
     * this function is responsible to convert array of passanger type number to A-1-C-0-I-0
     * @params passenger object with total numbers of adults,child and infants
     * @example 'en/KWD/EG/RoundTrip/KWI-CAI-August%2019,%202023_CAI-KWI-August%2031,%202023/2023B7I0S617H00B50I90S10H20I30/A-1-C-0-I-0/Economy/false'
     */
    passengerFormatter(passengerObj) {
        let passengersString;
        passengersString =
            'A-' +
                passengerObj.adults +
                '-C-' +
                passengerObj.child +
                '-I-' +
                passengerObj.infant;
        return passengersString;
    }
    /**
     * this function is responsible to return link to use it to navigate to search results with all data of search box
     */
    getSearchresultLink(lang, currency, pointOfSale, spiltIndex, splitPattern) {
        let flightList = this.getFlightInfo(spiltIndex, splitPattern);
        let searchApi = {
            lan: lang,
            currency: currency,
            pointOfReservation: pointOfSale,
            flightType: this.searchFlight.get('flightType')?.value,
            flightsInfo: this.flightInfoFormatter(flightList),
            passengers: this.passengerFormatter(this.searchFlight.get('passengers')?.value),
            Cclass: this.searchFlight.get('class')?.value,
            serachId: this.id(),
            showDirect: this.searchFlight.get('Direct')?.value,
            preferredAirLine: 'all',
        };
        this.resultLink = searchApi;
        return `${searchApi.lan}/${searchApi.currency}/${searchApi.pointOfReservation}/${searchApi.flightType}/${searchApi.flightsInfo}/${searchApi.serachId}/${searchApi.passengers}/${searchApi.Cclass}/${searchApi.showDirect}`;
    }
    onSubmit(lang, currency, pointOfSale, spiltIndex, splitPattern) {
        if (!this.searchFlight.value) {
            this.searchFlight.markAllAsTouched(); //used this function to make a red border around invalid inputs
            return '';
        }
        else {
            //call all functions validation for all passengers type and flight dates
            let adult = this.changeAdultPassenger(this.searchFlight?.get('passengers.adult')?.value);
            let child = this.changeChildPassenger(this.searchFlight?.get('passengers.child')?.value);
            let infant = this.changeinfantPassenger(this.searchFlight?.get('passengers.infant')?.value);
            var retDate = { arMsg: '', enMsg: '' };
            let depDate = this.setDepDate(this.searchFlight?.get('Flights').at(0)?.get('departingD')?.value, 0);
            if (this.searchFlight.controls['flightType']?.value == 'roundtrip' || this.searchFlight.controls['flightType']?.value == 'RoundTrip' || this.searchFlight.controls['flightType']?.value == 'roundTrip') {
                //set return date value
                retDate = this.setRetDate(this.searchFlight.controls['returnDate'].value);
                //change between depart and land cities and pushing it to flights array
                this.setRetFlight();
            }
            else if (this.searchFlight.controls['flightType']?.value == 'oneway' || this.searchFlight.controls['flightType']?.value == 'OneWay' || this.searchFlight.controls['flightType']?.value == 'oneWay') {
                if (this.flightsArray.length > 1) {
                    this.removeFlight();
                }
            }
            //If All Validations and conditions are true then save the form at local storage and go to search Results
            if (!adult.enMsg && !child.enMsg && !infant.enMsg && !depDate.enMsg && !retDate?.enMsg) {
                return this.getSearchresultLink(lang, currency, pointOfSale, spiltIndex, splitPattern);
            }
            else {
                return { adult, child, infant, retDate, depDate };
            }
        }
    }
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer() {
        this.subscription.unsubscribe();
    }
}
FlightSearchService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchService, deps: [{ token: i1.DatePipe }], target: i0.ɵɵFactoryTarget.Injectable });
FlightSearchService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.DatePipe }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpZ2h0LXNlYXJjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcnAtdHJhdmVsLXVpL3NyYy9saWIvZmxpZ2h0LXNlYXJjaC9zZXJ2aWNlcy9mbGlnaHQtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFVLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBYXBDLE1BQU0sT0FBTyxtQkFBbUI7SUFrQzlCLFlBQVk7SUFFWixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBbkN0QyxpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELG9CQUFvQjtRQUNwQixpQkFBWSxHQUFjLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBTTVDLG1CQUFjLEdBQWtCO1lBQzlCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBQ0YsZ0JBQVcsR0FBa0I7WUFDM0IsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixzQkFBaUIsR0FBa0I7WUFDakMsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRixjQUFTLEdBQWtCO1lBQ3pCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBQ0YsaUJBQVksR0FBa0I7WUFDNUIsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRix3QkFBbUIsR0FBa0I7WUFDbkMsS0FBSyxF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ImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7XHJcbiAgc2VhcmNoQm94RmxpZ2h0cyxcclxuICBzZWFyY2hCb3hNb2RlbCxcclxuICBzZWFyY2hCb3hQYXNzZW5nZXJzLFxyXG4gIHNlYXJjaEZsaWdodE1vZGVsLFxyXG59IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBBbGVydE1zZ01vZGVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxpZ2h0U2VhcmNoU2VydmljZSB7XHJcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcblxyXG4gIC8vI3JlZ2lvbiBWYXJpYWJsc2VzXHJcbiAgc2VhcmNoRmxpZ2h0OiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcclxuICBsb2NhbEZvcm0/OiBzZWFyY2hCb3hNb2RlbCB8IHVuZGVmaW5lZDsgLy91c2VkIHRvIGdldCBwcmV2aW91cyBzZWFyY2hib3ggZGF0YSBmcm9tIGxvY2FsIHN0b3JhZ2VcclxuICBmbGlnaHRUeXBlPzogc3RyaW5nOyAvL3VzZWQgdG8gc2F2ZSB2YWx1ZSBvZiBmbGlnaHQgdHlwZSBmcm9tIHBhcmFtdGVyIG9mIGluaXRTZWFyY2hGb3JtIGZ1bmN0aW9uXHJcbiAgcGFzc2VuZ2Vycz86IHNlYXJjaEJveFBhc3NlbmdlcnM7XHJcbiAgbGFzdEZsaWdodD86IHNlYXJjaEJveEZsaWdodHM7XHJcbiAgcmVzdWx0TGluaz86IHNlYXJjaEZsaWdodE1vZGVsO1xyXG4gIHBhc3NlbmdlckFsZXJ0OiBBbGVydE1zZ01vZGVsID0ge1xyXG4gICAgYXJNc2c6ICcnLFxyXG4gICAgZW5Nc2c6ICcnLFxyXG4gIH07XHJcbiAgZmxpZ2h0QWxlcnQ6IEFsZXJ0TXNnTW9kZWwgPSB7XHJcbiAgICBhck1zZzogJycsXHJcbiAgICBlbk1zZzogJycsXHJcbiAgfTtcclxuICByZW1vdmVGbGlnaHRBbGVydDogQWxlcnRNc2dNb2RlbCA9IHtcclxuICAgIGFyTXNnOiAnJyxcclxuICAgIGVuTXNnOiAnJyxcclxuICB9O1xyXG4gIGRhdGVBbGVydDogQWxlcnRNc2dNb2RlbCA9IHtcclxuICAgIGFyTXNnOiAnJyxcclxuICAgIGVuTXNnOiAnJyxcclxuICB9O1xyXG4gIHJldERhdGVBbGVydDogQWxlcnRNc2dNb2RlbCA9IHtcclxuICAgIGFyTXNnOiAnJyxcclxuICAgIGVuTXNnOiAnJyxcclxuICB9O1xyXG4gIHZhbGlkTXVsdGlEYXRlQWxlcnQ6IEFsZXJ0TXNnTW9kZWwgPSB7XHJcbiAgICBhck1zZzogJycsXHJcbiAgICBlbk1zZzogJycsXHJcbiAgfTtcclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUpIHt9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBmaWxsIHRoZSBzZWFyY2hib3ggZm9ybSBmcm9tIGxvY2FsIHN0b3JhZ2UgaWYgaXQgaGFzIGEgcHJldmlvdXMgZGF0YVxyXG4gICAqL1xyXG4gIGluaXRTZWFyY2hGb3JtKGZvcm06c2VhcmNoQm94TW9kZWwpIHtcclxuICAgIGlmIChmb3JtKSB7XHJcbiAgICAgIHRoaXMuZmxpZ2h0VHlwZSA9IGZvcm0uZmxpZ2h0VHlwZTtcclxuICAgICAgLy9nZXQgdGhlIGZsaWdodCB0eXBlIGJhc2VkXHJcbiAgICAgIGlmICh0aGlzLmZsaWdodFR5cGUgPT0gJ09uZVdheScgfHwgdGhpcy5mbGlnaHRUeXBlID09ICdvbmV3YXknIHx8IHRoaXMuZmxpZ2h0VHlwZSA9PSAnb25lV2F5Jykge1xyXG4gICAgICAgIHRoaXMub25lV2F5RGF0YShmb3JtKTtcclxuICAgICAgfVxyXG4gICAgICAgZWxzZSBpZiAoXHJcbiAgICAgICAgdGhpcy5mbGlnaHRUeXBlID09ICdSb3VuZFRyaXAnIHx8XHJcbiAgICAgICAgdGhpcy5mbGlnaHRUeXBlID09ICdyb3VuZFRyaXAnIHx8XHJcbiAgICAgICAgdGhpcy5mbGlnaHRUeXBlID09ICdyb3VuZHRyaXAnXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMucm91bmRUcmlwRGF0YShmb3JtKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKHRoaXMuZmxpZ2h0VHlwZSA9PSAnTXVsdGlDaXR5JyB8fFxyXG4gICAgICB0aGlzLmZsaWdodFR5cGUgPT0gJ211bHRpQ2l0eScgfHxcclxuICAgICAgdGhpcy5mbGlnaHRUeXBlID09ICdtdWx0aWNpdHknKSB7XHJcbiAgICAgICAgdGhpcy5tdWx0aURhdGEoZm9ybSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vbm8gdmFsdWVzIG9uIGxvY2FsIHN0b3JhZ2UgXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5zZWFyY2hGbGlnaHQgPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBmbGlnaHRUeXBlOiBuZXcgRm9ybUNvbnRyb2woJ1JvdW5kVHJpcCcsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgRGlyZWN0OiBuZXcgRm9ybUNvbnRyb2woZmFsc2UsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgRmxpZ2h0czogbmV3IEZvcm1BcnJheShbXSwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICByZXR1cm5EYXRlOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIHBhc3NlbmdlcnM6IG5ldyBGb3JtR3JvdXAoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGFkdWx0czogbmV3IEZvcm1Db250cm9sKDEsIFtcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluKDEpLFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgY2hpbGQ6IG5ldyBGb3JtQ29udHJvbCgwLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5taW4oMCldKSxcclxuICAgICAgICAgICAgaW5mYW50OiBuZXcgRm9ybUNvbnRyb2woMCwgW1xyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5tYXgoNCksXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW4oMCksXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgKSxcclxuICAgICAgICBjbGFzczogbmV3IEZvcm1Db250cm9sKCdFY29ub215JywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgfSk7XHJcbiAgICAgIC8vSW50aWFsaXplIEVtcHR5IEZsaWdodFxyXG4gICAgICAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodC5nZXQoJ0ZsaWdodHMnKSkucHVzaChcclxuICAgICAgICBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICAgIGRlcGFydGluZzogbmV3IEZvcm1Db250cm9sKCcnLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICBdKSxcclxuICAgICAgICAgIGxhbmRpbmc6IG5ldyBGb3JtQ29udHJvbCgnJywgW1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBkZXBhcnRpbmdEOiBuZXcgRm9ybUNvbnRyb2woJycsIFtcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgIF0pLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gZmlsbCB0aGUgb25ld2F5IHNlYXJjaGJveCBkYXRhIGZyb20gZGF0YSBzdG9yYWdlXHJcbiAgICovXHJcbiAgb25lV2F5RGF0YShsb2NhbEZvcm06IHNlYXJjaEJveE1vZGVsKSB7XHJcbiAgICAvL2ZpbGwgdGhlIGZvcm0gd2l0aCBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgdGhpcy5zZWFyY2hGbGlnaHQgPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgZmxpZ2h0VHlwZTogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsnZmxpZ2h0VHlwZSddLCBbXHJcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgXSksXHJcbiAgICAgIERpcmVjdDogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsnRGlyZWN0J10sIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIEZsaWdodHM6IG5ldyBGb3JtQXJyYXkoW10sIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIHJldHVybkRhdGU6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgIHBhc3NlbmdlcnM6IG5ldyBGb3JtR3JvdXAoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYWR1bHRzOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtWydwYXNzZW5nZXJzJ11bJ2FkdWx0cyddLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWluKDEpLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBjaGlsZDogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsncGFzc2VuZ2VycyddWydjaGlsZCddLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWluKDApLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBpbmZhbnQ6IG5ldyBGb3JtQ29udHJvbChsb2NhbEZvcm1bJ3Bhc3NlbmdlcnMnXVsnaW5mYW50J10sIFtcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5taW4oMCksXHJcbiAgICAgICAgICBdKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFtdXHJcbiAgICAgICksXHJcbiAgICAgIGNsYXNzOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtWydjbGFzcyddLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgfSk7XHJcbiAgICAvL3B1c2ggdGhlIGZpcnN0IEZsaWdodCB0byB0aGUgZmxpZ2h0cyBmb3JtIGFycmF5XHJcbiAgICAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodC5nZXQoJ0ZsaWdodHMnKSkucHVzaChcclxuICAgICAgbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgZGVwYXJ0aW5nOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtLkZsaWdodHNbMF0uZGVwYXJ0aW5nLCBbXHJcbiAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIGxhbmRpbmc6IG5ldyBGb3JtQ29udHJvbChsb2NhbEZvcm0uRmxpZ2h0c1swXS5sYW5kaW5nLCBbXHJcbiAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIGRlcGFydGluZ0Q6IG5ldyBGb3JtQ29udHJvbChsb2NhbEZvcm0uRmxpZ2h0c1swXS5kZXBhcnRpbmdELCBbXHJcbiAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBmaWxsIHRoZSByb3VuZFRyaXAgc2VhcmNoYm94IGRhdGEgZnJvbSBkYXRhIHN0b3JhZ2VcclxuICAgKi9cclxuICByb3VuZFRyaXBEYXRhKGxvY2FsRm9ybTogYW55KSB7XHJcbiAgICAvL2ZpbGwgdGhlIGZvcm0gd2l0aCBkYXRhIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgdGhpcy5zZWFyY2hGbGlnaHQgPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgZmxpZ2h0VHlwZTogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsnZmxpZ2h0VHlwZSddLCBbXHJcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgXSksXHJcbiAgICAgIERpcmVjdDogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsnRGlyZWN0J10sIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIEZsaWdodHM6IG5ldyBGb3JtQXJyYXkoW10sIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIHJldHVybkRhdGU6IG5ldyBGb3JtQ29udHJvbChsb2NhbEZvcm1bJ3JldHVybkRhdGUnXSwgW1xyXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgIF0pLFxyXG4gICAgICBwYXNzZW5nZXJzOiBuZXcgRm9ybUdyb3VwKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGFkdWx0czogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsncGFzc2VuZ2VycyddWydhZHVsdHMnXSwgW1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLm1pbigxKSxcclxuICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgY2hpbGQ6IG5ldyBGb3JtQ29udHJvbChsb2NhbEZvcm1bJ3Bhc3NlbmdlcnMnXVsnY2hpbGQnXSwgW1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLm1pbigwKSxcclxuICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgaW5mYW50OiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtWydwYXNzZW5nZXJzJ11bJ2luZmFudCddLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWluKDApLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBbXVxyXG4gICAgICApLFxyXG4gICAgICBjbGFzczogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsnY2xhc3MnXSwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgIH0pO1xyXG4gICAgLy9wdXNoIHRoZSBmaXJzdCBGbGlnaHQgdG8gdGhlIGZsaWdodHMgZm9ybSBhcnJheVxyXG4gICAgKDxGb3JtQXJyYXk+dGhpcy5zZWFyY2hGbGlnaHQuZ2V0KCdGbGlnaHRzJykpLnB1c2goXHJcbiAgICAgIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgIGRlcGFydGluZzogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybS5GbGlnaHRzWzBdLmRlcGFydGluZywgW1xyXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICBdKSxcclxuICAgICAgICBsYW5kaW5nOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtLkZsaWdodHNbMF0ubGFuZGluZywgW1xyXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICBdKSxcclxuICAgICAgICBkZXBhcnRpbmdEOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtLkZsaWdodHNbMF0uZGVwYXJ0aW5nRCwgW1xyXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICBdKSxcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICAvL2NoYW5nZSBiZXR3ZWVuIGRlcGFydCBhbmQgbGFuZCBjaXRpZXMgYW5kIHB1c2hpbmcgaXQgdG8gZmxpZ2h0cyBhcnJheVxyXG4gICAgKDxGb3JtQXJyYXk+dGhpcy5zZWFyY2hGbGlnaHQuZ2V0KCdGbGlnaHRzJykpLnB1c2goXHJcbiAgICAgIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgIGRlcGFydGluZzogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybS5GbGlnaHRzWzBdLmxhbmRpbmcsIFtcclxuICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgbGFuZGluZzogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybS5GbGlnaHRzWzBdLmRlcGFydGluZywgW1xyXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICBdKSxcclxuICAgICAgICBkZXBhcnRpbmdEOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtLnJldHVybkRhdGUsW1xyXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICBdKSxcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gZmlsbCB0aGUgTXVsdGkgQ2l0eSBzZWFyY2hib3ggZGF0YSBmcm9tIGRhdGEgc3RvcmFnZVxyXG4gICAqL1xyXG4gIG11bHRpRGF0YShsb2NhbEZvcm06IGFueSkge1xyXG4gICAgdGhpcy5zZWFyY2hGbGlnaHQgPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgZmxpZ2h0VHlwZTogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsnZmxpZ2h0VHlwZSddLCBbXHJcbiAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgXSksXHJcbiAgICAgIERpcmVjdDogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsnRGlyZWN0J10sIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIEZsaWdodHM6IG5ldyBGb3JtQXJyYXkoW10sIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIHJldHVybkRhdGU6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgIHBhc3NlbmdlcnM6IG5ldyBGb3JtR3JvdXAoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYWR1bHRzOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtWydwYXNzZW5nZXJzJ11bJ2FkdWx0cyddLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWluKDEpLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBjaGlsZDogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybVsncGFzc2VuZ2VycyddWydjaGlsZCddLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWluKDApLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBpbmZhbnQ6IG5ldyBGb3JtQ29udHJvbChsb2NhbEZvcm1bJ3Bhc3NlbmdlcnMnXVsnaW5mYW50J10sIFtcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5taW4oMCksXHJcbiAgICAgICAgICBdKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFtdXHJcbiAgICAgICksXHJcbiAgICAgIGNsYXNzOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtWydjbGFzcyddLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgfSk7XHJcbiAgICAvL3B1c2ggYWxsIG15IGZsaWdodHMgdG8gZmxpZ2h0cyBmb3JtIGFycmF5XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsRm9ybS5GbGlnaHRzPy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodC5nZXQoJ0ZsaWdodHMnKSkucHVzaChcclxuICAgICAgICBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICAgIGRlcGFydGluZzogbmV3IEZvcm1Db250cm9sKGxvY2FsRm9ybS5GbGlnaHRzW2ldLmRlcGFydGluZywgW1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBsYW5kaW5nOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtLkZsaWdodHNbaV0ubGFuZGluZywgW1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBkZXBhcnRpbmdEOiBuZXcgRm9ybUNvbnRyb2wobG9jYWxGb3JtLkZsaWdodHNbaV0uZGVwYXJ0aW5nRCwgW1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byB1cGRhdGUgdGhlIGZsaWdodCBUeXBlXHJcbiAgICogQHBhcmFtIGZsaWdodFR5cGUgKG9uZVdheSBvciByb3VuZFRyaXAgb3IgbXVsdGlDaXR5KVxyXG4gICAqL1xyXG4gIGNoYW5nZUZsaWdodFR5cGUoZmxpZ2h0VHlwZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1snZmxpZ2h0VHlwZSddLnNldFZhbHVlKGZsaWdodFR5cGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGdldCBmbGlnaHRzIGZvcm0gYXJyYXlcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IGZsaWdodHNBcnJheSgpOiBGb3JtQXJyYXkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRmxpZ2h0Py5nZXQoJ0ZsaWdodHMnKSBhcyBGb3JtQXJyYXk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gYWRkIGZsaWdodCBhdCBtdWx0aSBjaXR5XHJcbiAgICogQHJldHVybiBvYmplY3Qgb2Ygc3RyaW5nIGVycm9yIG1lc3NhZ2UgKGZsaWdodEFsZXJ0KVxyXG4gICAqL1xyXG4gIGFkZEZsaWdodCgpIHtcclxuICAgIGxldCBsZW4gPSB0aGlzLmZsaWdodHNBcnJheS5sZW5ndGg7XHJcbiAgICBpZiAobGVuID49IDQpIHtcclxuICAgICAgdGhpcy5mbGlnaHRBbGVydC5lbk1zZyA9IFwiTWF4aW11bSBGbGlnaHRzIFNob3VsZG4ndCBiZSBtb3JlIHRoYW4gNFwiO1xyXG4gICAgICB0aGlzLmZsaWdodEFsZXJ0LmFyTXNnID0gJ9mK2KzYqCDYo9mE2Kcg2YrYstmK2K8g2KfZhNit2K8g2KfZhNij2YLYtdmJINmE2LnYr9ivINin2YTYsdit2YTYp9iqINi52YYgNCc7XHJcbiAgICAgIHJldHVybiB0aGlzLmZsaWdodEFsZXJ0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGxlbiA+IDEpIHtcclxuICAgICAgICB0aGlzLmxhc3RGbGlnaHQgPSAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodC5nZXQoJ0ZsaWdodHMnKSkudmFsdWVbXHJcbiAgICAgICAgICBsZW4gLSAxXHJcbiAgICAgICAgXVsnbGFuZGluZyddO1xyXG4gICAgICB9XHJcbiAgICAgICg8Rm9ybUFycmF5PnRoaXMuc2VhcmNoRmxpZ2h0LmdldCgnRmxpZ2h0cycpKS5wdXNoKFxyXG4gICAgICAgIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgZGVwYXJ0aW5nOiBuZXcgRm9ybUNvbnRyb2wodGhpcy5sYXN0RmxpZ2h0LCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgbGFuZGluZzogbmV3IEZvcm1Db250cm9sKCcnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgZGVwYXJ0aW5nRDogbmV3IEZvcm1Db250cm9sKCcnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB0aGlzLmZsaWdodEFsZXJ0O1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIHJlbW92ZSBmbGlnaHQgZnJvbSBtdWx0aSBjaXR5XHJcbiAgICogQHJldHVybiBvYmplY3Qgb2Ygc3RyaW5nIGVycm9yIG1lc3NhZ2UgKHJlbW92ZUZsaWdodEFsZXJ0KVxyXG4gICAqL1xyXG4gIHJlbW92ZUZsaWdodCgpIHtcclxuICAgIGxldCBsZW4gPSB0aGlzLmZsaWdodHNBcnJheS5sZW5ndGg7XHJcbiAgICBpZiAobGVuID4gMSkge1xyXG4gICAgICAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodC5nZXQoJ0ZsaWdodHMnKSkucmVtb3ZlQXQobGVuLTEpO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW1vdmVGbGlnaHRBbGVydDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlRmxpZ2h0QWxlcnQuZW5Nc2cgPSBcIllvdSBEb24ndCBoYXZlIGFueSBmbGlnaHRzIHRvIHJlbW92ZVwiO1xyXG4gICAgICB0aGlzLnJlbW92ZUZsaWdodEFsZXJ0LmFyTXNnID0gJ9mE2YrYsyDZhNiv2YrZgyDYo9mKINix2K3ZhNin2Kog2YTYpdiy2KfZhNiq2YfYpyc7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZUZsaWdodEFsZXJ0O1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGdldCBUb3RhbCBOdW1iZXIgb2YgcGFzc2VuZ2Vyc1xyXG4gICAqIEByZXR1cm4gb2JqZWN0IG9mIHN0cmluZyBlcnJvciBtZXNzYWdlIChwYXNzZW5nZXJBbGVydClcclxuICAgKiBpZiBtZXNzYWdlIGlzIGVtcHR5IHRoZW4gdGhlIHZhbGlkYXRpb24gaXMgdHJ1ZVxyXG4gICAqL1xyXG4gIGdldFRvdGFsUGFzc2VuZ2VycyhhZHVsdDogbnVtYmVyLCBjaGlsZDogbnVtYmVyLCBpbmZhbnQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGFkdWx0ICsgY2hpbGQgKyBpbmZhbnQ7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gY2hhbmdlIFZhbHVlIE9mIEFkdWx0IHBhc3NlbmdlclxyXG4gICAqIEByZXR1cm4gb2JqZWN0IG9mIHN0cmluZyBlcnJvciBtZXNzYWdlIChwYXNzZW5nZXJBbGVydClcclxuICAgKi9cclxuICBjaGFuZ2VBZHVsdFBhc3NlbmdlcihudW06IG51bWJlcikge1xyXG4gICAgdGhpcy5wYXNzZW5nZXJBbGVydC5hck1zZyA9ICcnO1xyXG4gICAgdGhpcy5wYXNzZW5nZXJBbGVydC5lbk1zZyA9ICcnO1xyXG4gICAgLy9nZXQgdG90YWwgbnVtYmVyIG9mIHBhc3NlbmdlciB3aXRoIG5ldyBzZWxlY3RlZCBhZHVsdCB2YWx1ZVxyXG4gICAgbGV0IFRvdGFsID0gdGhpcy5nZXRUb3RhbFBhc3NlbmdlcnMoXHJcbiAgICAgIG51bSxcclxuICAgICAgdGhpcy5zZWFyY2hGbGlnaHQ/LmdldCgncGFzc2VuZ2Vycy5jaGlsZCcpPy52YWx1ZSxcclxuICAgICAgdGhpcy5zZWFyY2hGbGlnaHQ/LmdldCgncGFzc2VuZ2Vycy5pbmZhbnQnKT8udmFsdWVcclxuICAgICk7XHJcbiAgICBpZiAobnVtIDw9IDkgJiYgbnVtICE9IDAgJiYgVG90YWwgPD0gOSkge1xyXG4gICAgICB0aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdwYXNzZW5nZXJzLmFkdWx0cycpPy5zZXRWYWx1ZShudW0pO1xyXG4gICAgICB0aGlzLnBhc3NlbmdlckFsZXJ0LmFyTXNnID0gJyc7XHJcbiAgICAgIHRoaXMucGFzc2VuZ2VyQWxlcnQuZW5Nc2cgPSAnJztcclxuICAgICAgcmV0dXJuIHRoaXMucGFzc2VuZ2VyQWxlcnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhc3NlbmdlckFsZXJ0LmVuTXNnID1cclxuICAgICAgICAnWW91IFNob3VsZCBIYXZlIGF0IGxlYXN0IDEgQWR1bHQgUGFzc2VuZ2VyIGFuZCBtYXhpbXVtIG51bWJlciBPZiBwYXNzZW5nZXIgSXMgOSc7XHJcbiAgICAgIHRoaXMucGFzc2VuZ2VyQWxlcnQuYXJNc2cgPVxyXG4gICAgICAgICfZitis2Kgg2KPZhiDZitmD2YjZhiDZhNiv2YrZgyDYsdin2YPYqCDYqNin2YTYuiDZiNin2K3YryDYudmE2Ykg2KfZhNij2YLZhCDZiNij2YYg2YTYpyDZitiy2YrYryDYudiv2K8g2KfZhNix2YPYp9ioINi52YYgOSc7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhc3NlbmdlckFsZXJ0O1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGNoYW5nZSBWYWx1ZSBPZiBjaGlsZCBwYXNzZW5nZXJcclxuICAgKiBAcmV0dXJuIG9iamVjdCBvZiBzdHJpbmcgZXJyb3IgbWVzc2FnZSAocGFzc2VuZ2VyQWxlcnQpXHJcbiAgICogaWYgbWVzc2FnZSBpcyBlbXB0eSB0aGVuIHRoZSB2YWxpZGF0aW9uIGlzIHRydWVcclxuICAgKi9cclxuICBjaGFuZ2VDaGlsZFBhc3NlbmdlcihudW06IG51bWJlcikge1xyXG4gICAgdGhpcy5wYXNzZW5nZXJBbGVydC5hck1zZyA9ICcnO1xyXG4gICAgICB0aGlzLnBhc3NlbmdlckFsZXJ0LmVuTXNnID0gJyc7XHJcbiAgICAvL2dldCB0b3RhbCBudW1iZXIgb2YgcGFzc2VuZ2VyIHdpdGggbmV3IHNlbGVjdGVkIGNoaWxkIHZhbHVlXHJcbiAgICBsZXQgVG90YWwgPSB0aGlzLmdldFRvdGFsUGFzc2VuZ2VycyhcclxuICAgICAgdGhpcy5zZWFyY2hGbGlnaHQ/LmdldCgncGFzc2VuZ2Vycy5hZHVsdHMnKT8udmFsdWUsXHJcbiAgICAgIG51bSxcclxuICAgICAgdGhpcy5zZWFyY2hGbGlnaHQ/LmdldCgncGFzc2VuZ2Vycy5pbmZhbnQnKT8udmFsdWVcclxuICAgICk7XHJcbiAgICBpZiAobnVtIDw9IDkgJiYgVG90YWwgPD0gOSkge1xyXG4gICAgICB0aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdwYXNzZW5nZXJzLmNoaWxkJyk/LnNldFZhbHVlKG51bSk7XHJcbiAgICAgIHRoaXMucGFzc2VuZ2VyQWxlcnQuYXJNc2cgPSAnJztcclxuICAgICAgdGhpcy5wYXNzZW5nZXJBbGVydC5lbk1zZyA9ICcnO1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXNzZW5nZXJBbGVydDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFzc2VuZ2VyQWxlcnQuZW5Nc2cgPSAnbWF4aW11bSBudW1iZXIgT2YgcGFzc2VuZ2VyIFNob3VsZCBCZSA5JztcclxuICAgICAgdGhpcy5wYXNzZW5nZXJBbGVydC5hck1zZyA9ICfZitis2Kgg2KPZhiDZitmD2YjZhiDYp9mE2K3YryDYp9mE2KPZgti12Ykg2YTYudiv2K8g2KfZhNix2YPYp9ioIDknO1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXNzZW5nZXJBbGVydDtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBjaGFuZ2UgVmFsdWUgT2YgaW5mYW50IHBhc3NlbmdlclxyXG4gICAqIEByZXR1cm4gb2JqZWN0IG9mIHN0cmluZyBlcnJvciBtZXNzYWdlIChwYXNzZW5nZXJBbGVydClcclxuICAgKiBpZiBtZXNzYWdlIGlzIGVtcHR5IHRoZW4gdGhlIHZhbGlkYXRpb24gaXMgdHJ1ZVxyXG4gICAqL1xyXG4gIGNoYW5nZWluZmFudFBhc3NlbmdlcihudW06IG51bWJlcikge1xyXG4gICAgdGhpcy5wYXNzZW5nZXJBbGVydC5hck1zZyA9ICcnO1xyXG4gICAgICB0aGlzLnBhc3NlbmdlckFsZXJ0LmVuTXNnID0gJyc7XHJcbiAgICBsZXQgYWR1bHRWYWwgPSB0aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdwYXNzZW5nZXJzLmFkdWx0cycpPy52YWx1ZTtcclxuICAgIC8vZ2V0IHRvdGFsIG51bWJlciBvZiBwYXNzZW5nZXIgd2l0aCBuZXcgc2VsZWN0ZWQgaW5mYW50IHZhbHVlXHJcbiAgICBsZXQgVG90YWwgPSB0aGlzLmdldFRvdGFsUGFzc2VuZ2VycyhcclxuICAgICAgYWR1bHRWYWwsXHJcbiAgICAgIHRoaXMuc2VhcmNoRmxpZ2h0Py5nZXQoJ3Bhc3NlbmdlcnMuY2hpbGQnKT8udmFsdWUsXHJcbiAgICAgIG51bVxyXG4gICAgKTtcclxuICAgIGlmIChudW0gPD0gYWR1bHRWYWwgJiYgVG90YWwgPD0gOSkge1xyXG4gICAgICB0aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdwYXNzZW5nZXJzLmluZmFudCcpPy5zZXRWYWx1ZShudW0pO1xyXG4gICAgICB0aGlzLnBhc3NlbmdlckFsZXJ0LmFyTXNnID0gJyc7XHJcbiAgICAgIHRoaXMucGFzc2VuZ2VyQWxlcnQuZW5Nc2cgPSAnJztcclxuICAgICAgcmV0dXJuIHRoaXMucGFzc2VuZ2VyQWxlcnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhc3NlbmdlckFsZXJ0LmVuTXNnID1cclxuICAgICAgICAnaW5mYW50cyBudW1iZXIgc2hvdWxkIGJlIGVxdWFsIG9yIGxlc3MgdGhhbiBBZHVsdHMgbnVtYmVyIGFuZCBtYXhpbXVtIG51bWJlciBPZiBwYXNzZW5nZXIgU2hvdWxkIEJlIDknO1xyXG4gICAgICB0aGlzLnBhc3NlbmdlckFsZXJ0LmFyTXNnID1cclxuICAgICAgICAn2YrYrNioINij2YYg2YrZg9mI2YYg2LnYr9ivINin2YTYo9i32YHYp9mEINin2YTYsdi22Lkg2YXYs9in2YjZitin2Ysg2KPZiCDYo9mC2YQg2YXZhiDYudiv2K8g2KfZhNio2KfZhNi62YrZhiDZiNin2YTYrdivINin2YTYo9mC2LXZiSDZhNi52K/YryDYp9mE2LHZg9in2Kgg2YrYrNioINij2YYg2YrZg9mI2YYgOSc7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhc3NlbmdlckFsZXJ0O1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGNoYW5nZSBWYWx1ZSBPZiBDbGFzcyBUeXBlXHJcbiAgICogQHBhcmFtcyBjbGFzcyB2YWx1ZSBzZWxlY3RlZCBmcm9tIGxpc3Qgdmlld1xyXG4gICAqL1xyXG4gIHNldENsYXNzVmFsdWUoY2xhc3NWYWw6IHN0cmluZykge1xyXG4gICAgdGhpcy5zZWFyY2hGbGlnaHQuY29udHJvbHNbJ2NsYXNzJ10uc2V0VmFsdWUoY2xhc3NWYWwpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGV4Y2hhbmdlIGJldHdlZW4gZGVzdGluYXRpb25zXHJcbiAgICogQHBhcmFtcyBpdGVtIHdoaWNoIGkgd2FudCB0byBleGNoYW5nZSAoZnJvbSBUeXBlIHNlYXJjaEJveEZsaWdodHMpXHJcbiAgICovXHJcbiAgc3dpdGNoRGVzdGluYXRpb24oaXRlbSA6IGFueSkge1xyXG4gICAgbGV0IGRlc3RpbmF0aW9uMSA9IGl0ZW0uZ2V0KFwibGFuZGluZ1wiKT8udmFsdWU7XHJcbiAgICBsZXQgZGVzdGluYXRpb24yID0gaXRlbS5nZXQoXCJkZXBhcnRpbmdcIik/LnZhbHVlO1xyXG4gICAgaXRlbS5nZXQoXCJkZXBhcnRpbmdcIik/LnNldFZhbHVlKGRlc3RpbmF0aW9uMSk7XHJcbiAgICBpdGVtLmdldChcImxhbmRpbmdcIik/LnNldFZhbHVlKGRlc3RpbmF0aW9uMik7XHJcbiAgICBpdGVtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byByZXR1cm4gY3VycmVudCBEYXRlXHJcbiAgICovXHJcbiAgdG9kYXlEYXRlKCkge1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xyXG4gIH1cclxuICAgIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gdmFsaWRhdGUgdGhlIE11bHRpIENpdHkgc2VhcmNoYm94IERhdGVzXHJcbiAgICogQHJldHVlciBzdHJpbmcgd2l0aCBhbGVydCBtZXNzYWdlIGlmIGl0IGhhcyBlcnJvciBlbHNlIHJldHVybiB0cnVlXHJcbiAgICovXHJcbiAgdmFsaWRhdGVNdWx0aUNpdHlEYXRlcygpe1xyXG4gICAgaWYodGhpcy5mbGlnaHRzQXJyYXkubGVuZ3RoID4gMSl7XHJcbiAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZmxpZ2h0c0FycmF5Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAvL2lmIHRoZSBjdXJyZW50IGRhdGUgaXMgdGhlIGxhc3Qgb25lIGluIGFycmF5IGNvbXBhcmUgaXQgd2l0aCB0aGUgcHJldmlvdXMgb25lIFxyXG4gICAgICAgIGlmKGkgPT0gdGhpcy5mbGlnaHRzQXJyYXkubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgaWYodGhpcy5mbGlnaHRzQXJyYXkuYXQoaSk/LmdldCgnZGVwYXJ0aW5nRCcpPy52YWx1ZSA8IHRoaXMuZmxpZ2h0c0FycmF5LmF0KGktMSkuZ2V0KCdkZXBhcnRpbmdEJyk/LnZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy52YWxpZE11bHRpRGF0ZUFsZXJ0LmVuTXNnPSdUaGUgRmlyc3QgRmxpZ2h0IHNob3VsZCBIYXZlIEEgZGF0ZSBCZWZvcmUgbmV4dCBGbGlnaHQnO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkTXVsdGlEYXRlQWxlcnQuYXJNc2c9J9mK2KzYqCDYo9mGINmK2YPZiNmGINmE2YTYsdit2YTYqSDYp9mE2KPZiNmE2Ykg2KrYp9ix2YrYriDZgtio2YQg2KfZhNix2K3ZhNipINin2YTYqtin2YTZitipJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgbGV0IG5leHREYXRlID0gbmV3IERhdGUoIHRoaXMuZmxpZ2h0c0FycmF5LmF0KGkrMSk/LmdldCgnZGVwYXJ0aW5nRCcpPy52YWx1ZSkgO1xyXG5cclxuICAgICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IHRoaXMuZmxpZ2h0c0FycmF5LmF0KGkpLmdldCgnZGVwYXJ0aW5nRCcpPy52YWx1ZTtcclxuICAgICAgICAgIC8vY2hlY2sgaWYgd2UgaGF2ZSBhIG5leHQgZGF0ZSB3aXRoIHZhbHVlIE9yIG5vdFxyXG5cclxuICAgICAgICAgIGlmKG5leHREYXRlID09IHVuZGVmaW5lZCB8fCBuZXh0RGF0ZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvL2NvbXBhcmUgYmV0d2VlbiBjdXJyZW50IGFuZCBuZXh0IERhdGVcclxuICAgICAgICAgICAgaWYobmV4dERhdGUuZ2V0VGltZSgpIDwgY3VycmVudERhdGUuZ2V0VGltZSgpKXtcclxuICAgICAgICAgICAgICB0aGlzLnZhbGlkTXVsdGlEYXRlQWxlcnQuZW5Nc2c9J1RoZSBGaXJzdCBGbGlnaHQgc2hvdWxkIEhhdmUgQSBkYXRlIEJlZm9yZSBuZXh0IEZsaWdodCc7XHJcbiAgICAgICAgICAgICAgdGhpcy52YWxpZE11bHRpRGF0ZUFsZXJ0LmFyTXNnPSfZitis2Kgg2KPZhiDZitmD2YjZhiDZhNmE2LHYrdmE2Kkg2KfZhNij2YjZhNmJINiq2KfYsdmK2K4g2YLYqNmEINin2YTYsdit2YTYqSDYp9mE2KrYp9mE2YrYqSc7XHJcbiAgICAgICAgICAgICAgdGhpcy5mbGlnaHRzQXJyYXkuYXQoaSsxKT8uZ2V0KCdkZXBhcnRpbmdEJyk/LnNldFZhbHVlKCcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgIHRoaXMudmFsaWRNdWx0aURhdGVBbGVydC5lbk1zZz0nVHJ1ZSc7XHJcbiAgICAgICAgICAgICAgdGhpcy52YWxpZE11bHRpRGF0ZUFsZXJ0LmFyTXNnPSdUcnVlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRNdWx0aURhdGVBbGVydFxyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIHNldCB0aGUgdmFsdWUgb2YgZGVwYXJ0IERhdGUgYWZ0ZXIgdmFsaWRhdGUgaXRcclxuICAgKiBAcGFyYW1zIGRlcGFydCBkYXRlIHNob3VsZCBiZSBmb3JtYXQgYXMgMjAyMy0wOC0wMVxyXG4gICAqIEBwYXJhbXMgZmxpZ2h0SW5kZXggbnVtYmVyIGZvclxyXG4gICAqIEByZXR1ZW4gb2JqZWN0IHdpdGggZW1wdHkgbWVzc2FnZSBpZiB2YWxpZGF0aW9uIGlzIHRydWUgb3Igb2JqZWN0IHdpdGggZXJyb3IgbWVzc2FnZXNcclxuICAgKi9cclxuICBzZXREZXBEYXRlKGRlcERhdGU6IHN0cmluZywgZmxpZ2h0SW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkZXBEYXRlKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07IC8vbWFraW5nIGRhdGUgYXMgMjAyMy0wOC0wMSBmb3JtYXQgdG8gY2hlY2sgdGhlIGNvbmRpdGlvblxyXG4gICAgdGhpcy5kYXRlQWxlcnQuZW5Nc2cgPSAnJztcclxuICAgIHRoaXMuZGF0ZUFsZXJ0LmFyTXNnID0gJyc7XHJcbiAgICAvL2NoZWNrIGlmIGRhdGUgaXMgcHJldmlvdXMgdGhhbiB0b2RheSBvciBub3RcclxuICAgIGlmIChkYXRlIDwgdGhpcy50b2RheURhdGUoKSkge1xyXG4gICAgICAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdGbGlnaHRzJykpXHJcbiAgICAgICAgLmF0KGZsaWdodEluZGV4KVxyXG4gICAgICAgIC5nZXQoJ2RlcGFydGluZ0QnKVxyXG4gICAgICAgID8uc2V0VmFsdWUodGhpcy50b2RheURhdGUoKSk7XHJcbiAgICAgIHRoaXMuZGF0ZUFsZXJ0LmVuTXNnID0gXCJZb3UgU2hvdWxkbid0IHNlbGVjdCBhIFByZXZpb3VzIERhdGVcIjtcclxuICAgICAgdGhpcy5kYXRlQWxlcnQuYXJNc2cgPSAn2YTYpyDZitis2Kgg2LnZhNmK2YMg2KrYrdiv2YrYryDYqtin2LHZitiuINiz2KfYqNmCJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vY2hlY2sgaWYgdGhlIHJldHVybiBkYXRlIGVxdWFsIHRvIGRlcGFydCAod2hlbiB0aGUgdXNlciBlbnRlcnMgdGhlIHJldHVybiBkYXRlIGZpcnN0KVxyXG4gICAgICBpZiAodGhpcy5zZWFyY2hGbGlnaHQuY29udHJvbHNbJ3JldHVybkRhdGUnXS52YWx1ZSA9PSBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5kYXRlQWxlcnQuZW5Nc2cgPVxyXG4gICAgICAgICAgJ1RoaXMgRGF0ZSBJcyBTaW1pbGFyIHRvIFJldHVybiBkYXRlLCBZb3UgU2hvdWxkIFNlbGVjdCBBbm90aGVyIG9uZSc7XHJcbiAgICAgICAgdGhpcy5kYXRlQWxlcnQuYXJNc2cgPVxyXG4gICAgICAgICAgJ9mH2LDYpyDYp9mE2KrYp9ix2YrYriDZhdi02KfYqNmHINmE2KrYp9ix2YrYriDYp9mE2LnZiNiv2Kkg2Iwg2YrYrNioINi52YTZitmDINiq2K3Yr9mK2K8g2KrYp9ix2YrYriDYotiu2LEnO1xyXG4gICAgICAgICg8Rm9ybUFycmF5PnRoaXMuc2VhcmNoRmxpZ2h0Py5nZXQoJ0ZsaWdodHMnKSlcclxuICAgICAgICAgIC5hdChmbGlnaHRJbmRleClcclxuICAgICAgICAgIC5nZXQoJ2RlcGFydGluZ0QnKVxyXG4gICAgICAgICAgPy5zZXRWYWx1ZSh0aGlzLnRvZGF5RGF0ZSgpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdGbGlnaHRzJykpXHJcbiAgICAgICAgICAuYXQoZmxpZ2h0SW5kZXgpXHJcbiAgICAgICAgICAuZ2V0KCdkZXBhcnRpbmdEJylcclxuICAgICAgICAgID8uc2V0VmFsdWUoZGVwRGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRhdGVBbGVydDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBzZXQgdGhlIHZhbHVlIG9mIFJldHVybiBEYXRlIGFmdGVyIHZhbGlkYXRlIGl0XHJcbiAgICogQHBhcmFtcyBSZXR1cm4gZGF0ZSBzaG91bGQgYmUgZm9ybWF0IGFzIDIwMjMtMDgtMDFcclxuICAgKiBAcmV0dWVuIG9iamVjdCB3aXRoIGVtcHR5IG1lc3NhZ2UgaWYgdmFsaWRhdGlvbiBpcyB0cnVlIG9yIG9iamVjdCB3aXRoIGVycm9yIG1lc3NhZ2VzXHJcbiAgICovXHJcbiAgc2V0UmV0RGF0ZShyZXREYXRlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmV0RGF0ZUFsZXJ0LmVuTXNnID0gJyc7XHJcbiAgICB0aGlzLnJldERhdGVBbGVydC5hck1zZyA9ICcnO1xyXG4gICAgaWYgKHJldERhdGUpIHtcclxuICAgICAgbGV0IGRlcERhdGUgPSAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdGbGlnaHRzJykpXHJcbiAgICAgIC5hdCgwKVxyXG4gICAgICA/LmdldCgnZGVwYXJ0aW5nRCcpPy52YWx1ZTtcclxuICAgICAgLy9jaGVjayBpZiBkYXRlIGlzIHByZXZpb3VzIHRoYW4gdG9kYXlcclxuICAgICAgaWYgKHJldERhdGUgPD0gdGhpcy50b2RheURhdGUoKSkge1xyXG4gICAgICAgIHRoaXMucmV0RGF0ZUFsZXJ0LmVuTXNnID0gJ1lvdSBTaG91bGQgc2VsZWN0IGEgZGF0ZSBhZnRlciB0aGlzIGRheSc7XHJcbiAgICAgICAgdGhpcy5yZXREYXRlQWxlcnQuYXJNc2cgPSAn2YrYrNioINi52YTZitmDINiq2K3Yr9mK2K8g2KrYp9ix2YrYriDYqNi52K8g2YfYsNinINin2YTZitmI2YUnO1xyXG4gICAgICB9XHJcbiAgICAgIC8vY2hlY2sgb2YgZGF0ZSBpcyBpcyBwcmV2aW91cyB0aGFuIGRlcGFydCBkYXRlXHJcbiAgICAgIGVsc2UgaWYgKHJldERhdGUgPCBkZXBEYXRlKSB7XHJcbiAgICAgICAgdGhpcy5yZXREYXRlQWxlcnQuZW5Nc2cgPVxyXG4gICAgICAgICAgJ1lvdSBTaG91bGQgU2VsZWN0IGEgZGF0ZSBBZnRlciB5b3VyIERlcGFydCBEYXRlJztcclxuICAgICAgICB0aGlzLnJldERhdGVBbGVydC5hck1zZyA9XHJcbiAgICAgICAgICAn2YrYrNioINi52YTZitmDINiq2K3Yr9mK2K8g2KrYp9ix2YrYriDYqNi52K8g2KrYp9ix2YrYriDYp9mE2YXYutin2K/YsdipINin2YTYrtin2LUg2KjZgyc7XHJcbiAgICAgIH1cclxuICAgICAgLy9pZiBhbGwgdmFsaWRhdGlvbiBpcyB0cnVlIHRoZW4gZ28gdG8gZWxzZSBjb25kaXRpb25cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hGbGlnaHQuY29udHJvbHNbJ3JldHVybkRhdGUnXS5zZXRWYWx1ZShyZXREYXRlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXREYXRlQWxlcnQuZW5Nc2cgPSAnWW91IFNob3VsZCBTZWxlY3QgYSByZXR1cm4gRGF0ZSc7XHJcbiAgICAgIHRoaXMucmV0RGF0ZUFsZXJ0LmFyTXNnID0gJ9mK2KzYqCDYudmE2YrZgyDYqtit2K/ZitivINiq2KfYsdmK2K4g2KfZhNi52YjYr9ipJztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJldERhdGVBbGVydDtcclxuICAgIFxyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIHNldCB0aGUgc2Vjb25kIGZsaWdodCBvZiBmbGlnaHRzIGFycmF5IGlmIHRoZSBmbGlnaHQgdHlwZSBpcyByb3VuZHRyaXBcclxuICAgKi9cclxuICBzZXRSZXRGbGlnaHQoKSB7XHJcbiAgICBpZih0aGlzLmZsaWdodHNBcnJheS5sZW5ndGggPT0gMSlcclxuICAgICg8Rm9ybUFycmF5PnRoaXMuc2VhcmNoRmxpZ2h0LmdldCgnRmxpZ2h0cycpKS5wdXNoKFxyXG4gICAgICBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBkZXBhcnRpbmc6IG5ldyBGb3JtQ29udHJvbCh0aGlzLmZsaWdodHNBcnJheS5hdCgwKS5nZXQoJ2xhbmRpbmcnKT8udmFsdWUsIFtcclxuICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgbGFuZGluZzogbmV3IEZvcm1Db250cm9sKHRoaXMuZmxpZ2h0c0FycmF5LmF0KDApLmdldCgnZGVwYXJ0aW5nJyk/LnZhbHVlLCBbXHJcbiAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIGRlcGFydGluZ0Q6IG5ldyBGb3JtQ29udHJvbCh0aGlzLnNlYXJjaEZsaWdodC5nZXQoJ3JldHVybkRhdGUnKT8udmFsdWUpLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBnZW5lcmF0ZSBTZWFyY2ggSWRcclxuICAgKi9cclxuICBpZCgpIHtcclxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBteUlkID1cclxuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpICtcclxuICAgICAgJ0InICtcclxuICAgICAgZGF0ZS5nZXRVVENNb250aCgpICtcclxuICAgICAgJ0knICtcclxuICAgICAgZGF0ZS5nZXRVVENEYXkoKSArXHJcbiAgICAgICdTJyArXHJcbiAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgK1xyXG4gICAgICAnSCcgK1xyXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoOSAtIDAgKyAxKSkgK1xyXG4gICAgICAwICtcclxuICAgICAgJ0InICtcclxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDkgLSAwICsgMSkpICtcclxuICAgICAgMCArXHJcbiAgICAgICdJJyArXHJcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5IC0gMCArIDEpKSArXHJcbiAgICAgIDAgK1xyXG4gICAgICAnUycgK1xyXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoOSAtIDAgKyAxKSkgK1xyXG4gICAgICAwICtcclxuICAgICAgJ0gnICtcclxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDkgLSAwICsgMSkpICtcclxuICAgICAgMCArXHJcbiAgICAgICdJJyArXHJcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5IC0gMCArIDEpKSArXHJcbiAgICAgIDA7XHJcbiAgICByZXR1cm4gbXlJZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBzcGxpdCB0aGUgYWlycG9ydCBjb2RlIGZyb20gRGVwYXJ0IE9yIExhbmQgaW5wdXRcclxuICAgKiBAcGFyYW1zIHNwaWx0SW5kZXggd2l0aCBpbmRleCBoYXYgdGhlIGFpcnBvcnQgY29kZSAoMCBvciAxKVxyXG4gICAqIEBwYXJhbXMgc3BsaXRQYXR0ZXJuIHBhdHRlcm4gdXNlZCB0byBzcGxpdCB0aGUgYWlycG9ydCBzdHJpbmcgYW5kIGdldCBzZXBhcmF0ZSBjb2RlIGFsb25lXHJcbiAgICogQHBhcmFtcyBhaXJwb3J0IHdoaWNqIHNlbGVjdGVkIGZyb20gZGVwYXJ0IG9yIGxhbmQgYWlycG9ydHMgSW5wdXRcclxuICAgKiBAcmV0dWVuIGFpcnBvcnQgY29kZVxyXG4gICAqL1xyXG4gIGdldEFpcnBvcnRDb2RlKHNwaWx0SW5kZXg6IG51bWJlciwgc3BsaXRQYXR0ZXJuOiBzdHJpbmcsIGFpcnBvcnQ6IHN0cmluZykge1xyXG4gICAgbGV0IGFpcnBvcnRDb2RlID0gYWlycG9ydC5zcGxpdChzcGxpdFBhdHRlcm4pW3NwaWx0SW5kZXhdO1xyXG4gICAgcmV0dXJuIGFpcnBvcnRDb2RlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBtYXRjaCBGbGlnaHRzIGZvcm0gYXJyYXkgdmFsdWVzIHdpdGggRmxpZ2h0SW5mb01vZHVsZVxyXG4gICAqL1xyXG4gIGdldEZsaWdodEluZm8oc3BpbHRJbmRleDogbnVtYmVyLCBzcGxpdFBhdHRlcm46IHN0cmluZykge1xyXG4gICAgbGV0IGZsaWdodG91dDogc2VhcmNoQm94RmxpZ2h0c1tdID0gW107XHJcbiAgICAvL2lmIGZsaWdodCB0eXBlIGlzIHJvdW5kIHRyaXAgcmV0dXJuIGFycmF5IG9mIHR3byBmbGlnaHRzIHdpdGggZGVwYXJ0IGNpdHksIGxhbmQgY2l0eSBhbmQgZGVwYXJ0IGRhdGVcclxuICAgIGlmICh0aGlzLnNlYXJjaEZsaWdodC5nZXQoJ2ZsaWdodFR5cGUnKT8udmFsdWUgPT0gJ1JvdW5kVHJpcCcpIHtcclxuICAgICAgY29uc3Qgcm91bmRFbGVtZW50MSA9ICg8Rm9ybUFycmF5PnRoaXMuc2VhcmNoRmxpZ2h0LmdldCgnRmxpZ2h0cycpKVxyXG4gICAgICAgIC5jb250cm9sc1swXTsgLy9maXJzdCBmbGlnaHQgb2YgUm91bmRUcmlwXHJcbiAgICAgIHZhciBkZXBhcnQgPSB0aGlzLmdldEFpcnBvcnRDb2RlKFxyXG4gICAgICAgIHNwaWx0SW5kZXgsXHJcbiAgICAgICAgc3BsaXRQYXR0ZXJuLFxyXG4gICAgICAgIHJvdW5kRWxlbWVudDEudmFsdWVbJ2RlcGFydGluZyddXHJcbiAgICAgICk7XHJcbiAgICAgIHZhciBsYW5kaW5nID0gdGhpcy5nZXRBaXJwb3J0Q29kZShcclxuICAgICAgICBzcGlsdEluZGV4LFxyXG4gICAgICAgIHNwbGl0UGF0dGVybixcclxuICAgICAgICByb3VuZEVsZW1lbnQxLnZhbHVlWydsYW5kaW5nJ11cclxuICAgICAgKTtcclxuICAgICAgbGV0IGRlcEZsaWdodDogc2VhcmNoQm94RmxpZ2h0cyA9IHtcclxuICAgICAgICBkZXBhcnRpbmc6IGRlcGFydCxcclxuICAgICAgICBsYW5kaW5nOiBsYW5kaW5nLFxyXG4gICAgICAgIGRlcGFydGluZ0Q6IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKFxyXG4gICAgICAgICAgcm91bmRFbGVtZW50MS52YWx1ZVsnZGVwYXJ0aW5nRCddLFxyXG4gICAgICAgICAgJ01NTU0gZGQsIHknXHJcbiAgICAgICAgKSxcclxuICAgICAgfTtcclxuICAgICAgZmxpZ2h0b3V0LnB1c2goZGVwRmxpZ2h0KTtcclxuXHJcbiAgICAgIC8vc3dpdGNoIGRlcGFydCBhbmQgbGFuZCBhaXJwb3J0IGNvZGVzIGZvciB0aGUgc2Vjb25kIGZsaWdodCBhbmQgcHVzaCBpdCBvbiBmbGlnaHRvdXQgYXJyYXlcclxuICAgICAgbGV0IGxhbmRGbGlnaHQ6IHNlYXJjaEJveEZsaWdodHMgPSB7XHJcbiAgICAgICAgZGVwYXJ0aW5nOiBsYW5kaW5nLFxyXG4gICAgICAgIGxhbmRpbmc6IGRlcGFydCxcclxuICAgICAgICBkZXBhcnRpbmdEOiB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShcclxuICAgICAgICAgIHRoaXMuc2VhcmNoRmxpZ2h0LmNvbnRyb2xzWydyZXR1cm5EYXRlJ10udmFsdWUsXHJcbiAgICAgICAgICAnTU1NTSBkZCwgeSdcclxuICAgICAgICApLFxyXG4gICAgICB9O1xyXG4gICAgICBmbGlnaHRvdXQucHVzaChsYW5kRmxpZ2h0KTtcclxuICAgICAgcmV0dXJuIGZsaWdodG91dDtcclxuICAgIH1cclxuICAgIC8vaWYgZmxpZ2h0IHR5cGUgaXMgb25lV2F5IE9yIE11bHRpIHRoZW4gbG9vcCBvbiBmbGlnaHRzIGFycmF5IGxlbmd0aCBhbmQgcHVzaCBhbGwgdGhlIGZsaWdodHMgaW50byBmbGlnaHRvdXRcclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgIGluZGV4IDwgKDxGb3JtQXJyYXk+dGhpcy5zZWFyY2hGbGlnaHQuZ2V0KCdGbGlnaHRzJykpLmxlbmd0aDtcclxuICAgICAgaW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSAoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodC5nZXQoJ0ZsaWdodHMnKSkuY29udHJvbHNbXHJcbiAgICAgICAgaW5kZXhcclxuICAgICAgXTtcclxuICAgICAgbGV0IGZsaWdodDogc2VhcmNoQm94RmxpZ2h0cyA9IHtcclxuICAgICAgICBkZXBhcnRpbmc6IHRoaXMuZ2V0QWlycG9ydENvZGUoXHJcbiAgICAgICAgICBzcGlsdEluZGV4LFxyXG4gICAgICAgICAgc3BsaXRQYXR0ZXJuLFxyXG4gICAgICAgICAgZWxlbWVudC52YWx1ZVsnZGVwYXJ0aW5nJ11cclxuICAgICAgICApLFxyXG4gICAgICAgIGxhbmRpbmc6IHRoaXMuZ2V0QWlycG9ydENvZGUoXHJcbiAgICAgICAgICBzcGlsdEluZGV4LFxyXG4gICAgICAgICAgc3BsaXRQYXR0ZXJuLFxyXG4gICAgICAgICAgZWxlbWVudC52YWx1ZVsnbGFuZGluZyddXHJcbiAgICAgICAgKSxcclxuICAgICAgICBkZXBhcnRpbmdEOiB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShcclxuICAgICAgICAgIGVsZW1lbnQudmFsdWVbJ2RlcGFydGluZ0QnXSxcclxuICAgICAgICAgICdNTU1NIGRkLCB5J1xyXG4gICAgICAgICksXHJcbiAgICAgIH07XHJcbiAgICAgIGZsaWdodG91dC5wdXNoKGZsaWdodCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmxpZ2h0b3V0O1xyXG4gIH1cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIHJldHVybiBzdHJpbmcgb2YgZmxpZ2h0cyBpbiBLV0ktQ0FJLU1hcmNoJTIwMTUlMjAyMDE5XyBmb3JtYXRcclxuICAgKi9cclxuICBmbGlnaHRJbmZvRm9ybWF0dGVyKGFycmF5OiBzZWFyY2hCb3hGbGlnaHRzW10pIHtcclxuICAgIGxldCBGbGlnaHRzSW5mb0FycmF5OiBzdHJpbmcgPSAnJztcclxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgYXJyYXkpIHtcclxuICAgICAgbGV0IGZsaWd0OiBzdHJpbmcgPVxyXG4gICAgICAgIGVsZW1lbnQuZGVwYXJ0aW5nICtcclxuICAgICAgICAnLScgK1xyXG4gICAgICAgIGVsZW1lbnQubGFuZGluZyArXHJcbiAgICAgICAgJy0nICtcclxuICAgICAgICBlbGVtZW50LmRlcGFydGluZ0QgK1xyXG4gICAgICAgICdfJztcclxuICAgICAgRmxpZ2h0c0luZm9BcnJheSA9IEZsaWdodHNJbmZvQXJyYXkgKyBmbGlndDtcclxuICAgIH1cclxuICAgIHJldHVybiBGbGlnaHRzSW5mb0FycmF5LnNsaWNlKDAsIC0xKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byBjb252ZXJ0IGFycmF5IG9mIHBhc3NhbmdlciB0eXBlIG51bWJlciB0byBBLTEtQy0wLUktMFxyXG4gICAqIEBwYXJhbXMgcGFzc2VuZ2VyIG9iamVjdCB3aXRoIHRvdGFsIG51bWJlcnMgb2YgYWR1bHRzLGNoaWxkIGFuZCBpbmZhbnRzXHJcbiAgICogQGV4YW1wbGUgJ2VuL0tXRC9FRy9Sb3VuZFRyaXAvS1dJLUNBSS1BdWd1c3QlMjAxOSwlMjAyMDIzX0NBSS1LV0ktQXVndXN0JTIwMzEsJTIwMjAyMy8yMDIzQjdJMFM2MTdIMDBCNTBJOTBTMTBIMjBJMzAvQS0xLUMtMC1JLTAvRWNvbm9teS9mYWxzZSdcclxuICAgKi9cclxuICBwYXNzZW5nZXJGb3JtYXR0ZXIocGFzc2VuZ2VyT2JqOiBzZWFyY2hCb3hQYXNzZW5nZXJzKSB7XHJcbiAgICBsZXQgcGFzc2VuZ2Vyc1N0cmluZzogc3RyaW5nO1xyXG4gICAgcGFzc2VuZ2Vyc1N0cmluZyA9XHJcbiAgICAgICdBLScgK1xyXG4gICAgICBwYXNzZW5nZXJPYmouYWR1bHRzICtcclxuICAgICAgJy1DLScgK1xyXG4gICAgICBwYXNzZW5nZXJPYmouY2hpbGQgK1xyXG4gICAgICAnLUktJyArXHJcbiAgICAgIHBhc3Nlbmdlck9iai5pbmZhbnQ7XHJcbiAgICByZXR1cm4gcGFzc2VuZ2Vyc1N0cmluZztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSB0byByZXR1cm4gbGluayB0byB1c2UgaXQgdG8gbmF2aWdhdGUgdG8gc2VhcmNoIHJlc3VsdHMgd2l0aCBhbGwgZGF0YSBvZiBzZWFyY2ggYm94XHJcbiAgICovXHJcbiAgZ2V0U2VhcmNocmVzdWx0TGluayhcclxuICAgIGxhbmc6IHN0cmluZyxcclxuICAgIGN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgICBwb2ludE9mU2FsZTogc3RyaW5nLFxyXG4gICAgc3BpbHRJbmRleDogbnVtYmVyLFxyXG4gICAgc3BsaXRQYXR0ZXJuOiBzdHJpbmdcclxuICApIHtcclxuICAgIGxldCBmbGlnaHRMaXN0ID0gdGhpcy5nZXRGbGlnaHRJbmZvKHNwaWx0SW5kZXgsIHNwbGl0UGF0dGVybik7XHJcbiAgICBsZXQgc2VhcmNoQXBpOiBzZWFyY2hGbGlnaHRNb2RlbCA9IHtcclxuICAgICAgbGFuOiBsYW5nLFxyXG4gICAgICBjdXJyZW5jeTogY3VycmVuY3ksXHJcbiAgICAgIHBvaW50T2ZSZXNlcnZhdGlvbjogcG9pbnRPZlNhbGUsXHJcbiAgICAgIGZsaWdodFR5cGU6IHRoaXMuc2VhcmNoRmxpZ2h0LmdldCgnZmxpZ2h0VHlwZScpPy52YWx1ZSxcclxuICAgICAgZmxpZ2h0c0luZm86IHRoaXMuZmxpZ2h0SW5mb0Zvcm1hdHRlcihmbGlnaHRMaXN0KSxcclxuICAgICAgcGFzc2VuZ2VyczogdGhpcy5wYXNzZW5nZXJGb3JtYXR0ZXIoXHJcbiAgICAgICAgdGhpcy5zZWFyY2hGbGlnaHQuZ2V0KCdwYXNzZW5nZXJzJyk/LnZhbHVlXHJcbiAgICAgICksXHJcbiAgICAgIENjbGFzczogdGhpcy5zZWFyY2hGbGlnaHQuZ2V0KCdjbGFzcycpPy52YWx1ZSxcclxuICAgICAgc2VyYWNoSWQ6IHRoaXMuaWQoKSxcclxuICAgICAgc2hvd0RpcmVjdDogdGhpcy5zZWFyY2hGbGlnaHQuZ2V0KCdEaXJlY3QnKT8udmFsdWUsXHJcbiAgICAgIHByZWZlcnJlZEFpckxpbmU6ICdhbGwnLFxyXG4gICAgfTtcclxuICAgIHRoaXMucmVzdWx0TGluayA9IHNlYXJjaEFwaTtcclxuICAgIHJldHVybiBgJHtzZWFyY2hBcGkubGFufS8ke3NlYXJjaEFwaS5jdXJyZW5jeX0vJHtzZWFyY2hBcGkucG9pbnRPZlJlc2VydmF0aW9ufS8ke3NlYXJjaEFwaS5mbGlnaHRUeXBlfS8ke3NlYXJjaEFwaS5mbGlnaHRzSW5mb30vJHtzZWFyY2hBcGkuc2VyYWNoSWR9LyR7c2VhcmNoQXBpLnBhc3NlbmdlcnN9LyR7c2VhcmNoQXBpLkNjbGFzc30vJHtzZWFyY2hBcGkuc2hvd0RpcmVjdH1gO1xyXG4gIH1cclxuICBvblN1Ym1pdChsYW5nOiBzdHJpbmcsY3VycmVuY3k6IHN0cmluZyxwb2ludE9mU2FsZTogc3RyaW5nLHNwaWx0SW5kZXg6IG51bWJlcixzcGxpdFBhdHRlcm46IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLnNlYXJjaEZsaWdodC52YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlYXJjaEZsaWdodC5tYXJrQWxsQXNUb3VjaGVkKCk7IC8vdXNlZCB0aGlzIGZ1bmN0aW9uIHRvIG1ha2UgYSByZWQgYm9yZGVyIGFyb3VuZCBpbnZhbGlkIGlucHV0c1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL2NhbGwgYWxsIGZ1bmN0aW9ucyB2YWxpZGF0aW9uIGZvciBhbGwgcGFzc2VuZ2VycyB0eXBlIGFuZCBmbGlnaHQgZGF0ZXNcclxuICAgICAgbGV0IGFkdWx0ID0gdGhpcy5jaGFuZ2VBZHVsdFBhc3Nlbmdlcih0aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdwYXNzZW5nZXJzLmFkdWx0Jyk/LnZhbHVlKTtcclxuICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGFuZ2VDaGlsZFBhc3Nlbmdlcih0aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdwYXNzZW5nZXJzLmNoaWxkJyk/LnZhbHVlKTtcclxuICAgICAgbGV0IGluZmFudCA9IHRoaXMuY2hhbmdlaW5mYW50UGFzc2VuZ2VyKCB0aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdwYXNzZW5nZXJzLmluZmFudCcpPy52YWx1ZSk7XHJcbiAgICAgIHZhciByZXREYXRlOiBBbGVydE1zZ01vZGVsID0geyBhck1zZzogJycsIGVuTXNnOiAnJyB9O1xyXG4gICAgICBsZXQgZGVwRGF0ZSA9IHRoaXMuc2V0RGVwRGF0ZSgoPEZvcm1BcnJheT50aGlzLnNlYXJjaEZsaWdodD8uZ2V0KCdGbGlnaHRzJykpLmF0KDApPy5nZXQoJ2RlcGFydGluZ0QnKT8udmFsdWUsMCk7XHJcblxyXG4gICAgICBpZih0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1snZmxpZ2h0VHlwZSddPy52YWx1ZSA9PSAncm91bmR0cmlwJyB8fCB0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1snZmxpZ2h0VHlwZSddPy52YWx1ZSA9PSAnUm91bmRUcmlwJyB8fCB0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1snZmxpZ2h0VHlwZSddPy52YWx1ZSA9PSAncm91bmRUcmlwJykge1xyXG4gICAgICAgIC8vc2V0IHJldHVybiBkYXRlIHZhbHVlXHJcbiAgICAgICAgcmV0RGF0ZSA9IHRoaXMuc2V0UmV0RGF0ZSh0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1sncmV0dXJuRGF0ZSddLnZhbHVlKTtcclxuICAgICAgICAvL2NoYW5nZSBiZXR3ZWVuIGRlcGFydCBhbmQgbGFuZCBjaXRpZXMgYW5kIHB1c2hpbmcgaXQgdG8gZmxpZ2h0cyBhcnJheVxyXG4gICAgICAgIHRoaXMuc2V0UmV0RmxpZ2h0KCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZih0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1snZmxpZ2h0VHlwZSddPy52YWx1ZSA9PSAnb25ld2F5JyB8fCB0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1snZmxpZ2h0VHlwZSddPy52YWx1ZSA9PSAnT25lV2F5JyB8fCB0aGlzLnNlYXJjaEZsaWdodC5jb250cm9sc1snZmxpZ2h0VHlwZSddPy52YWx1ZSA9PSAnb25lV2F5Jyl7XHJcbiAgICAgICAgaWYodGhpcy5mbGlnaHRzQXJyYXkubGVuZ3RoPjEpe1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVGbGlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vSWYgQWxsIFZhbGlkYXRpb25zIGFuZCBjb25kaXRpb25zIGFyZSB0cnVlIHRoZW4gc2F2ZSB0aGUgZm9ybSBhdCBsb2NhbCBzdG9yYWdlIGFuZCBnbyB0byBzZWFyY2ggUmVzdWx0c1xyXG4gICAgICBpZiAoIWFkdWx0LmVuTXNnICYmIWNoaWxkLmVuTXNnICYmIWluZmFudC5lbk1zZyAmJiFkZXBEYXRlLmVuTXNnICYmICFyZXREYXRlPy5lbk1zZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNlYXJjaHJlc3VsdExpbmsobGFuZyxjdXJyZW5jeSxwb2ludE9mU2FsZSxzcGlsdEluZGV4LHNwbGl0UGF0dGVybik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHsgYWR1bHQsIGNoaWxkLCBpbmZhbnQsIHJldERhdGUsIGRlcERhdGUgfTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gZGVzdG9yeSBhbnkgb3BlbmVkIHN1YnNjcmlwdGlvbiBvbiB0aGlzIHNlcnZpY2VcclxuICAgKi9cclxuICBkZXN0cm95ZXIoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=