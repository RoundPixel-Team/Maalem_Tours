import { Injectable, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FlightCheckoutApiService } from './flight-checkout-api.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomePageService } from '../../home-page/services/home-page.service';
import * as i0 from "@angular/core";
export class FlightCheckoutService {
    constructor() {
        this.api = inject(FlightCheckoutApiService);
        this.home = inject(HomePageService);
        this.subscription = new Subscription();
        this.serviceFees = 0;
        this.yesOrNoVaild = false;
        this.packageVaild = false;
        this.addbuttonVaild = false;
        /**
         * here is the loaded selected data
         */
        this.selectedFlight = undefined;
        /**
         * here is all the loaded offline services
         */
        this.allOfflineServices = [];
        /**
         * here is the chosen/selected offline service
         */
        this.selectedOfflineServices = [];
        /**
         * here is all loaded offline services orgnized and grouped by type
         */
        this.organizedOfllineServices = [];
        /**
         * type of booking in checkout
         */
        this.bookingType = 'standard';
        /**
         * here is the price with the recommened offline service added
         */
        this.priceWithRecommenedService = 0;
        /**
         * offline services loading state ..
         */
        this.offlineServicesLoader = false;
        /**
         * loading state ..
         */
        this.loader = false;
        /**
         * applying copoun code loading state ..
         */
        this.copounCodeLoader = false;
        /**
         * this is containing the error while applying copoun code
         */
        this.copounCodeError = '';
        /**
         * this is the main form for the checkout which contains all users array forms
         */
        this.usersForm = new FormGroup({
            users: new FormArray([])
        });
        /**
         * passengers fare disscount varriables
         */
        this.fareDisscount = [0, '', ''];
        this.paymentLink = new Subject();
        this.paymentLinkFailure = new Subject();
        /**
         * variable to hold the value of the selected flight language
         */
        this.selectedFlightLang = new Subject();
        /**
         * variable to hold the value of the offline services response
         */
        this.offlineServicesResponse = new Subject();
        /**errors varriables */
        this.selectedFlightError = false;
    }
    /**
     * this is a getter to return the users array forms (users) from the main form (usersForm)
     */
    get usersArray() {
        return this.usersForm.get("users");
    }
    /**
     * this is a getter to return the users array forms (users) from the main form (usersForm)
     */
    usersArrayFunc() {
        return this.usersForm.get("users");
    }
    /**
     *
     * @param searchId
     * @param sequenceNum
     * @param providerKey
     * this is for fetching the selected flight data and update selected flight state (selectedFlight:selectedFlight)
     * also update loader state
     */
    getSelectedFlightData(searchId, sequenceNum, providerKey) {
        this.loader = true;
        this.subscription.add(this.api.getSelectedFlight(searchId, sequenceNum, providerKey).subscribe((res) => {
            if (res) {
                // updating the selected flight state
                this.selectedFlight = res;
                // updating the loading state
                this.loader = false;
                if (res.status == 'Valid') {
                    this.priceWithRecommenedService += res.airItineraryDTO.itinTotalFare.amount;
                    // initilize users forms
                    this.buildUsersForm(res.searchCriteria.adultNum, res.searchCriteria.childNum, res.searchCriteria.infantNum, res.passportDetailsRequired);
                    this.fetchLastPassengerData();
                    // assign values to fare breakup and fare disscount
                    this.calculateFareBreakupDisscount();
                    this.calculatePassengersFareBreakupValue();
                    this.selectedFlightLang.next(res.searchCriteria.language);
                }
                else {
                    this.selectedFlightError = true;
                    console.log("now error happens");
                }
            }
        }, (err) => {
            console.log('get selected flight error ->', err);
            this.loader = false;
            this.selectedFlightError = true;
        }));
    }
    /**
     *
     * @param searchId
     * @param pos
     * this is for fetching the flight offline services data and update offline service state (offlineServices:flightOfflineServices[])
     * also update offlineServicesLoader state
     */
    getAllOfflineServices(url, multiTypes) {
        this.offlineServicesLoader = true;
        this.subscription.add(this.api.offlineServices(url).subscribe((res) => {
            this.allOfflineServices = [...res.map((s) => {
                    this.offlineServicesResponse.next(res);
                    if (s.recommended) {
                        this.recommendedOfflineService = s;
                        this.priceWithRecommenedService += this.recommendedOfflineService.servicePrice;
                        this.selectedOfflineServices.push(this.recommendedOfflineService.serviceCode);
                        return { ...s, added: true, interaction: true };
                    }
                    else {
                        return { ...s, added: false, interaction: false };
                    }
                })];
            if (multiTypes) {
                this.organizedOfllineServices = this.organizeOfflineServices(this.allOfflineServices);
            }
            this.offlineServicesLoader = false;
        }, (err) => {
            console.log('get selected flight offline services error ->', err);
            this.offlineServicesLoader = false;
        }));
    }
    /**
     *
     * @param data [all offline services data]
     * @returns offline services organized and grouped with the new logic
     */
    organizeOfflineServices(data) {
        let packageServices = data.filter((s) => { return s.serviceType == 'package'; });
        for (var i = 0; i < packageServices.length; i++) {
            let packageSubServices = packageServices.filter((s) => { return s.parentService == packageServices[i].parentService && s.serviceCode != packageServices[i].serviceCode; });
            packageServices[i].subServices = packageSubServices;
        }
        let allPackageServiceParents = [];
        if (packageServices.length > 0) {
            for (var i = 0; i < packageServices.length; i++) {
                allPackageServiceParents.push(packageServices[i].parentService || '');
            }
        }
        allPackageServiceParents = [...new Set([...allPackageServiceParents])];
        if (allPackageServiceParents.length > 0) {
            for (var i = 0; i < allPackageServiceParents.length; i++) {
                let firstParentMatch = packageServices.filter((s) => { return s.parentService == allPackageServiceParents[i]; })[0];
                packageServices = [...packageServices.filter((s) => { return s.parentService != allPackageServiceParents[i]; })];
                packageServices = [...packageServices, firstParentMatch];
            }
        }
        return [...data.filter((s) => { return s.serviceType != 'package'; })].concat(packageServices);
    }
    /**
     *
     * @param adults
     * @param childs
     * @param infants
     * @param passportFlag
     * this function is responsible for creating/building the checkout forms for each passenger according to number
     * of adults and childs and infants and updates the state of the form [usersForm]
     * it also build these forms depending on the paspport flag either required or not
     * if is been called automatically once the selected flight state is containg data
     */
    buildUsersForm(adults, childs, infants, passportFlag) {
        // build form when passports details are required
        if (passportFlag) {
            // build adults forms WITH paspport details
            for (var i = 0; i < adults; i++) {
                if (i == 0) {
                    this.usersArray.push(new FormGroup({
                        title: new FormControl("", [Validators.required]),
                        firstName: new FormControl("", [
                            Validators.required,
                            Validators.pattern("^[a-zA-Z]+"),
                            Validators.minLength(3),
                        ]),
                        middleName: new FormControl("", [
                            Validators.pattern("^[a-zA-Z]+"),
                            Validators.minLength(3),
                        ]),
                        lastName: new FormControl("", [
                            Validators.required,
                            Validators.pattern("^[a-zA-Z]+"),
                            Validators.minLength(3),
                        ]),
                        email: new FormControl("", [
                            Validators.required,
                            Validators.email,
                            Validators.minLength(9),
                        ]),
                        phoneNumber: new FormControl("", [
                            Validators.required,
                            Validators.maxLength(16),
                        ]),
                        countryCode: new FormControl(""),
                        nationality: new FormControl("", [
                            Validators.required
                        ]),
                        dateOfBirth: new FormControl("", [Validators.required]),
                        PassengerType: new FormControl("ADT"),
                        countryOfResidence: new FormControl("", [Validators.required]),
                        PassportNumber: new FormControl("", [Validators.required]),
                        PassportExpiry: new FormControl("", [Validators.required]),
                        IssuedCountry: new FormControl("", [Validators.required]),
                        position: new FormControl(this.usersArray.length + 1)
                    }));
                }
                else {
                    this.usersArray.push(new FormGroup({
                        title: new FormControl("", [Validators.required]),
                        firstName: new FormControl("", [
                            Validators.required,
                            Validators.pattern("^[a-zA-Z]+"),
                            Validators.minLength(3),
                        ]),
                        middleName: new FormControl("", [
                            Validators.pattern("^[a-zA-Z]+"),
                            Validators.minLength(3),
                        ]),
                        lastName: new FormControl("", [
                            Validators.required,
                            Validators.pattern("^[a-zA-Z]+"),
                            Validators.minLength(3),
                        ]),
                        email: new FormControl("", [
                            Validators.email,
                            Validators.minLength(9),
                        ]),
                        phoneNumber: new FormControl("", [
                            Validators.maxLength(16),
                        ]),
                        countryCode: new FormControl(""),
                        nationality: new FormControl("", [
                            Validators.required
                        ]),
                        dateOfBirth: new FormControl("", [Validators.required]),
                        PassengerType: new FormControl("ADT"),
                        countryOfResidence: new FormControl("", [Validators.required]),
                        PassportNumber: new FormControl("", [Validators.required]),
                        PassportExpiry: new FormControl("", [Validators.required]),
                        IssuedCountry: new FormControl("", [Validators.required]),
                        position: new FormControl(this.usersArray.length + 1)
                    }));
                }
            }
            // build childs forms WITH paspport details
            for (var i = 0; i < childs; i++) {
                this.usersArray.push(new FormGroup({
                    title: new FormControl("", [Validators.required]),
                    firstName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    middleName: new FormControl("", [
                        Validators.pattern("^[a-zA-Z]+"),
                        Validators.minLength(3),
                    ]),
                    lastName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    passportnum: new FormControl("", [Validators.max(16)]),
                    dateOfBirth: new FormControl("", [Validators.required]),
                    nationality: new FormControl("", [Validators.required]),
                    PassengerType: new FormControl("CNN"),
                    phoneNumber: new FormControl(""),
                    countryCode: new FormControl(""),
                    countryOfResidence: new FormControl("", [Validators.required]),
                    PassportNumber: new FormControl("", [Validators.required]),
                    PassportExpiry: new FormControl("", [Validators.required]),
                    IssuedCountry: new FormControl("", [Validators.required]),
                    position: new FormControl(this.usersArray.length)
                }));
            }
            // build infants forms WITH paspport details
            for (var i = 0; i < infants; i++) {
                this.usersArray.push(new FormGroup({
                    title: new FormControl("", [Validators.required]),
                    firstName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    middleName: new FormControl("", [
                        // Validators.required,
                        Validators.pattern("^[a-zA-Z]+"),
                        Validators.minLength(3),
                    ]),
                    lastName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    passportnum: new FormControl("", [Validators.maxLength(12)]),
                    dateOfBirth: new FormControl("", [Validators.required]),
                    nationality: new FormControl("", [Validators.required]),
                    PassengerType: new FormControl("INF"),
                    phoneNumber: new FormControl(""),
                    countryCode: new FormControl(""),
                    countryOfResidence: new FormControl("", [Validators.required]),
                    PassportNumber: new FormControl("", [Validators.required]),
                    PassportExpiry: new FormControl("", [Validators.required]),
                    IssuedCountry: new FormControl("", [Validators.required]),
                    position: new FormControl(this.usersArray.length)
                }));
            }
        }
        // build form when passports details are NOT required
        else {
            // build adults forms WITHOUT paspport details
            for (var i = 0; i < adults; i++) {
                this.usersArray.push(new FormGroup({
                    title: new FormControl("", [Validators.required]),
                    firstName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z]+"),
                        Validators.minLength(3),
                    ]),
                    middleName: new FormControl("", [
                        Validators.pattern("^[a-zA-Z]+"),
                        Validators.minLength(3),
                    ]),
                    lastName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z]+"),
                        Validators.minLength(3),
                    ]),
                    email: new FormControl("", [
                        Validators.required,
                        Validators.email,
                        Validators.minLength(9),
                    ]),
                    phoneNumber: new FormControl("", [
                        Validators.required,
                        Validators.maxLength(5),
                    ]),
                    countryCode: new FormControl(""),
                    nationality: new FormControl("", [
                        Validators.required
                    ]),
                    dateOfBirth: new FormControl("", [Validators.required]),
                    PassengerType: new FormControl("ADT"),
                    countryOfResidence: new FormControl("", [Validators.required]),
                    PassportNumber: new FormControl(""),
                    PassportExpiry: new FormControl(""),
                    IssuedCountry: new FormControl(""),
                    position: new FormControl(this.usersArray.length + 1)
                }));
            }
            // build childs forms WITHOUT paspport details
            for (var i = 0; i < childs; i++) {
                this.usersArray.push(new FormGroup({
                    title: new FormControl("", [Validators.required]),
                    firstName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    middleName: new FormControl("", [
                        Validators.pattern("^[a-zA-Z]+"),
                        Validators.minLength(3),
                    ]),
                    lastName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    passportnum: new FormControl("", [Validators.max(16)]),
                    dateOfBirth: new FormControl("", [Validators.required]),
                    nationality: new FormControl("", [Validators.required]),
                    PassengerType: new FormControl("CNN"),
                    phoneNumber: new FormControl(""),
                    countryCode: new FormControl(""),
                    countryOfResidence: new FormControl(""),
                    PassportNumber: new FormControl(""),
                    PassportExpiry: new FormControl(""),
                    IssuedCountry: new FormControl(""),
                    position: new FormControl(this.usersArray.length)
                }));
            }
            // build infants forms WITHOUT paspport details
            for (var i = 0; i < infants; i++) {
                this.usersArray.push(new FormGroup({
                    title: new FormControl("", [Validators.required]),
                    firstName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    middleName: new FormControl("", [
                        // Validators.required,
                        Validators.pattern("^[a-zA-Z]+"),
                        Validators.minLength(3),
                    ]),
                    lastName: new FormControl("", [
                        Validators.required,
                        Validators.pattern("^[a-zA-Z -']+"),
                        Validators.minLength(3),
                    ]),
                    passportnum: new FormControl("", [Validators.maxLength(12)]),
                    dateOfBirth: new FormControl("", [Validators.required]),
                    nationality: new FormControl("", [Validators.required]),
                    PassengerType: new FormControl("INF"),
                    phoneNumber: new FormControl(""),
                    countryCode: new FormControl(""),
                    countryOfResidence: new FormControl(""),
                    PassportNumber: new FormControl(""),
                    PassportExpiry: new FormControl(""),
                    IssuedCountry: new FormControl(""),
                    position: new FormControl(this.usersArray.length)
                }));
            }
        }
    }
    /**
     *
     * @param service
     * this for adding a new offline service with the selected flight
     * also adding offline service cost to the whole price
     */
    addOfflineService(service) {
        let serviceIndex = this.allOfflineServices.findIndex((s) => { return s.serviceCode == service.serviceCode; });
        this.selectedOfflineServices.push(service.serviceCode);
        if (this.selectedFlight != undefined) {
            this.selectedFlight.airItineraryDTO.itinTotalFare.amount += service.servicePrice;
            this.priceWithRecommenedService += service.servicePrice;
            this.serviceFees += service.servicePrice;
            //appear validation message based on boolean value
            switch (service.serviceType) {
                case 'addbutton':
                    this.addbuttonVaild = true;
                    break;
                case 'yes/no':
                    this.yesOrNoVaild = true;
                    break;
                case 'package':
                    this.packageVaild = true;
                    break;
            }
        }
        this.allOfflineServices[serviceIndex].added = true;
        this.allOfflineServices[serviceIndex].interaction = true;
    }
    /**
     *
     * @param service
     * this is to remove an already selected offline service with the selected flight
     * also removing offline service from the whole price
     */
    removeOfflineService(service) {
        let serviceIndex = this.allOfflineServices.findIndex((s) => { return s.serviceCode == service.serviceCode; });
        this.selectedOfflineServices = this.selectedOfflineServices.filter((s) => { return s != service.serviceCode; });
        if (this.selectedFlight != undefined) {
            //if interacted before 
            if (this.serviceFees == 0) {
                this.serviceFees = 0;
            }
            else {
                this.serviceFees -= service.servicePrice;
                this.priceWithRecommenedService -= service.servicePrice;
                this.selectedFlight.airItineraryDTO.itinTotalFare.amount -= service.servicePrice;
            }
            //appear validation message based on boolean value
            switch (service.serviceType) {
                case 'addbutton':
                    this.addbuttonVaild = true;
                    break;
                case 'yes/no':
                    this.yesOrNoVaild = true;
                    break;
                case 'package':
                    this.packageVaild = true;
                    break;
            }
        }
        this.allOfflineServices[serviceIndex].added = false;
        this.allOfflineServices[serviceIndex].interaction = true;
    }
    /**
     *
     * @param copounCode
     * @param searchId
     * @param sequenceNum
     * @param providerKey
     * check if the entered copoun code is valid and apply the disscount amount on the flight price
     * it updates the state of [copounCodeLoader : boolean]
     * it also updates the state of [copounCodeDetails:Copon]
     */
    applyCopounCode(copounCode, searchId, sequenceNum, providerKey) {
        this.copounCodeLoader = true;
        this.subscription.add(this.api.activateCobon(copounCode, searchId, sequenceNum, providerKey).subscribe((res) => {
            if (res) {
                // apply disscount on the selected flight price amount
                if (this.selectedFlight) {
                    this.copounCodeDetails = res;
                    this.selectedFlight.airItineraryDTO.itinTotalFare.amount -= res.promotionDetails.discountAmount;
                }
                this.copounCodeLoader = false;
            }
        }, (err) => {
            console.log("apply copoun code ERROR", err);
            this.copounCodeError = err;
            this.copounCodeLoader = false;
        }));
    }
    /**
     * this is responsible for assigning last passengers form value before last payment
     * it depends on local storage key called (lastPassengers) which contains data for array of passengers
     */
    fetchLastPassengerData() {
        if (localStorage.getItem('lastPassengers')) {
            this.usersArray.setValue(JSON.parse(localStorage.getItem('lastPassengers')));
        }
    }
    /**
     *
     * @returns error type either main form error (email & phone number) or passenger error (error happens while entering passengers data)
     * IT RETURNS (Valid) in the type of string this means that every thing is OK and ready to payment
     */
    validatePassengersForm() {
        let error = '';
        for (var i = 0; i < this.usersArray.length; i++) {
            if (i == 0 && this.usersArray.at(i).get('email')?.errors != null) {
                error = 'mainFormError';
                return 'mainFormError';
            }
            else if (this.usersArray.at(i).invalid) {
                error = 'passengersForm';
                return 'passengersForm';
            }
            else {
                error = 'Valid';
                return 'Valid';
            }
        }
        return error;
    }
    /**
     *
     * @param currentCurrency
     * here is the save booking function which returning the payment link if all params is good
     * it updates the behaviour subject (paymentLink) with the link
     * it also updates the behaviour subject (paymentLinkFailure) with the error
     */
    saveBooking(currentCurrency, type) {
        this.loader = true;
        this.subscription.add(this.api.saveBooking(this.selectedFlight?.searchCriteria.searchId, this.selectedFlight?.airItineraryDTO.sequenceNum, this.generateSaveBookingBodyParam(currentCurrency), this.selectedFlight?.airItineraryDTO.pKey.toString(), this.selectedFlight?.searchCriteria.language, type == 'premium' ? this.selectedOfflineServices : this.selectedOfflineServices.filter((s) => { return s != this.recommendedOfflineService?.serviceCode; }), this.home.pointOfSale.ip || "00.00.000.000", this.home.pointOfSale.country || 'kw')
            .subscribe((res) => {
            this.paymentLink.next(res);
            this.loader = false;
        }, (err) => {
            console.log("SAVE BOOKING ERROR", err);
            this.paymentLinkFailure.next(err);
            this.loader = false;
            this.selectedFlightError = true;
        }));
    }
    /**
     *
     * @param currentCurrency
     * @returns the passenger details (body param) needed by backend to make the save booking action
     */
    generateSaveBookingBodyParam(currentCurrency) {
        for (var i = 0; i < this.usersArray.length; i++) {
            if (this.usersArray.at(i).get('title').value == 'Male') {
                this.usersArray.at(i).get('title').setValue('Mr');
            }
            else if (this.usersArray.at(i).get('title').value == 'Female') {
                this.usersArray.at(i).get('title').setValue('Ms');
            }
            if (this.usersArray.at(i).get('phoneNumber')?.value != '') {
                this.usersArray.at(i).get('countryCode')?.setValue(this.usersArray.at(i).get('phoneNumber')?.value.dialCode.replace("+", ''));
                this.usersArray.at(i).get('phoneNumber')?.setValue(this.usersArray.at(i).get('phoneNumber')?.value.number);
            }
            this.usersArray.at(i).get('countryOfResidence')?.setValue(this.home.allCountries
                .filter(c => { return c.countryName == this.usersArray.at(i).get('countryOfResidence')?.value; })[0].pseudoCountryCode);
            this.usersArray.at(i).get('IssuedCountry')?.setValue(this.usersArray.at(i).get('countryOfResidence')?.value);
            this.usersArray.at(i).get('nationality')?.setValue(this.usersArray.at(i).get('countryOfResidence')?.value);
        }
        let object = {
            bookingEmail: this.usersArray.at(0).get('email')?.value,
            DiscountCode: this.copounCodeDetails?.promotionDetails.discountCode || '',
            passengersDetails: this.usersArray.value,
            UserCurrency: currentCurrency
        };
        return object;
    }
    //-----------------------> Starting Building Fare breakup Functionalities
    /**
     * this function is responsiple for getting disscount from passengers fare breakup
     * it also updates the disscount state fareDisscount : [number,string,string]
     */
    calculateFareBreakupDisscount() {
        if (this.selectedFlight?.airItineraryDTO.passengerFareBreakDownDTOs) {
            this.fareDisscount = this.returnPassTotalFarDifferance(this.selectedFlight.airItineraryDTO.passengerFareBreakDownDTOs, this.selectedFlight.airItineraryDTO.itinTotalFare.amount, this.selectedFlight.airItineraryDTO.itinTotalFare.totalTaxes, this.selectedFlight.airItineraryDTO.itinTotalFare.currencyCode, this.calcEqfare, this.returnCorrectFare);
        }
    }
    /**
     *
     * @param flightFaresDTO
     * @param totalAmount
     * @param totalTax
     * @param curruncy
     * @param calcEqfare
     * @param fareCalc
     * @returns value of discount or service fees
     */
    returnPassTotalFarDifferance(flightFaresDTO, totalAmount, totalTax, curruncy, calcEqfare, fareCalc) {
        let AdtFares = calcEqfare(flightFaresDTO, 'ADT', fareCalc);
        let childFare = calcEqfare(flightFaresDTO, 'CNN', fareCalc);
        let infentFare = calcEqfare(flightFaresDTO, 'INF', fareCalc);
        let TotalFare = AdtFares + childFare + infentFare + totalTax;
        let fareDiff = totalAmount - TotalFare;
        if (fareDiff > 0) {
            return [Math.round(fareDiff), 'Service Fees', curruncy];
        }
        else if (fareDiff < 0) {
            return [Math.round(-1 * fareDiff), 'Discount', curruncy];
        }
        else {
            return [0, '', 'KWD'];
        }
    }
    /**
    *
    * @param flightFaresDTO
    * @param type
    * @param farecalc
    * @returns numer of passenger * fare of passenger
    */
    calcEqfare(flightFaresDTO, type, farecalc) {
        let fare = farecalc(flightFaresDTO.filter((v) => v.passengerType === type)[0]?.flightFaresDTOs);
        let quntity = flightFaresDTO.find((v) => v.passengerType === type)?.passengerQuantity;
        return fare && quntity ? fare * quntity : 0;
    }
    /**
    *
    * @param fare
    * @returns validate equivelent fare
    */
    returnCorrectFare(fare) {
        if (fare) {
            let equivfare = fare.find(v => v.fareType.toLowerCase() === 'equivfare')?.fareAmount;
            let totalFare = fare.find(v => v.fareType.toLowerCase() === 'totalfare')?.fareAmount;
            let totalTax = fare.find(v => v.fareType.toLowerCase() === 'totaltax')?.fareAmount;
            if (equivfare != undefined && totalFare != undefined && totalTax != undefined) {
                return equivfare > 0 ? equivfare : totalFare - totalTax;
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    }
    /**
     *
     */
    calculatePassengersFareBreakupValue() {
        let AdtFares = this.selectedFlight?.airItineraryDTO.passengerFareBreakDownDTOs?.find(v => v.passengerType === 'ADT');
        let ChildFare = this.selectedFlight?.airItineraryDTO.passengerFareBreakDownDTOs?.find(v => v.passengerType === 'CNN');
        let infFare = this.selectedFlight?.airItineraryDTO.passengerFareBreakDownDTOs?.find(v => v.passengerType === 'INF');
        this.fareBreackup = {
            ADT: {
                totalFare: AdtFares ? this.returnPassTotalFar(AdtFares.flightFaresDTOs, AdtFares.passengerQuantity, this.returnCorrectFare) : [NaN, 'KWD'],
                ScFare: AdtFares ? this.returnPassFareScatterd(AdtFares.flightFaresDTOs, AdtFares.passengerQuantity, this.returnCorrectFare) : [NaN, 'KWD', NaN]
            },
            CNN: {
                totalFare: ChildFare ? this.returnPassTotalFar(ChildFare.flightFaresDTOs, ChildFare.passengerQuantity, this.returnCorrectFare) : [NaN, 'KWD'],
                ScFare: ChildFare ? this.returnPassFareScatterd(ChildFare.flightFaresDTOs, ChildFare.passengerQuantity, this.returnCorrectFare) : [NaN, 'KWD', NaN]
            },
            INF: {
                totalFare: infFare ? this.returnPassTotalFar(infFare.flightFaresDTOs, infFare.passengerQuantity, this.returnCorrectFare) : [NaN, 'KWD'],
                ScFare: infFare ? this.returnPassFareScatterd(infFare.flightFaresDTOs, infFare.passengerQuantity, this.returnCorrectFare) : [NaN, 'KWD', NaN]
            }
        };
    }
    /**
     *
     * @param flightFaresDTO
     * @param passNumber
     * @returns [total value ,curruncy code]
     */
    returnPassTotalFar(flightFaresDTO, passNumber, calcfare) {
        let Total = flightFaresDTO.filter(v => v.fareType.toLowerCase() === 'equivfare')[0];
        return Total ? [calcfare(flightFaresDTO) * passNumber, Total.currencyCode] : [NaN, 'KWD'];
    }
    /**
     *
     * @param flightFaresDTO
     * @param passNumber
     * @returns [total value per passenger ,curruncy code , number of passenger]
     */
    returnPassFareScatterd(flightFaresDTO, passNumber, calcfare) {
        let Total = flightFaresDTO.filter(v => v.fareType.toLowerCase() === 'equivfare')[0];
        return Total ? [calcfare(flightFaresDTO), Total.currencyCode, passNumber] : [NaN, 'KWD', NaN];
    }
    //-----------------------> End of Building Fare breakup Functionalities
    updatePackageServiceInteractionValidation(val) {
        this.packageVaild = val;
    }
    updateYesOrNoServiceInteractionValidation(val) {
        this.yesOrNoVaild = val;
    }
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer() {
        // this.subscription.unsubscribe()
        this.selectedFlight = undefined;
        this.allOfflineServices = [];
        this.selectedOfflineServices = [];
        this.recommendedOfflineService = undefined;
        this.priceWithRecommenedService = 0;
        this.offlineServicesLoader = false;
        this.loader = false;
        this.copounCodeLoader = false;
        this.copounCodeDetails = undefined;
        this.copounCodeError = '';
        this.usersForm = new FormGroup({
            users: new FormArray([])
        });
        this.fareDisscount = [0, '', ''];
        this.fareBreackup = undefined;
        this.paymentLink = new Subject();
        this.paymentLinkFailure = new Subject();
        this.selectedFlightLang = new Subject();
        this.offlineServicesResponse = new Subject();
        this.selectedFlightError = false;
        this.yesOrNoVaild = false;
        this.packageVaild = false;
        this.addbuttonVaild = false;
        this.serviceFees = 0;
        this.organizedOfllineServices = [];
    }
}
FlightCheckoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightCheckoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpZ2h0LWNoZWNrb3V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ycC10cmF2ZWwtdWkvc3JjL2xpYi9mbGlnaHQtY2hlY2tvdXQvc2VydmljZXMvZmxpZ2h0LWNoZWNrb3V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFvQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNENBQTRDLENBQUM7O0FBUzdFLE1BQU0sT0FBTyxxQkFBcUI7SUF3SGhDO1FBdkhBLFFBQUcsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtRQUN0QyxTQUFJLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzlCLGlCQUFZLEdBQWtCLElBQUksWUFBWSxFQUFFLENBQUE7UUFDaEQsZ0JBQVcsR0FBVSxDQUFDLENBQUM7UUFFdkIsaUJBQVksR0FBVyxLQUFLLENBQUM7UUFDN0IsaUJBQVksR0FBVyxLQUFLLENBQUU7UUFDOUIsbUJBQWMsR0FBVyxLQUFLLENBQUU7UUFFaEM7O1dBRUc7UUFDSCxtQkFBYyxHQUFnQyxTQUFTLENBQUE7UUFFdkQ7O1dBRUc7UUFDSCx1QkFBa0IsR0FBNEIsRUFBRSxDQUFBO1FBRWhEOztXQUVHO1FBQ0gsNEJBQXVCLEdBQWMsRUFBRSxDQUFBO1FBRXZDOztXQUVHO1FBQ0gsNkJBQXdCLEdBQTRCLEVBQUUsQ0FBQTtRQU14RDs7V0FFRztRQUNI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ZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRmxpZ2h0Q2hlY2tvdXRBcGlTZXJ2aWNlIH0gZnJvbSAnLi9mbGlnaHQtY2hlY2tvdXQtYXBpLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCcmVha0Rvd25WaWV3LCBDb2JvbiwgZmxpZ2h0T2ZmbGluZVNlcnZpY2UsIHBhc3NlbmdlcnNNb2RlbCwgc2VsZWN0ZWRGbGlnaHQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBwYXNzZW5nZXJGYXJlQnJlYWtEb3duRFRPcyxmYXJlIH0gZnJvbSAnLi4vLi4vZmxpZ2h0LXJlc3VsdC9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSG9tZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vaG9tZS1wYWdlL3NlcnZpY2VzL2hvbWUtcGFnZS5zZXJ2aWNlJztcclxuXHJcbnR5cGUgZmFyZUNhbGMgPSAoZmFyZTpmYXJlW10pPT5udW1iZXI7XHJcbnR5cGUgY2FsY0VxZmFyZSA9KGZsaWdodEZhcmVzRFRPOiBwYXNzZW5nZXJGYXJlQnJlYWtEb3duRFRPc1tdLHR5cGU6c3RyaW5nLGZhcmVjYWxjOmZhcmVDYWxjKT0+bnVtYmVyO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZsaWdodENoZWNrb3V0U2VydmljZSB7XHJcbiAgYXBpID0gaW5qZWN0KEZsaWdodENoZWNrb3V0QXBpU2VydmljZSlcclxuICBob21lID0gaW5qZWN0KEhvbWVQYWdlU2VydmljZSlcclxuICBzdWJzY3JpcHRpb24gOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKClcclxuICBzZXJ2aWNlRmVlczogbnVtYmVyPSAwO1xyXG5cclxuICB5ZXNPck5vVmFpbGQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIHBhY2thZ2VWYWlsZDpib29sZWFuID0gZmFsc2UgO1xyXG4gIGFkZGJ1dHRvblZhaWxkOmJvb2xlYW4gPSBmYWxzZSA7XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogaGVyZSBpcyB0aGUgbG9hZGVkIHNlbGVjdGVkIGRhdGEgXHJcbiAgICovXHJcbiAgc2VsZWN0ZWRGbGlnaHQgOiBzZWxlY3RlZEZsaWdodCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxyXG5cclxuICAvKipcclxuICAgKiBoZXJlIGlzIGFsbCB0aGUgbG9hZGVkIG9mZmxpbmUgc2VydmljZXNcclxuICAgKi9cclxuICBhbGxPZmZsaW5lU2VydmljZXMgOiBmbGlnaHRPZmZsaW5lU2VydmljZVtdID0gW11cclxuICBcclxuICAvKipcclxuICAgKiBoZXJlIGlzIHRoZSBjaG9zZW4vc2VsZWN0ZWQgb2ZmbGluZSBzZXJ2aWNlIFxyXG4gICAqL1xyXG4gIHNlbGVjdGVkT2ZmbGluZVNlcnZpY2VzIDogc3RyaW5nW10gPSBbXVxyXG5cclxuICAvKipcclxuICAgKiBoZXJlIGlzIGFsbCBsb2FkZWQgb2ZmbGluZSBzZXJ2aWNlcyBvcmduaXplZCBhbmQgZ3JvdXBlZCBieSB0eXBlIFxyXG4gICAqL1xyXG4gIG9yZ2FuaXplZE9mbGxpbmVTZXJ2aWNlcyA6IGZsaWdodE9mZmxpbmVTZXJ2aWNlW10gPSBbXVxyXG5cclxuICAvKipcclxuICAgKiBoZXJlIGlzIHRoZSByZWNvbW1lbmVkIHNlcnZpY2Ugd2hpY2ggaXMgYWRkZWQgdG8gdGhlIGNvc3QvdGlja2V0IGJ5IGRlZmF1bHRcclxuICAgKi9cclxuICByZWNvbW1lbmRlZE9mZmxpbmVTZXJ2aWNlISA6IGZsaWdodE9mZmxpbmVTZXJ2aWNlIHwgdW5kZWZpbmVkXHJcbi8qKlxyXG4gKiB0eXBlIG9mIGJvb2tpbmcgaW4gY2hlY2tvdXRcclxuICovXHJcbmJvb2tpbmdUeXBlOnN0cmluZz0nc3RhbmRhcmQnXHJcbiAgLyoqXHJcbiAgICogaGVyZSBpcyB0aGUgcHJpY2Ugd2l0aCB0aGUgcmVjb21tZW5lZCBvZmZsaW5lIHNlcnZpY2UgYWRkZWRcclxuICAgKi9cclxuICBwcmljZVdpdGhSZWNvbW1lbmVkU2VydmljZTogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIG9mZmxpbmUgc2VydmljZXMgbG9hZGluZyBzdGF0ZSAuLlxyXG4gICAqL1xyXG4gIG9mZmxpbmVTZXJ2aWNlc0xvYWRlciA6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbG9hZGluZyBzdGF0ZSAuLlxyXG4gICAqL1xyXG4gIGxvYWRlciA6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogYXBwbHlpbmcgY29wb3VuIGNvZGUgbG9hZGluZyBzdGF0ZSAuLlxyXG4gICAqL1xyXG4gIGNvcG91bkNvZGVMb2FkZXIgOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcyBjb250YWlucyBhbGwgdGhlIGFwcGxpZWQgY29wb24gY29kZSBkZXRhaWxzXHJcbiAgICovXHJcbiAgY29wb3VuQ29kZURldGFpbHMgOiBDb2JvbiB8IHVuZGVmaW5lZFxyXG5cclxuICAvKipcclxuICAgKiB0aGlzIGlzIGNvbnRhaW5pbmcgdGhlIGVycm9yIHdoaWxlIGFwcGx5aW5nIGNvcG91biBjb2RlXHJcbiAgICovXHJcbiAgY29wb3VuQ29kZUVycm9yIDogc3RyaW5nID0gJydcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMgaXMgdGhlIG1haW4gZm9ybSBmb3IgdGhlIGNoZWNrb3V0IHdoaWNoIGNvbnRhaW5zIGFsbCB1c2VycyBhcnJheSBmb3Jtc1xyXG4gICAqL1xyXG4gIHVzZXJzRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgdXNlcnMgOiBuZXcgRm9ybUFycmF5KFtdKVxyXG4gIH0pO1xyXG5cclxuICAvKipcclxuICAgKiB0aGlzIGlzIGEgZ2V0dGVyIHRvIHJldHVybiB0aGUgdXNlcnMgYXJyYXkgZm9ybXMgKHVzZXJzKSBmcm9tIHRoZSBtYWluIGZvcm0gKHVzZXJzRm9ybSlcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IHVzZXJzQXJyYXkoKSA6IEZvcm1BcnJheSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2Vyc0Zvcm0uZ2V0KFwidXNlcnNcIilhcyBGb3JtQXJyYXlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHBhc3NlbmdlcnMgZmFyZSBkaXNzY291bnQgdmFycmlhYmxlc1xyXG4gICAqL1xyXG4gIGZhcmVEaXNzY291bnQgOiBbbnVtYmVyLHN0cmluZyxzdHJpbmddID0gWzAsJycsJyddO1xyXG5cclxuICAvKipcclxuICAgKiBwYXNzZW5nZXJzIGZhcmUgYnJlYWt1cCB2YWx1ZXNcclxuICAgKi9cclxuICBmYXJlQnJlYWNrdXAgOiBCcmVha0Rvd25WaWV3IHwgdW5kZWZpbmVkXHJcblxyXG5cclxuICBwYXltZW50TGluayA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgcGF5bWVudExpbmtGYWlsdXJlID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogdmFyaWFibGUgdG8gaG9sZCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIGZsaWdodCBsYW5ndWFnZVxyXG4gICAqL1xyXG4gIHNlbGVjdGVkRmxpZ2h0TGFuZyA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIHZhcmlhYmxlIHRvIGhvbGQgdGhlIHZhbHVlIG9mIHRoZSBvZmZsaW5lIHNlcnZpY2VzIHJlc3BvbnNlXHJcbiAgICovXHJcbiAgb2ZmbGluZVNlcnZpY2VzUmVzcG9uc2UgPSBuZXcgU3ViamVjdDxmbGlnaHRPZmZsaW5lU2VydmljZVtdPigpO1xyXG5cclxuICAvKiplcnJvcnMgdmFycmlhYmxlcyAqL1xyXG4gIHNlbGVjdGVkRmxpZ2h0RXJyb3IgOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcyBpcyBhIGdldHRlciB0byByZXR1cm4gdGhlIHVzZXJzIGFycmF5IGZvcm1zICh1c2VycykgZnJvbSB0aGUgbWFpbiBmb3JtICh1c2Vyc0Zvcm0pXHJcbiAgICovXHJcbiAgdXNlcnNBcnJheUZ1bmMoKSA6IEZvcm1BcnJheSB7XHJcbiAgICByZXR1cm4gdGhpcy51c2Vyc0Zvcm0uZ2V0KFwidXNlcnNcIilhcyBGb3JtQXJyYXlcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHNlYXJjaElkIFxyXG4gICAqIEBwYXJhbSBzZXF1ZW5jZU51bSBcclxuICAgKiBAcGFyYW0gcHJvdmlkZXJLZXkgXHJcbiAgICogdGhpcyBpcyBmb3IgZmV0Y2hpbmcgdGhlIHNlbGVjdGVkIGZsaWdodCBkYXRhIGFuZCB1cGRhdGUgc2VsZWN0ZWQgZmxpZ2h0IHN0YXRlIChzZWxlY3RlZEZsaWdodDpzZWxlY3RlZEZsaWdodClcclxuICAgKiBhbHNvIHVwZGF0ZSBsb2FkZXIgc3RhdGVcclxuICAgKi9cclxuICBnZXRTZWxlY3RlZEZsaWdodERhdGEoc2VhcmNoSWQ6c3RyaW5nLHNlcXVlbmNlTnVtOm51bWJlcixwcm92aWRlcktleTpudW1iZXIpe1xyXG4gICAgdGhpcy5sb2FkZXIgPSB0cnVlXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgIHRoaXMuYXBpLmdldFNlbGVjdGVkRmxpZ2h0KHNlYXJjaElkLHNlcXVlbmNlTnVtLHByb3ZpZGVyS2V5KS5zdWJzY3JpYmUoKHJlczpzZWxlY3RlZEZsaWdodCk9PntcclxuICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgLy8gdXBkYXRpbmcgdGhlIHNlbGVjdGVkIGZsaWdodCBzdGF0ZVxyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodCA9IHJlc1xyXG4gICAgICAgICAgLy8gdXBkYXRpbmcgdGhlIGxvYWRpbmcgc3RhdGVcclxuICAgICAgICAgIHRoaXMubG9hZGVyID0gZmFsc2VcclxuICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPT0gJ1ZhbGlkJyl7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2VXaXRoUmVjb21tZW5lZFNlcnZpY2UgKz0gcmVzLmFpckl0aW5lcmFyeURUTy5pdGluVG90YWxGYXJlLmFtb3VudFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gaW5pdGlsaXplIHVzZXJzIGZvcm1zXHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRVc2Vyc0Zvcm0oXHJcbiAgICAgICAgICAgICAgcmVzLnNlYXJjaENyaXRlcmlhLmFkdWx0TnVtLFxyXG4gICAgICAgICAgICAgIHJlcy5zZWFyY2hDcml0ZXJpYS5jaGlsZE51bSxcclxuICAgICAgICAgICAgICByZXMuc2VhcmNoQ3JpdGVyaWEuaW5mYW50TnVtLFxyXG4gICAgICAgICAgICAgIHJlcy5wYXNzcG9ydERldGFpbHNSZXF1aXJlZClcclxuICAgICAgICAgICAgICB0aGlzLmZldGNoTGFzdFBhc3NlbmdlckRhdGEoKVxyXG5cclxuICAgICAgICAgICAgICAvLyBhc3NpZ24gdmFsdWVzIHRvIGZhcmUgYnJlYWt1cCBhbmQgZmFyZSBkaXNzY291bnRcclxuICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUZhcmVCcmVha3VwRGlzc2NvdW50KClcclxuICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVBhc3NlbmdlcnNGYXJlQnJlYWt1cFZhbHVlKClcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRmxpZ2h0TGFuZy5uZXh0KHJlcy5zZWFyY2hDcml0ZXJpYS5sYW5ndWFnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodEVycm9yID0gdHJ1ZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdyBlcnJvciBoYXBwZW5zXCIpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSwoZXJyOmFueSk9PntcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0IHNlbGVjdGVkIGZsaWdodCBlcnJvciAtPicsZXJyKVxyXG4gICAgICAgIHRoaXMubG9hZGVyID0gZmFsc2VcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRmxpZ2h0RXJyb3IgPSB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gc2VhcmNoSWQgXHJcbiAgICogQHBhcmFtIHBvcyBcclxuICAgKiB0aGlzIGlzIGZvciBmZXRjaGluZyB0aGUgZmxpZ2h0IG9mZmxpbmUgc2VydmljZXMgZGF0YSBhbmQgdXBkYXRlIG9mZmxpbmUgc2VydmljZSBzdGF0ZSAob2ZmbGluZVNlcnZpY2VzOmZsaWdodE9mZmxpbmVTZXJ2aWNlc1tdKVxyXG4gICAqIGFsc28gdXBkYXRlIG9mZmxpbmVTZXJ2aWNlc0xvYWRlciBzdGF0ZVxyXG4gICAqL1xyXG4gIGdldEFsbE9mZmxpbmVTZXJ2aWNlcyh1cmw6c3RyaW5nLG11bHRpVHlwZXM6Ym9vbGVhbil7XHJcbiAgICB0aGlzLm9mZmxpbmVTZXJ2aWNlc0xvYWRlciA9IHRydWVcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgdGhpcy5hcGkub2ZmbGluZVNlcnZpY2VzKHVybCkuc3Vic2NyaWJlKChyZXMpPT57XHJcbiAgICAgICAgdGhpcy5hbGxPZmZsaW5lU2VydmljZXMgPSBbLi4ucmVzLm1hcCgocyk9PntcclxuICAgICAgICB0aGlzLm9mZmxpbmVTZXJ2aWNlc1Jlc3BvbnNlLm5leHQocmVzKVxyXG4gICAgICAgICAgaWYocy5yZWNvbW1lbmRlZCl7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb21tZW5kZWRPZmZsaW5lU2VydmljZSA9IHNcclxuICAgICAgICAgICAgdGhpcy5wcmljZVdpdGhSZWNvbW1lbmVkU2VydmljZSArPSB0aGlzLnJlY29tbWVuZGVkT2ZmbGluZVNlcnZpY2Uuc2VydmljZVByaWNlXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPZmZsaW5lU2VydmljZXMucHVzaCh0aGlzLnJlY29tbWVuZGVkT2ZmbGluZVNlcnZpY2Uuc2VydmljZUNvZGUpXHJcbiAgICAgICAgICAgIHJldHVybiB7Li4ucyxhZGRlZDp0cnVlLGludGVyYWN0aW9uOnRydWV9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gey4uLnMsYWRkZWQ6ZmFsc2UsaW50ZXJhY3Rpb246ZmFsc2V9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICB9KV1cclxuICAgICAgICBpZihtdWx0aVR5cGVzKXtcclxuICAgICAgICAgIHRoaXMub3JnYW5pemVkT2ZsbGluZVNlcnZpY2VzID0gdGhpcy5vcmdhbml6ZU9mZmxpbmVTZXJ2aWNlcyh0aGlzLmFsbE9mZmxpbmVTZXJ2aWNlcylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZmZsaW5lU2VydmljZXNMb2FkZXIgPSBmYWxzZVxyXG4gICAgICB9LChlcnIpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldCBzZWxlY3RlZCBmbGlnaHQgb2ZmbGluZSBzZXJ2aWNlcyBlcnJvciAtPicsZXJyKVxyXG4gICAgICAgIHRoaXMub2ZmbGluZVNlcnZpY2VzTG9hZGVyID0gZmFsc2VcclxuICAgICAgfSlcclxuICAgIClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBkYXRhIFthbGwgb2ZmbGluZSBzZXJ2aWNlcyBkYXRhXVxyXG4gICAqIEByZXR1cm5zIG9mZmxpbmUgc2VydmljZXMgb3JnYW5pemVkIGFuZCBncm91cGVkIHdpdGggdGhlIG5ldyBsb2dpY1xyXG4gICAqL1xyXG4gIG9yZ2FuaXplT2ZmbGluZVNlcnZpY2VzKGRhdGE6ZmxpZ2h0T2ZmbGluZVNlcnZpY2VbXSk6ZmxpZ2h0T2ZmbGluZVNlcnZpY2VbXXtcclxuICAgIGxldCBwYWNrYWdlU2VydmljZXM6ZmxpZ2h0T2ZmbGluZVNlcnZpY2VbXSA9IGRhdGEuZmlsdGVyKChzKT0+e3JldHVybiBzLnNlcnZpY2VUeXBlID09ICdwYWNrYWdlJ30pXHJcbiAgICBmb3IodmFyIGkgPSAwIDsgaTxwYWNrYWdlU2VydmljZXMubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgbGV0IHBhY2thZ2VTdWJTZXJ2aWNlcyA9IHBhY2thZ2VTZXJ2aWNlcy5maWx0ZXIoKHMpPT57cmV0dXJuIHMucGFyZW50U2VydmljZSA9PSBwYWNrYWdlU2VydmljZXNbaV0ucGFyZW50U2VydmljZSAmJiBzLnNlcnZpY2VDb2RlICE9IHBhY2thZ2VTZXJ2aWNlc1tpXS5zZXJ2aWNlQ29kZX0pXHJcbiAgICAgICAgcGFja2FnZVNlcnZpY2VzW2ldLnN1YlNlcnZpY2VzID0gcGFja2FnZVN1YlNlcnZpY2VzXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFsbFBhY2thZ2VTZXJ2aWNlUGFyZW50czpzdHJpbmcgW10gPSBbXVxyXG4gICAgaWYocGFja2FnZVNlcnZpY2VzLmxlbmd0aD4wKXtcclxuICAgICAgZm9yKHZhciBpID0gMCA7IGk8cGFja2FnZVNlcnZpY2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBhbGxQYWNrYWdlU2VydmljZVBhcmVudHMucHVzaChwYWNrYWdlU2VydmljZXNbaV0ucGFyZW50U2VydmljZSB8fCAnJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWxsUGFja2FnZVNlcnZpY2VQYXJlbnRzID0gWy4uLm5ldyBTZXQoWy4uLmFsbFBhY2thZ2VTZXJ2aWNlUGFyZW50c10pXVxyXG4gICAgXHJcbiAgICBpZihhbGxQYWNrYWdlU2VydmljZVBhcmVudHMubGVuZ3RoID4gMCl7XHJcbiAgICAgIGZvcih2YXIgaSA9MDtpPGFsbFBhY2thZ2VTZXJ2aWNlUGFyZW50cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgbGV0IGZpcnN0UGFyZW50TWF0Y2ggOiBmbGlnaHRPZmZsaW5lU2VydmljZSA9IHBhY2thZ2VTZXJ2aWNlcy5maWx0ZXIoKHMpPT57cmV0dXJuIHMucGFyZW50U2VydmljZSA9PSBhbGxQYWNrYWdlU2VydmljZVBhcmVudHNbaV19KVswXVxyXG4gICAgICAgIHBhY2thZ2VTZXJ2aWNlcyA9IFsuLi5wYWNrYWdlU2VydmljZXMuZmlsdGVyKChzKT0+e3JldHVybiBzLnBhcmVudFNlcnZpY2UgIT0gYWxsUGFja2FnZVNlcnZpY2VQYXJlbnRzW2ldfSldXHJcbiAgICAgICAgcGFja2FnZVNlcnZpY2VzID0gWy4uLnBhY2thZ2VTZXJ2aWNlcyxmaXJzdFBhcmVudE1hdGNoXVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFsuLi5kYXRhLmZpbHRlcigocyk9PntyZXR1cm4gcy5zZXJ2aWNlVHlwZSAhPSAncGFja2FnZSd9KV0uY29uY2F0KHBhY2thZ2VTZXJ2aWNlcylcclxuICB9XHJcbiAgXHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gYWR1bHRzIFxyXG4gICAqIEBwYXJhbSBjaGlsZHMgXHJcbiAgICogQHBhcmFtIGluZmFudHMgXHJcbiAgICogQHBhcmFtIHBhc3Nwb3J0RmxhZ1xyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nL2J1aWxkaW5nIHRoZSBjaGVja291dCBmb3JtcyBmb3IgZWFjaCBwYXNzZW5nZXIgYWNjb3JkaW5nIHRvIG51bWJlclxyXG4gICAqIG9mIGFkdWx0cyBhbmQgY2hpbGRzIGFuZCBpbmZhbnRzIGFuZCB1cGRhdGVzIHRoZSBzdGF0ZSBvZiB0aGUgZm9ybSBbdXNlcnNGb3JtXVxyXG4gICAqIGl0IGFsc28gYnVpbGQgdGhlc2UgZm9ybXMgZGVwZW5kaW5nIG9uIHRoZSBwYXNwcG9ydCBmbGFnIGVpdGhlciByZXF1aXJlZCBvciBub3RcclxuICAgKiBpZiBpcyBiZWVuIGNhbGxlZCBhdXRvbWF0aWNhbGx5IG9uY2UgdGhlIHNlbGVjdGVkIGZsaWdodCBzdGF0ZSBpcyBjb250YWluZyBkYXRhIFxyXG4gICAqL1xyXG4gIGJ1aWxkVXNlcnNGb3JtKGFkdWx0czpudW1iZXIsY2hpbGRzOm51bWJlcixpbmZhbnRzOm51bWJlcixwYXNzcG9ydEZsYWc6Ym9vbGVhbil7XHJcbiAgICAvLyBidWlsZCBmb3JtIHdoZW4gcGFzc3BvcnRzIGRldGFpbHMgYXJlIHJlcXVpcmVkXHJcbiAgICBpZihwYXNzcG9ydEZsYWcpe1xyXG5cclxuICAgICAgLy8gYnVpbGQgYWR1bHRzIGZvcm1zIFdJVEggcGFzcHBvcnQgZGV0YWlsc1xyXG4gICAgICBmb3IodmFyIGkgPSAwIDsgaTxhZHVsdHMgOyBpKyspe1xyXG4gICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgdGhpcy51c2Vyc0FycmF5LnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgICBmaXJzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKFwiXlthLXpBLVpdK1wiKSxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgIG1pZGRsZU5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXCJeW2EtekEtWl0rXCIpLFxyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXHJcbiAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKFwiXlthLXpBLVpdK1wiKSxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgIGVtYWlsOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuZW1haWwsXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCg5KSxcclxuICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICBwaG9uZU51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLm1heExlbmd0aCgxNiksXHJcbiAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgY291bnRyeUNvZGU6IG5ldyBGb3JtQ29udHJvbChcIlwiKSxcclxuICAgICAgICAgICAgICBuYXRpb25hbGl0eTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWRcclxuICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICBkYXRlT2ZCaXJ0aDogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgICAgUGFzc2VuZ2VyVHlwZTogbmV3IEZvcm1Db250cm9sKFwiQURUXCIpLFxyXG4gICAgICAgICAgICAgIGNvdW50cnlPZlJlc2lkZW5jZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgICAgUGFzc3BvcnROdW1iZXI6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICAgIFBhc3Nwb3J0RXhwaXJ5OiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgICBJc3N1ZWRDb3VudHJ5OiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IEZvcm1Db250cm9sKHRoaXMudXNlcnNBcnJheS5sZW5ndGggKyAxKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgdGhpcy51c2Vyc0FycmF5LnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgICBmaXJzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKFwiXlthLXpBLVpdK1wiKSxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgIG1pZGRsZU5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXCJeW2EtekEtWl0rXCIpLFxyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXHJcbiAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKFwiXlthLXpBLVpdK1wiKSxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgIGVtYWlsOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5lbWFpbCxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDkpLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgIHBob25lTnVtYmVyOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMTYpLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICAgICAgbmF0aW9uYWxpdHk6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgICAgZGF0ZU9mQmlydGg6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICAgIFBhc3NlbmdlclR5cGU6IG5ldyBGb3JtQ29udHJvbChcIkFEVFwiKSxcclxuICAgICAgICAgICAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICAgIFBhc3Nwb3J0TnVtYmVyOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgICBQYXNzcG9ydEV4cGlyeTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgICAgSXNzdWVkQ291bnRyeTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBGb3JtQ29udHJvbCh0aGlzLnVzZXJzQXJyYXkubGVuZ3RoICsgMSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGJ1aWxkIGNoaWxkcyBmb3JtcyBXSVRIIHBhc3Bwb3J0IGRldGFpbHNcclxuICAgICAgZm9yKHZhciBpID0gMCA7IGk8Y2hpbGRzIDsgaSsrKXtcclxuICAgICAgICAgIHRoaXMudXNlcnNBcnJheS5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICAgICAgICB0aXRsZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aIC0nXStcIiksXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKSxcclxuICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICBtaWRkbGVOYW1lOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKFwiXlthLXpBLVpdK1wiKSxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICAgIGxhc3ROYW1lOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aIC0nXStcIiksXHJcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKSxcclxuICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICBwYXNzcG9ydG51bTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLm1heCgxNildKSxcclxuICAgICAgICAgICAgICBkYXRlT2ZCaXJ0aDogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgICAgbmF0aW9uYWxpdHk6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICAgIFBhc3NlbmdlclR5cGU6IG5ldyBGb3JtQ29udHJvbChcIkNOTlwiKSxcclxuICAgICAgICAgICAgICBwaG9uZU51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICAgICAgY291bnRyeU9mUmVzaWRlbmNlOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgICBQYXNzcG9ydE51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgICAgUGFzc3BvcnRFeHBpcnk6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICAgIElzc3VlZENvdW50cnk6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgRm9ybUNvbnRyb2wodGhpcy51c2Vyc0FycmF5Lmxlbmd0aClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIClcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYnVpbGQgaW5mYW50cyBmb3JtcyBXSVRIIHBhc3Bwb3J0IGRldGFpbHNcclxuICAgICAgZm9yKHZhciBpID0gMCA7IGk8aW5mYW50cyA7IGkrKyl7XHJcbiAgICAgICAgdGhpcy51c2Vyc0FycmF5LnB1c2goXHJcbiAgICAgICAgICBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICAgICAgdGl0bGU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXCJeW2EtekEtWiAtJ10rXCIpLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgbWlkZGxlTmFtZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICAvLyBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aXStcIiksXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aIC0nXStcIiksXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIHBhc3Nwb3J0bnVtOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMubWF4TGVuZ3RoKDEyKV0pLFxyXG4gICAgICAgICAgICBkYXRlT2ZCaXJ0aDogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgIG5hdGlvbmFsaXR5OiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgUGFzc2VuZ2VyVHlwZTogbmV3IEZvcm1Db250cm9sKFwiSU5GXCIpLFxyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgICBjb3VudHJ5Q29kZTogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICBQYXNzcG9ydE51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgIFBhc3Nwb3J0RXhwaXJ5OiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgSXNzdWVkQ291bnRyeTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgRm9ybUNvbnRyb2wodGhpcy51c2Vyc0FycmF5Lmxlbmd0aClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnVpbGQgZm9ybSB3aGVuIHBhc3Nwb3J0cyBkZXRhaWxzIGFyZSBOT1QgcmVxdWlyZWRcclxuICAgIGVsc2V7XHJcbiAgICAgIC8vIGJ1aWxkIGFkdWx0cyBmb3JtcyBXSVRIT1VUIHBhc3Bwb3J0IGRldGFpbHNcclxuICAgICAgZm9yKHZhciBpID0gMCA7IGk8YWR1bHRzIDsgaSsrKXtcclxuICAgICAgICB0aGlzLnVzZXJzQXJyYXkucHVzaChcclxuICAgICAgICAgIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICB0aXRsZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aXStcIiksXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBtaWRkbGVOYW1lOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aXStcIiksXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aXStcIiksXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBlbWFpbDogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMuZW1haWwsXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoOSksXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDUpLFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgY291bnRyeUNvZGU6IG5ldyBGb3JtQ29udHJvbChcIlwiKSxcclxuICAgICAgICAgICAgbmF0aW9uYWxpdHk6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgZGF0ZU9mQmlydGg6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICBQYXNzZW5nZXJUeXBlOiBuZXcgRm9ybUNvbnRyb2woXCJBRFRcIiksXHJcbiAgICAgICAgICAgIGNvdW50cnlPZlJlc2lkZW5jZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICAgIFBhc3Nwb3J0TnVtYmVyOiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICAgIFBhc3Nwb3J0RXhwaXJ5OiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICAgIElzc3VlZENvdW50cnk6IG5ldyBGb3JtQ29udHJvbChcIlwiKSxcclxuICAgICAgICAgICAgcG9zaXRpb246IG5ldyBGb3JtQ29udHJvbCh0aGlzLnVzZXJzQXJyYXkubGVuZ3RoICsgMSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBidWlsZCBjaGlsZHMgZm9ybXMgV0lUSE9VVCBwYXNwcG9ydCBkZXRhaWxzXHJcbiAgICAgIGZvcih2YXIgaSA9IDAgOyBpPGNoaWxkcyA7IGkrKyl7XHJcbiAgICAgICAgdGhpcy51c2Vyc0FycmF5LnB1c2goXHJcbiAgICAgICAgICBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICAgICAgdGl0bGU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXCJeW2EtekEtWiAtJ10rXCIpLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgbWlkZGxlTmFtZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXCJeW2EtekEtWl0rXCIpLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXCJeW2EtekEtWiAtJ10rXCIpLFxyXG4gICAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgcGFzc3BvcnRudW06IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5tYXgoMTYpXSksXHJcbiAgICAgICAgICAgIGRhdGVPZkJpcnRoOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICAgICAgbmF0aW9uYWxpdHk6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgICBQYXNzZW5nZXJUeXBlOiBuZXcgRm9ybUNvbnRyb2woXCJDTk5cIiksXHJcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICAgIGNvdW50cnlDb2RlOiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICAgIGNvdW50cnlPZlJlc2lkZW5jZTogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgICBQYXNzcG9ydE51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgICBQYXNzcG9ydEV4cGlyeTogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgICBJc3N1ZWRDb3VudHJ5OiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgRm9ybUNvbnRyb2wodGhpcy51c2Vyc0FycmF5Lmxlbmd0aClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGJ1aWxkIGluZmFudHMgZm9ybXMgV0lUSE9VVCBwYXNwcG9ydCBkZXRhaWxzXHJcbiAgICBmb3IodmFyIGkgPSAwIDsgaTxpbmZhbnRzIDsgaSsrKXtcclxuICAgICAgdGhpcy51c2Vyc0FycmF5LnB1c2goXHJcbiAgICAgICAgbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgICB0aXRsZTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgICAgICBmaXJzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aIC0nXStcIiksXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLFxyXG4gICAgICAgICAgXSksXHJcbiAgICAgICAgICBtaWRkbGVOYW1lOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICAgICAgICAvLyBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXCJeW2EtekEtWl0rXCIpLFxyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCgzKSxcclxuICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgbGFzdE5hbWU6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMucGF0dGVybihcIl5bYS16QS1aIC0nXStcIiksXHJcbiAgICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDMpLCAgICAgICAgICAgICAgXHJcbiAgICAgICAgICBdKSxcclxuICAgICAgICAgIHBhc3Nwb3J0bnVtOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1ZhbGlkYXRvcnMubWF4TGVuZ3RoKDEyKV0pLFxyXG4gICAgICAgICAgZGF0ZU9mQmlydGg6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgbmF0aW9uYWxpdHk6IG5ldyBGb3JtQ29udHJvbChcIlwiLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgICAgUGFzc2VuZ2VyVHlwZTogbmV3IEZvcm1Db250cm9sKFwiSU5GXCIpLFxyXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IG5ldyBGb3JtQ29udHJvbChcIlwiKSxcclxuICAgICAgICAgIGNvdW50cnlDb2RlOiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICBjb3VudHJ5T2ZSZXNpZGVuY2U6IG5ldyBGb3JtQ29udHJvbChcIlwiKSxcclxuICAgICAgICAgIFBhc3Nwb3J0TnVtYmVyOiBuZXcgRm9ybUNvbnRyb2woXCJcIiksXHJcbiAgICAgICAgICBQYXNzcG9ydEV4cGlyeTogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgSXNzdWVkQ291bnRyeTogbmV3IEZvcm1Db250cm9sKFwiXCIpLFxyXG4gICAgICAgICAgcG9zaXRpb246IG5ldyBGb3JtQ29udHJvbCh0aGlzLnVzZXJzQXJyYXkubGVuZ3RoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gc2VydmljZSBcclxuICAgKiB0aGlzIGZvciBhZGRpbmcgYSBuZXcgb2ZmbGluZSBzZXJ2aWNlIHdpdGggdGhlIHNlbGVjdGVkIGZsaWdodFxyXG4gICAqIGFsc28gYWRkaW5nIG9mZmxpbmUgc2VydmljZSBjb3N0IHRvIHRoZSB3aG9sZSBwcmljZVxyXG4gICAqL1xyXG4gIGFkZE9mZmxpbmVTZXJ2aWNlKHNlcnZpY2UgOiBmbGlnaHRPZmZsaW5lU2VydmljZSl7XHJcbiAgICBsZXQgc2VydmljZUluZGV4ID0gdGhpcy5hbGxPZmZsaW5lU2VydmljZXMuZmluZEluZGV4KChzKT0+e3JldHVybiBzLnNlcnZpY2VDb2RlID09IHNlcnZpY2Uuc2VydmljZUNvZGV9KVxyXG4gICAgdGhpcy5zZWxlY3RlZE9mZmxpbmVTZXJ2aWNlcy5wdXNoKHNlcnZpY2Uuc2VydmljZUNvZGUpXHJcbiAgICBpZih0aGlzLnNlbGVjdGVkRmxpZ2h0ICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRGbGlnaHQuYWlySXRpbmVyYXJ5RFRPLml0aW5Ub3RhbEZhcmUuYW1vdW50ICs9IHNlcnZpY2Uuc2VydmljZVByaWNlXHJcbiAgICAgIHRoaXMucHJpY2VXaXRoUmVjb21tZW5lZFNlcnZpY2UgKz0gc2VydmljZS5zZXJ2aWNlUHJpY2VcclxuICAgICAgdGhpcy5zZXJ2aWNlRmVlcyArPSBzZXJ2aWNlLnNlcnZpY2VQcmljZTsgICAgXHJcbiAgICAgICAgIC8vYXBwZWFyIHZhbGlkYXRpb24gbWVzc2FnZSBiYXNlZCBvbiBib29sZWFuIHZhbHVlXHJcbiAgICAgICAgIHN3aXRjaChzZXJ2aWNlLnNlcnZpY2VUeXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdhZGRidXR0b24nOiAgXHJcbiAgICAgICAgICAgIHRoaXMuYWRkYnV0dG9uVmFpbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgXHJcbiAgICAgICAgICBjYXNlICd5ZXMvbm8nOlxyXG4gICAgICAgICAgICB0aGlzLnllc09yTm9WYWlsZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAncGFja2FnZSc6XHJcbiAgICAgICAgICAgIHRoaXMucGFja2FnZVZhaWxkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5hbGxPZmZsaW5lU2VydmljZXNbc2VydmljZUluZGV4XS5hZGRlZCA9IHRydWVcclxuICAgIHRoaXMuYWxsT2ZmbGluZVNlcnZpY2VzW3NlcnZpY2VJbmRleF0uaW50ZXJhY3Rpb24gPSB0cnVlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gc2VydmljZSBcclxuICAgKiB0aGlzIGlzIHRvIHJlbW92ZSBhbiBhbHJlYWR5IHNlbGVjdGVkIG9mZmxpbmUgc2VydmljZSB3aXRoIHRoZSBzZWxlY3RlZCBmbGlnaHRcclxuICAgKiBhbHNvIHJlbW92aW5nIG9mZmxpbmUgc2VydmljZSBmcm9tIHRoZSB3aG9sZSBwcmljZVxyXG4gICAqL1xyXG4gIHJlbW92ZU9mZmxpbmVTZXJ2aWNlKHNlcnZpY2UgOiBmbGlnaHRPZmZsaW5lU2VydmljZSl7XHJcbiAgICBsZXQgc2VydmljZUluZGV4ID0gdGhpcy5hbGxPZmZsaW5lU2VydmljZXMuZmluZEluZGV4KChzKT0+e3JldHVybiBzLnNlcnZpY2VDb2RlID09IHNlcnZpY2Uuc2VydmljZUNvZGV9KVxyXG4gICAgdGhpcy5zZWxlY3RlZE9mZmxpbmVTZXJ2aWNlcyA9IHRoaXMuc2VsZWN0ZWRPZmZsaW5lU2VydmljZXMuZmlsdGVyKChzKT0+e3JldHVybiBzICE9IHNlcnZpY2Uuc2VydmljZUNvZGV9KVxyXG4gICAgaWYodGhpcy5zZWxlY3RlZEZsaWdodCAhPSB1bmRlZmluZWQpeyBcclxuICAgICAgLy9pZiBpbnRlcmFjdGVkIGJlZm9yZSBcclxuICAgICAgICAgIGlmKHRoaXMuc2VydmljZUZlZXMgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZUZlZXMgPSAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlRmVlcyAtPSBzZXJ2aWNlLnNlcnZpY2VQcmljZTtcclxuICAgICAgICAgICAgdGhpcy5wcmljZVdpdGhSZWNvbW1lbmVkU2VydmljZSAtPSBzZXJ2aWNlLnNlcnZpY2VQcmljZTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodC5haXJJdGluZXJhcnlEVE8uaXRpblRvdGFsRmFyZS5hbW91bnQgLT0gc2VydmljZS5zZXJ2aWNlUHJpY2VcclxuICAgICAgfVxyXG4gICAgICAgICAvL2FwcGVhciB2YWxpZGF0aW9uIG1lc3NhZ2UgYmFzZWQgb24gYm9vbGVhbiB2YWx1ZVxyXG4gICAgICAgICBzd2l0Y2goc2VydmljZS5zZXJ2aWNlVHlwZSkge1xyXG4gICAgICAgICAgY2FzZSAnYWRkYnV0dG9uJzogIFxyXG4gICAgICAgICAgICB0aGlzLmFkZGJ1dHRvblZhaWxkID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgIFxyXG4gICAgICAgICAgY2FzZSAneWVzL25vJzpcclxuICAgICAgICAgICAgdGhpcy55ZXNPck5vVmFpbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3BhY2thZ2UnOlxyXG4gICAgICAgICAgICB0aGlzLnBhY2thZ2VWYWlsZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYWxsT2ZmbGluZVNlcnZpY2VzW3NlcnZpY2VJbmRleF0uYWRkZWQgPSBmYWxzZVxyXG4gICAgdGhpcy5hbGxPZmZsaW5lU2VydmljZXNbc2VydmljZUluZGV4XS5pbnRlcmFjdGlvbiA9IHRydWVcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gY29wb3VuQ29kZSBcclxuICAgKiBAcGFyYW0gc2VhcmNoSWQgXHJcbiAgICogQHBhcmFtIHNlcXVlbmNlTnVtIFxyXG4gICAqIEBwYXJhbSBwcm92aWRlcktleVxyXG4gICAqIGNoZWNrIGlmIHRoZSBlbnRlcmVkIGNvcG91biBjb2RlIGlzIHZhbGlkIGFuZCBhcHBseSB0aGUgZGlzc2NvdW50IGFtb3VudCBvbiB0aGUgZmxpZ2h0IHByaWNlXHJcbiAgICogaXQgdXBkYXRlcyB0aGUgc3RhdGUgb2YgW2NvcG91bkNvZGVMb2FkZXIgOiBib29sZWFuXVxyXG4gICAqIGl0IGFsc28gdXBkYXRlcyB0aGUgc3RhdGUgb2YgW2NvcG91bkNvZGVEZXRhaWxzOkNvcG9uXVxyXG4gICAqL1xyXG4gIGFwcGx5Q29wb3VuQ29kZShjb3BvdW5Db2RlOnN0cmluZyxzZWFyY2hJZDpzdHJpbmcsc2VxdWVuY2VOdW06bnVtYmVyLHByb3ZpZGVyS2V5OnN0cmluZyl7XHJcbiAgICB0aGlzLmNvcG91bkNvZGVMb2FkZXIgPSB0cnVlXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgIHRoaXMuYXBpLmFjdGl2YXRlQ29ib24oY29wb3VuQ29kZSxzZWFyY2hJZCxzZXF1ZW5jZU51bSxwcm92aWRlcktleSkuc3Vic2NyaWJlKChyZXMpPT57XHJcbiAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgIC8vIGFwcGx5IGRpc3Njb3VudCBvbiB0aGUgc2VsZWN0ZWQgZmxpZ2h0IHByaWNlIGFtb3VudFxyXG4gICAgICAgICAgaWYodGhpcy5zZWxlY3RlZEZsaWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29wb3VuQ29kZURldGFpbHMgPSByZXNcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodC5haXJJdGluZXJhcnlEVE8uaXRpblRvdGFsRmFyZS5hbW91bnQgLT0gcmVzLnByb21vdGlvbkRldGFpbHMuZGlzY291bnRBbW91bnRcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuY29wb3VuQ29kZUxvYWRlciA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LChlcnIpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhcHBseSBjb3BvdW4gY29kZSBFUlJPUlwiLGVycilcclxuICAgICAgICB0aGlzLmNvcG91bkNvZGVFcnJvciA9IGVyclxyXG4gICAgICAgIHRoaXMuY29wb3VuQ29kZUxvYWRlciA9IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcyBpcyByZXNwb25zaWJsZSBmb3IgYXNzaWduaW5nIGxhc3QgcGFzc2VuZ2VycyBmb3JtIHZhbHVlIGJlZm9yZSBsYXN0IHBheW1lbnRcclxuICAgKiBpdCBkZXBlbmRzIG9uIGxvY2FsIHN0b3JhZ2Uga2V5IGNhbGxlZCAobGFzdFBhc3NlbmdlcnMpIHdoaWNoIGNvbnRhaW5zIGRhdGEgZm9yIGFycmF5IG9mIHBhc3NlbmdlcnNcclxuICAgKi9cclxuICBmZXRjaExhc3RQYXNzZW5nZXJEYXRhKCl7XHJcbiAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhc3RQYXNzZW5nZXJzJykpe1xyXG4gICAgICB0aGlzLnVzZXJzQXJyYXkuc2V0VmFsdWUoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFzdFBhc3NlbmdlcnMnKSEpKVxyXG4gICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyBlcnJvciB0eXBlIGVpdGhlciBtYWluIGZvcm0gZXJyb3IgKGVtYWlsICYgcGhvbmUgbnVtYmVyKSBvciBwYXNzZW5nZXIgZXJyb3IgKGVycm9yIGhhcHBlbnMgd2hpbGUgZW50ZXJpbmcgcGFzc2VuZ2VycyBkYXRhKVxyXG4gICAqIElUIFJFVFVSTlMgKFZhbGlkKSBpbiB0aGUgdHlwZSBvZiBzdHJpbmcgdGhpcyBtZWFucyB0aGF0IGV2ZXJ5IHRoaW5nIGlzIE9LIGFuZCByZWFkeSB0byBwYXltZW50XHJcbiAgICovXHJcbiAgdmFsaWRhdGVQYXNzZW5nZXJzRm9ybSgpOnN0cmluZ3tcclxuICAgIGxldCBlcnJvciA6IHN0cmluZyA9ICcnXHJcbiAgICBmb3IodmFyIGkgPSAwIDsgaSA8IHRoaXMudXNlcnNBcnJheS5sZW5ndGggOyBpKyspe1xyXG4gICAgICBpZihpID09IDAgJiYgdGhpcy51c2Vyc0FycmF5LmF0KGkpLmdldCgnZW1haWwnKT8uZXJyb3JzICE9IG51bGwpe1xyXG4gICAgICAgIGVycm9yID0gJ21haW5Gb3JtRXJyb3InXHJcbiAgICAgICAgcmV0dXJuICdtYWluRm9ybUVycm9yJ1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy51c2Vyc0FycmF5LmF0KGkpLmludmFsaWQpe1xyXG4gICAgICAgIGVycm9yID0gJ3Bhc3NlbmdlcnNGb3JtJ1xyXG4gICAgICAgIHJldHVybiAncGFzc2VuZ2Vyc0Zvcm0nXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgZXJyb3IgPSAnVmFsaWQnXHJcbiAgICAgICAgcmV0dXJuICdWYWxpZCdcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlcnJvclxyXG4gIH1cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gY3VycmVudEN1cnJlbmN5IFxyXG4gICAqIGhlcmUgaXMgdGhlIHNhdmUgYm9va2luZyBmdW5jdGlvbiB3aGljaCByZXR1cm5pbmcgdGhlIHBheW1lbnQgbGluayBpZiBhbGwgcGFyYW1zIGlzIGdvb2RcclxuICAgKiBpdCB1cGRhdGVzIHRoZSBiZWhhdmlvdXIgc3ViamVjdCAocGF5bWVudExpbmspIHdpdGggdGhlIGxpbmtcclxuICAgKiBpdCBhbHNvIHVwZGF0ZXMgdGhlIGJlaGF2aW91ciBzdWJqZWN0IChwYXltZW50TGlua0ZhaWx1cmUpIHdpdGggdGhlIGVycm9yXHJcbiAgICovXHJcbiAgc2F2ZUJvb2tpbmcoY3VycmVudEN1cnJlbmN5OnN0cmluZyx0eXBlOnN0cmluZyl7XHJcbiAgICB0aGlzLmxvYWRlciA9IHRydWVcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgdGhpcy5hcGkuc2F2ZUJvb2tpbmcoXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRGbGlnaHQ/LnNlYXJjaENyaXRlcmlhLnNlYXJjaElkISxcclxuICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodD8uYWlySXRpbmVyYXJ5RFRPLnNlcXVlbmNlTnVtISxcclxuICAgICAgdGhpcy5nZW5lcmF0ZVNhdmVCb29raW5nQm9keVBhcmFtKGN1cnJlbnRDdXJyZW5jeSksXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRGbGlnaHQ/LmFpckl0aW5lcmFyeURUTy5wS2V5IS50b1N0cmluZygpISxcclxuICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodD8uc2VhcmNoQ3JpdGVyaWEubGFuZ3VhZ2UhLFxyXG4gICAgICB0eXBlPT0ncHJlbWl1bSc/dGhpcy5zZWxlY3RlZE9mZmxpbmVTZXJ2aWNlczp0aGlzLnNlbGVjdGVkT2ZmbGluZVNlcnZpY2VzLmZpbHRlcigocyk9PntyZXR1cm4gcyAhPSB0aGlzLnJlY29tbWVuZGVkT2ZmbGluZVNlcnZpY2U/LnNlcnZpY2VDb2RlfSksXHJcbiAgICAgIHRoaXMuaG9tZS5wb2ludE9mU2FsZS5pcCB8fCBcIjAwLjAwLjAwMC4wMDBcIixcclxuICAgICAgdGhpcy5ob21lLnBvaW50T2ZTYWxlLmNvdW50cnkgfHwgJ2t3J1xyXG4gICAgICApXHJcblxyXG4gICAgLnN1YnNjcmliZSgocmVzKT0+e1xyXG4gICAgICB0aGlzLnBheW1lbnRMaW5rLm5leHQocmVzKVxyXG4gICAgICB0aGlzLmxvYWRlciA9IGZhbHNlO1xyXG4gICAgfSwoZXJyKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNBVkUgQk9PS0lORyBFUlJPUlwiLCBlcnIpXHJcbiAgICAgIHRoaXMucGF5bWVudExpbmtGYWlsdXJlLm5leHQoZXJyKVxyXG4gICAgICB0aGlzLmxvYWRlciA9IGZhbHNlXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRGbGlnaHRFcnJvciA9IHRydWVcclxuICAgIH0pKVxyXG4gICAgXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIGN1cnJlbnRDdXJyZW5jeSBcclxuICAgKiBAcmV0dXJucyB0aGUgcGFzc2VuZ2VyIGRldGFpbHMgKGJvZHkgcGFyYW0pIG5lZWRlZCBieSBiYWNrZW5kIHRvIG1ha2UgdGhlIHNhdmUgYm9va2luZyBhY3Rpb25cclxuICAgKi9cclxuICBnZW5lcmF0ZVNhdmVCb29raW5nQm9keVBhcmFtKGN1cnJlbnRDdXJyZW5jeTpzdHJpbmcpOnBhc3NlbmdlcnNNb2RlbHtcclxuICAgIGZvcih2YXIgaSA9IDAgOyBpIDwgdGhpcy51c2Vyc0FycmF5Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYodGhpcy51c2Vyc0FycmF5LmF0KGkpLmdldCgndGl0bGUnKSEudmFsdWUgPT0gJ01hbGUnKXtcclxuICAgICAgICB0aGlzLnVzZXJzQXJyYXkuYXQoaSkuZ2V0KCd0aXRsZScpIS5zZXRWYWx1ZSgnTXInKVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy51c2Vyc0FycmF5LmF0KGkpLmdldCgndGl0bGUnKSEudmFsdWUgPT0gJ0ZlbWFsZScpe1xyXG4gICAgICAgIHRoaXMudXNlcnNBcnJheS5hdChpKS5nZXQoJ3RpdGxlJykhLnNldFZhbHVlKCdNcycpXHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy51c2Vyc0FycmF5LmF0KGkpLmdldCgncGhvbmVOdW1iZXInKT8udmFsdWUgIT0gJycpe1xyXG4gICAgICAgIHRoaXMudXNlcnNBcnJheS5hdChpKS5nZXQoJ2NvdW50cnlDb2RlJyk/LnNldFZhbHVlKCg8c3RyaW5nPnRoaXMudXNlcnNBcnJheS5hdChpKS5nZXQoJ3Bob25lTnVtYmVyJyk/LnZhbHVlLmRpYWxDb2RlKS5yZXBsYWNlKFwiK1wiLCcnKSlcclxuICAgICAgICB0aGlzLnVzZXJzQXJyYXkuYXQoaSkuZ2V0KCdwaG9uZU51bWJlcicpPy5zZXRWYWx1ZSh0aGlzLnVzZXJzQXJyYXkuYXQoaSkuZ2V0KCdwaG9uZU51bWJlcicpPy52YWx1ZS5udW1iZXIpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnVzZXJzQXJyYXkuYXQoaSkuZ2V0KCdjb3VudHJ5T2ZSZXNpZGVuY2UnKT8uc2V0VmFsdWUodGhpcy5ob21lLmFsbENvdW50cmllc1xyXG4gICAgICAgIC5maWx0ZXIoYz0+e3JldHVybiBjLmNvdW50cnlOYW1lID09IHRoaXMudXNlcnNBcnJheS5hdChpKS5nZXQoJ2NvdW50cnlPZlJlc2lkZW5jZScpPy52YWx1ZX0pWzBdLnBzZXVkb0NvdW50cnlDb2RlKVxyXG4gICAgICAgIHRoaXMudXNlcnNBcnJheS5hdChpKS5nZXQoJ0lzc3VlZENvdW50cnknKT8uc2V0VmFsdWUodGhpcy51c2Vyc0FycmF5LmF0KGkpLmdldCgnY291bnRyeU9mUmVzaWRlbmNlJyk/LnZhbHVlKVxyXG4gICAgICAgIHRoaXMudXNlcnNBcnJheS5hdChpKS5nZXQoJ25hdGlvbmFsaXR5Jyk/LnNldFZhbHVlKHRoaXMudXNlcnNBcnJheS5hdChpKS5nZXQoJ2NvdW50cnlPZlJlc2lkZW5jZScpPy52YWx1ZSlcclxuICAgIH1cclxuICAgIGxldCBvYmplY3QgOiBwYXNzZW5nZXJzTW9kZWwgPSB7XHJcbiAgICAgIGJvb2tpbmdFbWFpbDp0aGlzLnVzZXJzQXJyYXkuYXQoMCkuZ2V0KCdlbWFpbCcpPy52YWx1ZSxcclxuICAgICAgRGlzY291bnRDb2RlOnRoaXMuY29wb3VuQ29kZURldGFpbHM/LnByb21vdGlvbkRldGFpbHMuZGlzY291bnRDb2RlIHx8ICcnLFxyXG4gICAgICBwYXNzZW5nZXJzRGV0YWlsczp0aGlzLnVzZXJzQXJyYXkudmFsdWUsXHJcbiAgICAgIFVzZXJDdXJyZW5jeTpjdXJyZW50Q3VycmVuY3lcclxuICAgIH1cclxuICAgIHJldHVybiBvYmplY3RcclxuICB9XHJcblxyXG5cclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPiBTdGFydGluZyBCdWlsZGluZyBGYXJlIGJyZWFrdXAgRnVuY3Rpb25hbGl0aWVzXHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2lwbGUgZm9yIGdldHRpbmcgZGlzc2NvdW50IGZyb20gcGFzc2VuZ2VycyBmYXJlIGJyZWFrdXBcclxuICAgKiBpdCBhbHNvIHVwZGF0ZXMgdGhlIGRpc3Njb3VudCBzdGF0ZSBmYXJlRGlzc2NvdW50IDogW251bWJlcixzdHJpbmcsc3RyaW5nXVxyXG4gICAqL1xyXG4gIGNhbGN1bGF0ZUZhcmVCcmVha3VwRGlzc2NvdW50KCl7XHJcbiAgICBpZih0aGlzLnNlbGVjdGVkRmxpZ2h0Py5haXJJdGluZXJhcnlEVE8ucGFzc2VuZ2VyRmFyZUJyZWFrRG93bkRUT3Mpe1xyXG4gICAgICB0aGlzLmZhcmVEaXNzY291bnQgPSB0aGlzLnJldHVyblBhc3NUb3RhbEZhckRpZmZlcmFuY2UoXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodC5haXJJdGluZXJhcnlEVE8ucGFzc2VuZ2VyRmFyZUJyZWFrRG93bkRUT3MsXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodC5haXJJdGluZXJhcnlEVE8uaXRpblRvdGFsRmFyZS5hbW91bnQsXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZsaWdodC5haXJJdGluZXJhcnlEVE8uaXRpblRvdGFsRmFyZS50b3RhbFRheGVzLFxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGbGlnaHQuYWlySXRpbmVyYXJ5RFRPLml0aW5Ub3RhbEZhcmUuY3VycmVuY3lDb2RlLFxyXG4gICAgICAgIHRoaXMuY2FsY0VxZmFyZSx0aGlzLnJldHVybkNvcnJlY3RGYXJlXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIGZsaWdodEZhcmVzRFRPIFxyXG4gICAqIEBwYXJhbSB0b3RhbEFtb3VudCBcclxuICAgKiBAcGFyYW0gdG90YWxUYXggXHJcbiAgICogQHBhcmFtIGN1cnJ1bmN5IFxyXG4gICAqIEBwYXJhbSBjYWxjRXFmYXJlIFxyXG4gICAqIEBwYXJhbSBmYXJlQ2FsYyBcclxuICAgKiBAcmV0dXJucyB2YWx1ZSBvZiBkaXNjb3VudCBvciBzZXJ2aWNlIGZlZXNcclxuICAgKi9cclxuICByZXR1cm5QYXNzVG90YWxGYXJEaWZmZXJhbmNlKGZsaWdodEZhcmVzRFRPOiBwYXNzZW5nZXJGYXJlQnJlYWtEb3duRFRPc1tdLCB0b3RhbEFtb3VudDogbnVtYmVyLHRvdGFsVGF4Om51bWJlcixjdXJydW5jeTpzdHJpbmcsY2FsY0VxZmFyZTpjYWxjRXFmYXJlLGZhcmVDYWxjOmZhcmVDYWxjKTogW251bWJlciwgc3RyaW5nLCBzdHJpbmddIHtcclxuICAgIGxldCBBZHRGYXJlcyA9IGNhbGNFcWZhcmUoZmxpZ2h0RmFyZXNEVE8sJ0FEVCcsZmFyZUNhbGMpO1xyXG4gICAgbGV0IGNoaWxkRmFyZSA9IGNhbGNFcWZhcmUoZmxpZ2h0RmFyZXNEVE8sJ0NOTicsZmFyZUNhbGMpO1xyXG4gICAgbGV0IGluZmVudEZhcmUgPSBjYWxjRXFmYXJlKGZsaWdodEZhcmVzRFRPLCdJTkYnLGZhcmVDYWxjKTtcclxuICAgIGxldCBUb3RhbEZhcmUgPSBBZHRGYXJlcyArIGNoaWxkRmFyZSArIGluZmVudEZhcmUgKyB0b3RhbFRheDtcclxuICAgIGxldCBmYXJlRGlmZiA9IHRvdGFsQW1vdW50IC0gVG90YWxGYXJlO1xyXG4gICAgIGlmIChmYXJlRGlmZiA+IDApIHtcclxuICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChmYXJlRGlmZiksICdTZXJ2aWNlIEZlZXMnLGN1cnJ1bmN5XVxyXG4gICAgIH0gZWxzZSBpZiAoZmFyZURpZmYgPCAwKSB7XHJcbiAgICAgICByZXR1cm4gW01hdGgucm91bmQoLTEgKiBmYXJlRGlmZiksICdEaXNjb3VudCcsY3VycnVuY3ldXHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgIHJldHVybiBbMCAsICcnLCdLV0QnXTtcclxuICAgICB9XHJcbiBcclxuICAgfVxyXG5cclxuXHJcbiAgIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBmbGlnaHRGYXJlc0RUTyBcclxuICAgKiBAcGFyYW0gdHlwZSBcclxuICAgKiBAcGFyYW0gZmFyZWNhbGMgXHJcbiAgICogQHJldHVybnMgbnVtZXIgb2YgcGFzc2VuZ2VyICogZmFyZSBvZiBwYXNzZW5nZXJcclxuICAgKi9cclxuICAgY2FsY0VxZmFyZShmbGlnaHRGYXJlc0RUTzogcGFzc2VuZ2VyRmFyZUJyZWFrRG93bkRUT3NbXSx0eXBlOnN0cmluZyxmYXJlY2FsYzpmYXJlQ2FsYyk6bnVtYmVye1xyXG4gICAgbGV0IGZhcmUgPSBmYXJlY2FsYyhmbGlnaHRGYXJlc0RUTy5maWx0ZXIoKHYpPT52LnBhc3NlbmdlclR5cGUgPT09IHR5cGUpWzBdPy5mbGlnaHRGYXJlc0RUT3MpO1xyXG4gICAgbGV0IHF1bnRpdHkgPSBmbGlnaHRGYXJlc0RUTy5maW5kKCh2KT0+di5wYXNzZW5nZXJUeXBlID09PSB0eXBlKT8ucGFzc2VuZ2VyUXVhbnRpdHk7XHJcbiAgICByZXR1cm4gIGZhcmUgJiYgcXVudGl0eSA/IGZhcmUgKiBxdW50aXR5IDogMDtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIGZhcmUgXHJcbiAgICogQHJldHVybnMgdmFsaWRhdGUgZXF1aXZlbGVudCBmYXJlXHJcbiAgICovXHJcblxyXG4gICByZXR1cm5Db3JyZWN0RmFyZShmYXJlOmZhcmVbXSk6bnVtYmVye1xyXG4gICAgaWYoZmFyZSl7ICAgICBcclxuICAgICBsZXQgZXF1aXZmYXJlID0gZmFyZS5maW5kKHY9PnYuZmFyZVR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2VxdWl2ZmFyZScpPy5mYXJlQW1vdW50O1xyXG4gICAgIGxldCB0b3RhbEZhcmUgPSBmYXJlLmZpbmQodj0+di5mYXJlVHlwZS50b0xvd2VyQ2FzZSgpID09PSAndG90YWxmYXJlJyk/LmZhcmVBbW91bnQ7XHJcbiAgICAgbGV0IHRvdGFsVGF4ICA9IGZhcmUuZmluZCh2PT52LmZhcmVUeXBlLnRvTG93ZXJDYXNlKCkgPT09ICd0b3RhbHRheCcpPy5mYXJlQW1vdW50O1xyXG4gICAgIGlmKGVxdWl2ZmFyZSAhPSB1bmRlZmluZWQgJiYgdG90YWxGYXJlICE9IHVuZGVmaW5lZCAmJiB0b3RhbFRheCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICByZXR1cm4gZXF1aXZmYXJlID4gMCA/IGVxdWl2ZmFyZSA6IHRvdGFsRmFyZSAtIHRvdGFsVGF4O1xyXG4gICAgIH1cclxuICAgICBlbHNle1xyXG4gICAgICByZXR1cm4gMFxyXG4gICAgIH1cclxuICAgICBcclxuICAgIH0gZWxzZXtcclxuICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICovXHJcbiAgY2FsY3VsYXRlUGFzc2VuZ2Vyc0ZhcmVCcmVha3VwVmFsdWUoKXtcclxuICAgICAgbGV0IEFkdEZhcmVzICA9IHRoaXMuc2VsZWN0ZWRGbGlnaHQ/LmFpckl0aW5lcmFyeURUTy5wYXNzZW5nZXJGYXJlQnJlYWtEb3duRFRPcz8uZmluZCh2PT52LnBhc3NlbmdlclR5cGUgPT09J0FEVCcpO1xyXG4gICAgICBsZXQgQ2hpbGRGYXJlID0gdGhpcy5zZWxlY3RlZEZsaWdodD8uYWlySXRpbmVyYXJ5RFRPLnBhc3NlbmdlckZhcmVCcmVha0Rvd25EVE9zPy5maW5kKHY9PnYucGFzc2VuZ2VyVHlwZSA9PT0nQ05OJyk7XHJcbiAgICAgIGxldCBpbmZGYXJlICAgPSB0aGlzLnNlbGVjdGVkRmxpZ2h0Py5haXJJdGluZXJhcnlEVE8ucGFzc2VuZ2VyRmFyZUJyZWFrRG93bkRUT3M/LmZpbmQodj0+di5wYXNzZW5nZXJUeXBlID09PSdJTkYnKTtcclxuICAgICAgdGhpcy5mYXJlQnJlYWNrdXAgPSB7XHJcbiAgICAgICAgQURUOntcclxuICAgICAgICAgIHRvdGFsRmFyZTpBZHRGYXJlcz90aGlzLnJldHVyblBhc3NUb3RhbEZhcihBZHRGYXJlcy5mbGlnaHRGYXJlc0RUT3MsQWR0RmFyZXMucGFzc2VuZ2VyUXVhbnRpdHksdGhpcy5yZXR1cm5Db3JyZWN0RmFyZSk6W05hTiwnS1dEJ10sXHJcbiAgICAgICAgICBTY0ZhcmU6QWR0RmFyZXM/dGhpcy5yZXR1cm5QYXNzRmFyZVNjYXR0ZXJkKEFkdEZhcmVzLmZsaWdodEZhcmVzRFRPcyxBZHRGYXJlcy5wYXNzZW5nZXJRdWFudGl0eSx0aGlzLnJldHVybkNvcnJlY3RGYXJlKTpbTmFOLCdLV0QnLE5hTl1cclxuICAgICAgICB9LFxyXG4gICAgICAgIENOTjp7XHJcbiAgICAgICAgICB0b3RhbEZhcmU6Q2hpbGRGYXJlP3RoaXMucmV0dXJuUGFzc1RvdGFsRmFyKENoaWxkRmFyZS5mbGlnaHRGYXJlc0RUT3MsQ2hpbGRGYXJlLnBhc3NlbmdlclF1YW50aXR5LHRoaXMucmV0dXJuQ29ycmVjdEZhcmUpOltOYU4sJ0tXRCddLFxyXG4gICAgICAgICAgU2NGYXJlOkNoaWxkRmFyZT90aGlzLnJldHVyblBhc3NGYXJlU2NhdHRlcmQoQ2hpbGRGYXJlLmZsaWdodEZhcmVzRFRPcyxDaGlsZEZhcmUucGFzc2VuZ2VyUXVhbnRpdHksdGhpcy5yZXR1cm5Db3JyZWN0RmFyZSk6W05hTiwnS1dEJyxOYU5dXHJcbiAgICAgICAgfSxcclxuICAgICAgICBJTkY6e1xyXG4gICAgICAgICAgdG90YWxGYXJlOmluZkZhcmU/dGhpcy5yZXR1cm5QYXNzVG90YWxGYXIoaW5mRmFyZS5mbGlnaHRGYXJlc0RUT3MsaW5mRmFyZS5wYXNzZW5nZXJRdWFudGl0eSx0aGlzLnJldHVybkNvcnJlY3RGYXJlKTpbTmFOLCdLV0QnXSxcclxuICAgICAgICAgIFNjRmFyZTppbmZGYXJlP3RoaXMucmV0dXJuUGFzc0ZhcmVTY2F0dGVyZChpbmZGYXJlLmZsaWdodEZhcmVzRFRPcyxpbmZGYXJlLnBhc3NlbmdlclF1YW50aXR5LHRoaXMucmV0dXJuQ29ycmVjdEZhcmUpOltOYU4sJ0tXRCcsTmFOXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIGZsaWdodEZhcmVzRFRPIFxyXG4gICAqIEBwYXJhbSBwYXNzTnVtYmVyIFxyXG4gICAqIEByZXR1cm5zIFt0b3RhbCB2YWx1ZSAsY3VycnVuY3kgY29kZV1cclxuICAgKi9cclxuICByZXR1cm5QYXNzVG90YWxGYXIoZmxpZ2h0RmFyZXNEVE86ZmFyZVtdLHBhc3NOdW1iZXI6bnVtYmVyLGNhbGNmYXJlOmZhcmVDYWxjKTpbbnVtYmVyLHN0cmluZ117XHJcbiAgICBsZXQgVG90YWw6ZmFyZSA9IGZsaWdodEZhcmVzRFRPLmZpbHRlcih2PT52LmZhcmVUeXBlLnRvTG93ZXJDYXNlKCkgPT09ICdlcXVpdmZhcmUnKVswXTtcclxuICAgIHJldHVybiBUb3RhbD9bY2FsY2ZhcmUoZmxpZ2h0RmFyZXNEVE8pKnBhc3NOdW1iZXIsVG90YWwuY3VycmVuY3lDb2RlXSA6W05hTiwnS1dEJ107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gZmxpZ2h0RmFyZXNEVE8gXHJcbiAgICogQHBhcmFtIHBhc3NOdW1iZXIgXHJcbiAgICogQHJldHVybnMgW3RvdGFsIHZhbHVlIHBlciBwYXNzZW5nZXIgLGN1cnJ1bmN5IGNvZGUgLCBudW1iZXIgb2YgcGFzc2VuZ2VyXVxyXG4gICAqL1xyXG4gIHJldHVyblBhc3NGYXJlU2NhdHRlcmQoZmxpZ2h0RmFyZXNEVE86ZmFyZVtdLHBhc3NOdW1iZXI6bnVtYmVyLGNhbGNmYXJlOmZhcmVDYWxjKTpbbnVtYmVyLHN0cmluZyxudW1iZXJde1xyXG4gICAgbGV0IFRvdGFsOmZhcmUgPSBmbGlnaHRGYXJlc0RUTy5maWx0ZXIodj0+di5mYXJlVHlwZS50b0xvd2VyQ2FzZSgpID09PSAnZXF1aXZmYXJlJylbMF07XHJcbiAgICByZXR1cm4gVG90YWw/W2NhbGNmYXJlKGZsaWdodEZhcmVzRFRPKSxUb3RhbC5jdXJyZW5jeUNvZGUscGFzc051bWJlcl0gOltOYU4sJ0tXRCcsTmFOXTtcclxuICB9XHJcblxyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+IEVuZCBvZiBCdWlsZGluZyBGYXJlIGJyZWFrdXAgRnVuY3Rpb25hbGl0aWVzXHJcblxyXG5cclxuICB1cGRhdGVQYWNrYWdlU2VydmljZUludGVyYWN0aW9uVmFsaWRhdGlvbih2YWw6Ym9vbGVhbil7XHJcbiAgICB0aGlzLnBhY2thZ2VWYWlsZCA9IHZhbFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlWWVzT3JOb1NlcnZpY2VJbnRlcmFjdGlvblZhbGlkYXRpb24odmFsOmJvb2xlYW4pe1xyXG4gICAgdGhpcy55ZXNPck5vVmFpbGQgPSB2YWxcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gZGVzdG9yeSBhbnkgb3BlbmVkIHN1YnNjcmlwdGlvbiBvbiB0aGlzIHNlcnZpY2VcclxuICAgKi9cclxuICBkZXN0cm95ZXIoKXtcclxuICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcclxuICAgIHRoaXMuc2VsZWN0ZWRGbGlnaHQgID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLmFsbE9mZmxpbmVTZXJ2aWNlcyAgPSBbXVxyXG4gICAgdGhpcy5zZWxlY3RlZE9mZmxpbmVTZXJ2aWNlcyAgPSBbXVxyXG4gICAgdGhpcy5yZWNvbW1lbmRlZE9mZmxpbmVTZXJ2aWNlID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLnByaWNlV2l0aFJlY29tbWVuZWRTZXJ2aWNlID0gMDtcclxuICAgIHRoaXMub2ZmbGluZVNlcnZpY2VzTG9hZGVyID0gZmFsc2VcclxuICAgIHRoaXMubG9hZGVyICA9IGZhbHNlXHJcbiAgICB0aGlzLmNvcG91bkNvZGVMb2FkZXIgID0gZmFsc2VcclxuICAgIHRoaXMuY29wb3VuQ29kZURldGFpbHMgPSB1bmRlZmluZWRcclxuICAgIHRoaXMuY29wb3VuQ29kZUVycm9yICA9ICcnXHJcbiAgICB0aGlzLnVzZXJzRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICB1c2VycyA6IG5ldyBGb3JtQXJyYXkoW10pXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZmFyZURpc3Njb3VudCA9IFswLCcnLCcnXTtcclxuICAgIHRoaXMuZmFyZUJyZWFja3VwID0gdW5kZWZpbmVkXHJcbiAgICB0aGlzLnBheW1lbnRMaW5rID0gbmV3IFN1YmplY3QoKTtcclxuICAgIHRoaXMucGF5bWVudExpbmtGYWlsdXJlID0gbmV3IFN1YmplY3QoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRGbGlnaHRMYW5nID0gbmV3IFN1YmplY3QoKTtcclxuICAgIHRoaXMub2ZmbGluZVNlcnZpY2VzUmVzcG9uc2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZEZsaWdodEVycm9yID0gZmFsc2VcclxuXHJcbiAgICB0aGlzLnllc09yTm9WYWlsZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYWNrYWdlVmFpbGQgPSBmYWxzZSA7XHJcbiAgICB0aGlzLmFkZGJ1dHRvblZhaWxkID0gZmFsc2UgO1xyXG4gICAgdGhpcy5zZXJ2aWNlRmVlcyA9IDA7XHJcbiAgICB0aGlzLm9yZ2FuaXplZE9mbGxpbmVTZXJ2aWNlcyA9IFtdXHJcbiAgfVxyXG59XHJcbiJdfQ==