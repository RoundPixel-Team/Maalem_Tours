import { Injectable, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchFlightModule, flightResultFilter } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightResultApiService } from './flight-result-api.service';
import * as i0 from "@angular/core";
export class FlightResultService {
    constructor() {
        this.api = inject(FlightResultApiService);
        this.router = inject(Router);
        this.route = inject(ActivatedRoute);
        this.searchID = '';
        /**
         * response airItineraries Data from Api  b type airItineraries
         */
        this.FilterData = [];
        /**
           * load error message when no data back from api
           */
        this.normalError = '';
        /**
         * flight Type
         */
        this.FlightType = 'RoundTrip';
        this.normalErrorStatus = false;
        /**
        * loading state ..
        */
        this.loading = true;
        this.roundT = false;
        this.airLR = [];
        /**fare rules loading state */
        this.fareLoading = true;
        this.ResultFound = false;
        /**
        *  Min value price
        *
        */
        this.priceMinValue = 0;
        /**
        *  Max value price
        *
        */
        this.priceMaxValue = 5000;
        this.FilterChanges$ = new Subscription();
        /**
       *  optins init and return data as string
       *
       */
        this.options = {
            floor: 0,
            ceil: 5000,
            translate: (value) => {
                return Math.round(value).toString();
            },
        };
        /**
       * inital rate currecy code kwd
       *
       */
        this.rate = 1;
        this.code = "KWD";
        /**
       *  array of  type string return feh kol airline back from airItineraries
       *
       */
        this.airlinesA = [];
        this.airlinesForm = [];
        this.bookingSites = ['KhaleejGate', 'other'];
        /**
       *  array of  type boolean
       *
       */
        this.bookingSitesForm = [];
        /**
       *  inital slider for filter return feh date min and max
       *
       */
        this.departingMin = 0;
        this.departingMax = 7000;
        this.optionsdeparting = this.options;
        this.arrivingMin = 0;
        this.arrivingMax = 7000;
        this.optionsArriving = this.options;
        this.minValue = 0;
        this.maxValue = 5000;
        this.durationMin = 0;
        this.durationMax = 7000;
        this.optionsDurathion = this.options;
        /**
        *  inital from filter
        *
        */
        this.filterForm = new FormGroup({
            airline: new FormGroup({
                airlines: new FormArray([]),
            }),
            bookingSite: new FormGroup({
                bookingSites: new FormArray([])
            }),
            stopsForm: new FormGroup({
                noStops: new FormControl(false),
                oneStop: new FormControl(false),
                twoAndm: new FormControl(false),
            }),
            sameAirline: new FormControl(false),
            priceSlider: new FormControl([0, 0]),
            durationSlider: new FormControl([0, 0]),
            dpartingSlider: new FormControl([0, 0]),
            arrivingSlider: new FormControl([0, 0]),
            returnSlider: new FormControl([30, 7000]),
            experience: new FormGroup({
                overNight: new FormControl(false),
                longStops: new FormControl(false)
            }),
            flexibleTickets: new FormGroup({
                refund: new FormControl(false),
                nonRefund: new FormControl(false)
            })
        });
        this.formINIT = false;
        this.subscription = new Subscription();
        this.moreT = [];
        /**
      *  array return data type airItineraries[] after organize
      *
      */
        this.orgnizedResponce = [];
        /**
         * lowest fares for sorting containers
         */
        this.cheapeastLowestFare = 0;
        this.shortestLowestFare = 0;
        this.bestExperienceLowestFare = 0;
        /**Custom airlines filter */
        this.customFilteredAirline = [];
        this.chosenCustomFilteredAirline = [];
        this.customFilteredAirlineSlice = [];
        this.customFilteredAirlineStart = 0;
        this.customFilteredAirlineEnd = 4;
        this.customFilteredAirlineSliceMobile = [];
        this.customFilteredAirlineStartMobile = 0;
        this.customFilteredAirlineEndMobile = 2;
    }
    /**
   * get all data from the router to call api to get flightResultData
   * from Api  searchFlight
   **/
    getDataFromUrl(lang, currency, pointOfReservation, flightType, flightsInfo, serachId, passengers, Cclass, showDirect, endCustomAirlineFilter, endCustomAirlineFilterMobile) {
        this.loading = true;
        this.orgnizedResponce = [];
        this.FilterData = [];
        this.response = undefined;
        this.customFilteredAirlineEnd = endCustomAirlineFilter;
        this.customFilteredAirlineEndMobile = endCustomAirlineFilterMobile;
        this.FlightType = flightType;
        this.searchID = serachId;
        if (this.FlightType == 'RoundTrip') {
            this.roundT = true;
        }
        let searchApi = new SearchFlightModule(lang, currency, pointOfReservation, flightType, flightsInfo, passengers, Cclass, serachId, showDirect, 'all');
        if (SearchFlightModule) {
            let myapi = searchApi;
            this.subscription.add(this.api.searchFlight(myapi).subscribe((result) => {
                this.formINIT = false;
                if (result.status == 'Valid') {
                    this.loading = false;
                    this.ResultFound = true;
                    this.response = result;
                    this.filterAirlines();
                    this.fetchLowestFaresForSorting(this.response.airItineraries);
                    this.FilterData = result.airItineraries;
                    this.orgnizedResponce = this.orgnize(this.FilterData);
                    this.FilterChanges$.unsubscribe();
                    this.filterForm = new FormGroup({
                        airline: new FormGroup({
                            airlines: new FormArray([])
                        }),
                        bookingSite: new FormGroup({
                            bookingSites: new FormArray([])
                        }),
                        stopsForm: new FormGroup({
                            noStops: new FormControl(false),
                            oneStop: new FormControl(false),
                            twoAndm: new FormControl(false)
                        }),
                        sameAirline: new FormControl(false),
                        priceSlider: new FormControl([0, 0]),
                        durationSlider: new FormControl([0, 7000]),
                        dpartingSlider: new FormControl([0, 20000]),
                        arrivingSlider: new FormControl([0, 20000]),
                        returnSlider: new FormControl([0, 7000]),
                        experience: new FormGroup({
                            overNight: new FormControl(false),
                            longStops: new FormControl(false)
                        }),
                        flexibleTickets: new FormGroup({
                            refund: new FormControl(false),
                            nonRefund: new FormControl(false)
                        })
                    });
                    this.findDepartingnMinMax(this.response.airItineraries);
                    this.filterForm.get("dpartingSlider")?.setValue(this.findDepartingnMinMax(this.response.airItineraries));
                    this.filterForm.get("dpartingSlider")?.updateValueAndValidity();
                    this.filterForm.get("durationSlider")?.setValue(this.findDurationMinMax(this.response.airItineraries));
                    this.filterForm.get("durationSlider")?.updateValueAndValidity();
                    // this.findDepartingnMinMax(this.response.airItineraries)
                    this.filterForm.get("arrivingSlider")?.setValue(this.findArrivingMinMax(this.response.airItineraries));
                    this.filterForm.get("arrivingSlider")?.updateValueAndValidity(); // this.minAnMax(this.response.airItineraries);
                    this.filterForm.get('priceSlider')?.setValue(this.minAnMax(this.response.airItineraries));
                    this.stopsvalues(),
                        this.airlinesA = this.response.airlines;
                    this.airlinesForm = [];
                    this.airlinesA.forEach(element => {
                        this.filterForm.get('airline')?.get('airlines').push(new FormControl(false));
                    });
                    this.bookingSitesForm = [];
                    this.bookingSites.forEach(element => {
                        this.filterForm.get('bookingSite')?.get('bookingSites').push(new FormControl(false));
                    });
                    this.setSliderOptions();
                    this.filterForm.updateValueAndValidity();
                    this.formINIT = true;
                    this.updateFilter();
                }
                else {
                    this.normalError = "No result found. <br> please search again";
                    this.normalErrorStatus = true;
                    this.loading = false;
                    this.ResultFound = false;
                }
            }));
        }
    }
    /**
   * update filter input
   *
   **/
    updateFilter() {
        this.subscription.add(this.filterForm.valueChanges.subscribe((val) => {
            if (this.formINIT) {
                let filter = new flightResultFilter(this.filterForm.get("sameAirline")?.value, this.filterForm.get("priceSlider")?.value[0], this.filterForm?.get("priceSlider")?.value[1], this.filterForm.get("durationSlider")?.value[0], this.filterForm.get("durationSlider")?.value[1], this.filterForm.get("dpartingSlider")?.value[0], this.filterForm.get("dpartingSlider")?.value[1], this.filterForm.get("arrivingSlider")?.value[0], this.filterForm.get("arrivingSlider")?.value[1], this.filterForm.get("returnSlider")?.value[0], this.filterForm.get("returnSlider")?.value[1], this.stopsvalues(), [this.filterForm.get('experience')?.get('overNight')?.value], [this.filterForm.get('flexibleTickets')?.get('refund')?.value, this.filterForm.get('flexibleTickets')?.get('nonRefund')?.value], this.filteringbyairline(this.filterForm.get('airline')?.get('airlines')?.value), this.filteringbyBookingSites(this.filterForm.get('bookingSite')?.get('bookingSites')?.value));
                this.oneForAll(filter, this.FilterData, this.roundT);
            }
            else {
            }
        }));
    }
    // filter func
    // new filteration method
    oneForAll(filter, fligtsArray, round) {
        this.orgnizedResponce = this.orgnize(fligtsArray.filter(v => this.filterFlighWithPrice(v, filter) &&
            this.filterFlighWithDepartionTime(v, filter) &&
            this.filterFlighWithArrivalTime(v, filter) &&
            this.FlexTicketcheck(v, filter) &&
            this.filterFlightWithNumberofStopsFunction(v, filter) &&
            this.filterFlighWithDuration(v, filter) &&
            this.filterWithExperience(v, filter) &&
            this.filterFlighWithReturnTime(v, filter, this.roundT) &&
            this.completeTripOnSameAirline(v, filter) &&
            this.filterFlightWithAirlineFunction(v, filter, this.roundT)));
    }
    /**
     * grouping data return two array array airItineraries and array have same price
     **/
    orgnize(array) {
        let out = [];
        let remain = array;
        let i = 0;
        while (remain.length > 0 || !remain) {
            if (i > 50) {
                break;
            }
            else {
                out.push(remain.filter((v, i, a) => v.allJourney.flights[0].flightDTO[0].flightAirline.airlineCode === a[0].allJourney.flights[0].flightDTO[0].flightAirline.airlineCode && v.itinTotalFare.amount === a[0].itinTotalFare.amount));
                remain = remain.filter((v, i, a) => v.allJourney.flights[0].flightDTO[0].flightAirline.airlineCode != a[0].allJourney.flights[0].flightDTO[0].flightAirline.airlineCode || v.itinTotalFare.amount != a[0].itinTotalFare.amount);
            }
            i = i + 1;
        }
        return out;
    }
    /**
     * create an array with the same length of the output
     **/
    valuesoftrueM(array) {
        let out = [];
        let arryalengty = array.length;
        for (let index = 0; index < arryalengty; index++) {
            let truth = true;
            out.push(truth);
        }
        return this.moreT = out;
    }
    /**
      *
      * @param type
      
      * sort result base on type:number return data: airItineraries[] sorting by condition or type
      *
      */
    sortMyResult(type) {
        if (this.response != undefined) {
            if (type == 1) {
                this.orgnizedResponce =
                    [...this.orgnizedResponce].sort((a, b) => { return a[0].itinTotalFare.amount - b[0].itinTotalFare.amount; });
            }
            if (type == 2) {
                this.orgnizedResponce = [...this.orgnizedResponce].sort((a, b) => { return a[0].totalDuration - b[0].totalDuration; });
            }
            if (type == 3) {
                this.orgnizedResponce = [...this.orgnizedResponce].sort((a, b) => { return new Date(a[0].deptDate) - new Date(b[0].deptDate); });
            }
            if (type == 4) {
                this.orgnizedResponce = [...this.orgnizedResponce].sort((a, b) => { return new Date(b[0].deptDate) - new Date(a[0].deptDate); });
            }
            if (type == 5) {
                this.orgnizedResponce = [...this.orgnizedResponce].sort((a, b) => { return new Date(a[0].allJourney.flights[1].flightDTO[0].departureDate) - new Date(b[0].allJourney.flights[1].flightDTO[0].departureDate); });
            }
            if (type == 6) {
                this.orgnizedResponce = [...this.orgnizedResponce].sort((a, b) => { return new Date(b[0].allJourney.flights[1].flightDTO[0].departureDate) - new Date(a[0].allJourney.flights[1].flightDTO[0].departureDate); });
            }
            if (type == 7) {
                this.orgnizedResponce = [...this.orgnizedResponce].sort((a, b) => { return a[0].experiance - b[0].experiance; });
            }
        }
    }
    /**
     * get the lowest fares for all sorting criterias
     * @param data (all the itineraries)
     */
    fetchLowestFaresForSorting(data) {
        this.cheapeastLowestFare = [...data].sort((a, b) => { return a.itinTotalFare.amount - b.itinTotalFare.amount; })[0].itinTotalFare.amount;
        this.bestExperienceLowestFare = [...data].sort((a, b) => { return a.experiance - b.experiance; })[0].itinTotalFare.amount;
        this.shortestLowestFare = [...data].sort((a, b) => { return a.totalDuration - b.totalDuration; })[0].itinTotalFare.amount;
    }
    /**
     * get min , max value slider from back data
     **/
    /**
    * Filter Values airItineraries[] by Price And Update Filtiration Slider
    **/
    minAnMax(data) {
        let arr = [...data];
        let sortedRes = [
            ...arr.sort((a, b) => {
                return a.itinTotalFare.amount - b.itinTotalFare.amount;
            }),
        ];
        let minValue = sortedRes[0].itinTotalFare.amount;
        let maxValue1 = sortedRes[sortedRes.length - 1].itinTotalFare.amount;
        this.options = {
            floor: minValue,
            ceil: Math.round(maxValue1 + 10),
            translate: (value) => {
                return Math.round(value).toString();
            },
        };
        this.priceMinValue = minValue;
        this.priceMaxValue = Math.round(maxValue1 + 10);
        this.maxValue = Math.round(maxValue1 + 10);
        return [minValue, this.maxValue];
    }
    /**
      * Find Min And Max Values and  Filter Values airItineraries[]  Of Flight Duration  And Update Filtiration Slider
      **/
    findDurationMinMax(array) {
        let sorted = [...array].sort((a, b) => b.totalDuration - a.totalDuration);
        let min = sorted[sorted.length - 1]['totalDuration'];
        let max = sorted[0]['totalDuration'];
        this.durationMax = max + 100;
        this.durationMin = min;
        this.optionsDurathion = {
            floor: min,
            ceil: max + 100,
            noSwitching: true,
            translate: (value) => {
                let h = value / 60 | 0;
                let m = value % 60 | 0;
                return h + "h" + ":" + m + "m";
            }
        };
        return [min, max + 100];
    }
    /**
     *  Find Min And Max Values Of Flight Departing Dates  And Update Filtiration Slider
     **/
    findDepartingnMinMax(array) {
        let min = this.convertToMin(array[0].allJourney.flights[0].flightDTO[0].departureDate);
        let max = this.convertToMin(array[0].allJourney.flights[0].flightDTO[0].departureDate);
        array.forEach(element => {
            let t = this.convertToMin(element.allJourney.flights[0].flightDTO[0].departureDate);
            if (t < min) {
                min = t;
            }
            if (t > max) {
                max = t;
            }
        });
        this.departingMin = min;
        this.departingMax = max;
        this.optionsdeparting = {
            floor: min,
            ceil: max,
            noSwitching: false,
            translate: (value) => {
                let h = value / 60 | 0;
                let m = value % 60 | 0;
                return h + "h" + ":" + m + "m";
                // return this.datePipe.transform(value * 1000, 'HH:mm a')
            }
        };
        return [min, max];
    }
    /**
  *  Find Min And Max Values Of Flight arriving Dates  And Update Filtiration Slider
  **/
    findArrivingMinMax(array) {
        let min = this.convertToMin(array[0].allJourney.flights[0].flightDTO[array[0].allJourney.flights[0].flightDTO.length - 1].arrivalDate);
        let max = this.convertToMin(array[0].allJourney.flights[0].flightDTO[array[0].allJourney.flights[0].flightDTO.length - 1].arrivalDate);
        array.forEach(element => {
            let t = this.convertToMin(element.allJourney.flights[0].flightDTO[element.allJourney.flights[0].flightDTO.length - 1].arrivalDate);
            if (t < min) {
                min = t;
            }
            if (t > max) {
                max = t;
            }
        });
        this.arrivingMin = min;
        this.arrivingMax = max;
        this.optionsArriving = {
            floor: min,
            ceil: max,
            noSwitching: true,
            translate: (value) => {
                let h = value / 60 | 0;
                let m = value % 60 | 0;
                return h + "h" + ":" + m + "m";
            }
        };
        return [min, max];
    }
    /**
     * Functions filter to filter data
     **/
    /**
   *  take date string return number
   **/
    convertToMin(time) {
        let date = time;
        let T = date.indexOf('T');
        let h = date.slice(T + 1);
        let hr = +h.slice(0, 2) * 60;
        let m = +h.slice(3, 5);
        let tm = hr + m;
        return tm;
    }
    /**
   *  filter by price value
   **/
    filterFlighWithPrice(flight, filter) {
        return flight.itinTotalFare.amount >= filter.priceMin && flight.itinTotalFare.amount < filter.priceMax;
    }
    /**
  *  filter by DepartingTime
  **/
    filterFlighWithDepartionTime(flight, filter) {
        return this.convertToMin(flight.allJourney.flights[0].flightDTO[0].departureDate) >= filter.depatingMin && this.convertToMin(flight.allJourney.flights[0].flightDTO[0].departureDate) <= filter.departingMax;
    }
    /**
  *  filter by ArrivalTime
  **/
    filterFlighWithArrivalTime(flight, filter) {
        return this.convertToMin(flight.allJourney.flights[0].flightDTO[flight.allJourney.flights[0].flightDTO.length - 1].arrivalDate) >= filter.arrivingMin && this.convertToMin(flight.allJourney.flights[0].flightDTO[flight.allJourney.flights[0].flightDTO.length - 1].arrivalDate) <= filter.arrivingMax;
    }
    /**
   *  filter by Duration flight
   **/
    filterFlighWithDuration(flight, filter) {
        return flight.totalDuration >= filter.durationMin && flight.totalDuration < filter.durationMax;
    }
    /**
  *  filter by stops value
  **/
    stopsvalues() {
        let out = [];
        if (this.filterForm.get('stopsForm')?.get('noStops')?.value) {
            out.push(0);
        }
        if (this.filterForm.get('stopsForm')?.get('oneStop')?.value) {
            out.push(1);
        }
        if (this.filterForm.get('stopsForm')?.get('twoAndm')?.value) {
            out.push(2);
            out.push(3);
            out.push(4);
        }
        if (!this.filterForm.get('stopsForm')?.get('noStops')?.value && !this.filterForm.get('stopsForm')?.get('oneStop')?.value && !this.filterForm.get('stopsForm')?.get('twoAndm')?.value) {
            out = [0, 1, 2, 3, 4];
        }
        return out;
    }
    /**
  *  filter by stops value
  **/
    filterFlightWithNumberofStopsFunction(flight, filter) {
        let stopFlage = true;
        if (filter.stops[0] == 0 && filter.stops[1] == 1 && filter.stops[2] == 2 && filter.stops[3] == 3 && filter.stops[4] == 4) {
            stopFlage = true;
        }
        else if (filter?.stops[0] == 0 && filter.stops?.length == 1) {
            for (var i = 0; i < flight.allJourney.flights.length; i++) {
                if (flight.allJourney.flights[i].stopsNum != 0) {
                    stopFlage = false;
                }
            }
        }
        else if (filter.stops[0] == 0 && filter.stops[1] == 1) {
            for (var i = 0; i < flight.allJourney.flights.length; i++) {
                if (flight.allJourney.flights[i].stopsNum > 1) {
                    stopFlage = false;
                }
            }
        }
        else if (filter.stops[0] == 0 && filter.stops[1] == 2) {
            for (var i = 0; i < flight.allJourney.flights.length; i++) {
                if (flight.allJourney.flights[i].stopsNum == 1) {
                    stopFlage = false;
                }
            }
        }
        else if (filter.stops[0] == 1 && filter.stops?.length == 1) {
            for (var i = 0; i < flight.allJourney.flights.length; i++) {
                if (flight.allJourney.flights[i].stopsNum != 1) {
                    stopFlage = false;
                }
            }
        }
        else if (filter.stops[0] == 1 && filter.stops[1] == 2) {
            for (var i = 0; i < flight.allJourney.flights.length; i++) {
                if (flight.allJourney.flights[i].stopsNum < 2 && flight.allJourney.flights[i].stopsNum != 1) {
                    stopFlage = false;
                }
            }
        }
        else if (filter.stops[0] == 2) {
            for (var i = 0; i < flight.allJourney.flights.length; i++) {
                if (flight.allJourney.flights[i].stopsNum < 2) {
                    stopFlage = false;
                }
            }
        }
        else {
            stopFlage = true;
        }
        return stopFlage;
    }
    /**
    *  filter by airline
    **/
    filteringbyairline(val) {
        let airL = [];
        for (let index = 0; index < val.length; index++) {
            const element = val[index];
            if (element) {
                airL.push(this.airlinesA[index]);
            }
        }
        ;
        if (airL.length == 0) {
            let out = airL;
            this.airLR = out;
            return out;
        }
        else {
            return airL;
        }
    }
    filterFlightWithAirlineFunction(flight, filter, roundT) {
        if (roundT) {
            return filter.airlines.indexOf(flight.allJourney.flights[0]['flightAirline']['airlineName']) != -1 || filter.airlines.indexOf(flight.allJourney.flights[1]['flightAirline']['airlineName']) != -1 || filter.airlines?.length == 0;
        }
        else {
            return filter.airlines.indexOf(flight.allJourney.flights[0]['flightAirline']['airlineName']) != -1 || filter.airlines?.length == 0;
        }
    }
    /**
   *  filter by ReturnTime
   **/
    filterFlighWithReturnTime(flight, filter, roundT) {
        roundT = this.roundT;
        if (roundT) {
            return this.convertToMin(flight.allJourney.flights[1].flightDTO[0].departureDate) >= filter.returnMin && this.convertToMin(flight.allJourney.flights[1].flightDTO[0].departureDate) < filter.returnMax;
        }
        else {
            return true;
        }
    }
    /**
   *  filter by booking sites
   **/
    filteringbyBookingSites(val) {
        let selectedSites = [];
        for (let index = 0; index < val.length; index++) {
            const element = val[index];
            if (element) {
                selectedSites.push(this.bookingSites[index]);
            }
        }
        ;
        if (selectedSites.length == 0) {
            let out = selectedSites;
            return out;
        }
        else {
            return selectedSites;
        }
    }
    /**
    * check value stop
    **/
    stopscheck(stops, flight) {
        let status = true;
        let t1 = performance.now();
        flight.forEach(element => {
            if (stops.indexOf(element.stopsNum) == -1) {
                status = false;
            }
        });
        return status;
    }
    /**
    * check FlextTicket
    **/
    FlexTicketcheck(flight, filter) {
        if (filter.flexibleTicket[0] && !filter.flexibleTicket[1]) {
            if (flight.isRefundable) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (!filter.flexibleTicket[0] && filter.flexibleTicket[1]) {
            if (flight.isRefundable) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (!filter.flexibleTicket[0] && !filter.flexibleTicket[1]) {
            return true;
        }
        else if (filter.flexibleTicket[0] && filter.flexibleTicket[1]) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
    * filter data based on  experience value
    **/
    filterWithExperience(flight, filter) {
        if (filter.experience[0] && !filter.experience[1]) {
            if (flight.overNight == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (filter.experience[1] && !filter.experience[0]) {
            if (flight?.stopsTime < 4) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (filter.experience[1] && filter.experience[0]) {
            if (flight.overNight == 0 && flight.stopsTime < 4) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (!filter.experience[1] && !filter.experience[0]) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
    * filter data based on  SameAirline
    **/
    completeTripOnSameAirline(flight, filter) {
        if (!filter.sameAirline) {
            return true;
        }
        else {
            let airlineChange = true;
            let firstAirline = flight.allJourney.flights[0].flightDTO[0].flightAirline.airlineName;
            let flightAirlines;
            flightAirlines = flight.allJourney.flights.map(v => {
                return v.flightDTO.map(f => {
                    return f.flightAirline.airlineName;
                });
            });
            for (var i = 0; i < flightAirlines.length; i++) {
                for (var j = 0; j < flightAirlines[i].length; j++) {
                    if (flightAirlines[i][j] != firstAirline) {
                        airlineChange = false;
                    }
                }
            }
            return airlineChange;
        }
    }
    /**
     * after finding the min and max values for all filtiration critirias .. update the sliders with these ,,
     * minimum and maximum values
     */
    setSliderOptions() {
        this.optionsDurathion = {
            floor: this.durationMin,
            ceil: this.durationMax,
            noSwitching: true,
            translate: (value) => {
                let h = value / 60 | 0;
                let m = value % 60 | 0;
                return h + "h" + ":" + m + "m";
            }
        };
        this.optionsdeparting = {
            floor: this.departingMin,
            ceil: this.departingMax,
            noSwitching: false,
            translate: (value) => {
                let h = value / 60 | 0;
                let m = value % 60 | 0;
                return `${this.hoursFormater(h)}:${this.mFormater(m)} ${this.DayOrNight(h, m)}`;
            }
        };
        this.optionsArriving = {
            floor: this.arrivingMin,
            ceil: this.arrivingMax,
            noSwitching: true,
            translate: (value) => {
                let h = value / 60 | 0;
                let m = value % 60 | 0;
                return `${this.hoursFormater(h)}:${this.mFormater(m)} ${this.DayOrNight(h, m)}`;
            }
        };
        this.options = {
            floor: this.priceMinValue,
            ceil: Math.round(this.priceMaxValue + 1),
            minLimit: Math.round(this.priceMinValue),
            maxLimit: Math.round(this.priceMaxValue + 1),
            translate: (value) => {
                return this.code + Math.round(value * this.rate);
            }
        };
    }
    updateCurrencyCode(code) {
        this.code = code;
    }
    DayOrNight(h, m) {
        let hourOfday = h > 24 ? h % 24 : h;
        return hourOfday + (m / 100) > 12 ? 'PM' : "AM";
    }
    hoursFormater(h) {
        let hourOfday = h > 24 ? h % 24 : h;
        let fHourOfday = hourOfday > 12 ? hourOfday - 12 : hourOfday;
        return fHourOfday >= 10 ? fHourOfday.toString() : `0${fHourOfday}`;
    }
    mFormater(m) {
        return m >= 10 ? m.toString() : `0${m}`;
    }
    /**
     **Sort according to the lowest fare (amount) and then create airlines array
     **according to the sorting to use them in filtiration
     **/
    filterAirlines() {
        this.customFilteredAirline = [];
        this.customFilteredAirlineSlice = [];
        this.customFilteredAirlineSliceMobile = [];
        if (!this.response) {
            return;
        }
        let sorted = this.response.airItineraries.slice().sort((a, b) => {
            return a.itinTotalFare.amount - b.itinTotalFare.amount;
        });
        for (var i = 0; i < this.response.airlines.length; i++) {
            let airlineNow = this.response.airlines[i];
            let index = sorted.findIndex((air) => air.allJourney.flights[0].flightAirline.airlineName == airlineNow);
            if (index != -1) {
                var maxStops = sorted[index].allJourney.flights.slice().sort((a, b) => {
                    return b.stopsNum - a.stopsNum;
                });
                this.customFilteredAirline.push({
                    logo: sorted[index].allJourney.flights[0].flightAirline.airlineLogo,
                    stops: maxStops[0].stopsNum,
                    price: sorted[index].itinTotalFare.amount,
                    currency: sorted[index].itinTotalFare.currencyCode,
                    name: sorted[index].allJourney.flights[0].flightAirline.airlineName,
                    selected: false
                });
            }
        }
        // this.code = sorted[0].itinTotalFare.currencyCode
        this.customFilteredAirlineSlice = this.customFilteredAirline.slice(this.customFilteredAirlineStart, this.customFilteredAirlineEnd);
        this.customFilteredAirlineSliceMobile = this.customFilteredAirline.slice(this.customFilteredAirlineStartMobile, this.customFilteredAirlineEndMobile);
    }
    /**
     * navigate next on custom filter airline data
     * @returns
     */
    nextcustomFilteredAirline() {
        if (this.customFilteredAirlineEnd == this.customFilteredAirline.length) {
            return;
        }
        else {
            this.customFilteredAirlineStart += 1;
            this.customFilteredAirlineEnd += 1;
            this.customFilteredAirlineSlice = this.customFilteredAirline.slice(this.customFilteredAirlineStart, this.customFilteredAirlineEnd);
        }
    }
    /**
     * navigate previous on custom filter airline data
     * @returns
     */
    prevcustomFilteredAirline() {
        if (this.customFilteredAirlineStart == 0) {
            return;
        }
        else {
            this.customFilteredAirlineStart -= 1;
            this.customFilteredAirlineEnd -= 1;
            this.customFilteredAirlineSlice = this.customFilteredAirline.slice(this.customFilteredAirlineStart, this.customFilteredAirlineEnd);
        }
    }
    /**
     * navigate next on custom mobile filter airline data
     * @returns
     */
    nextcustomFilteredAirlineMobile() {
        if (this.customFilteredAirlineEndMobile == this.customFilteredAirline.length) {
            return;
        }
        else {
            this.customFilteredAirlineStartMobile += 1;
            this.customFilteredAirlineEndMobile += 1;
            this.customFilteredAirlineSliceMobile = this.customFilteredAirline.slice(this.customFilteredAirlineStartMobile, this.customFilteredAirlineEndMobile);
        }
    }
    /**
     * navigate previous on custom mobile filter airline data
     * @returns
     */
    prevcustomFilteredAirlineMobile() {
        if (this.customFilteredAirlineStartMobile == 0) {
            return;
        }
        else {
            this.customFilteredAirlineStartMobile -= 1;
            this.customFilteredAirlineEndMobile -= 1;
            this.customFilteredAirlineSliceMobile = this.customFilteredAirline.slice(this.customFilteredAirlineStartMobile, this.customFilteredAirlineEndMobile);
        }
    }
    /**
     * Choose From The Sorted Lowest Fare Airline To Filter With And Change The Form
     **/
    chooseCustomFilterAirline(val, index) {
        var indexForForm = this.customFilteredAirline.findIndex(a => a.name == val.name);
        var airlineIndex = this.chosenCustomFilteredAirline.findIndex((name) => name == val.name);
        if (airlineIndex == -1) {
            this.filterForm.get("airline").get("airlines")
                .at(indexForForm)
                .setValue(true);
            this.chosenCustomFilteredAirline.push(val.name);
        }
        else {
            this.filterForm.get("airline").get("airlines")
                .at(indexForForm)
                .setValue(false);
            this.chosenCustomFilteredAirline.splice(airlineIndex, 1);
        }
    }
    /**
     * Check If The Airline Is Selected Or Not
     **/
    checkCustomFilterAirline(airlineName) {
        var airlineIndex = this.chosenCustomFilteredAirline.findIndex((name) => name == airlineName);
        if (airlineIndex == -1) {
            return false;
        }
        else {
            return true;
        }
    }
    /** A method to get the fare rules data */
    showFareRules(searchId, squencNumber, pKey) {
        this.fareLoading = true;
        this.api.fareRules(searchId, squencNumber, pKey).subscribe((result) => {
            this.fareLoading = false;
            this.fareRules = result.fares;
        });
    }
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer() {
        // this.subscription.unsubscribe()
        this.response = undefined;
        this.FilterData = [];
        this.normalError = '';
        this.FlightType = 'RoundTrip';
        this.normalErrorStatus = false;
        this.loading = true;
        this.roundT = false;
        this.airLR = [];
        this.ResultFound = false;
        this.priceMinValue = 0;
        this.priceMaxValue = 5000;
        this.FilterChanges$ = new Subscription();
        this.options = {
            floor: 0,
            ceil: 5000,
            translate: (value) => {
                return Math.round(value).toString();
            },
        };
        this.rate = 1;
        this.code = "KWD";
        this.airlinesA = [];
        this.airlinesForm = [];
        this.bookingSites = ['KhaleejGate', 'other'];
        this.bookingSitesForm = [];
        this.departingMin = 0;
        this.departingMax = 7000;
        this.optionsdeparting = this.options;
        this.arrivingMin = 0;
        this.arrivingMax = 7000;
        this.optionsArriving = this.options;
        this.minValue = 0;
        this.maxValue = 5000;
        this.durationMin = 0;
        this.durationMax = 7000;
        this.optionsDurathion = this.options;
        this.filterForm = new FormGroup({
            airline: new FormGroup({
                airlines: new FormArray([]),
            }),
            bookingSite: new FormGroup({
                bookingSites: new FormArray([])
            }),
            stopsForm: new FormGroup({
                noStops: new FormControl(false),
                oneStop: new FormControl(false),
                twoAndm: new FormControl(false),
            }),
            sameAirline: new FormControl(false),
            priceSlider: new FormControl([0, 0]),
            durationSlider: new FormControl([0, 0]),
            dpartingSlider: new FormControl([0, 0]),
            arrivingSlider: new FormControl([0, 0]),
            returnSlider: new FormControl([30, 7000]),
            experience: new FormGroup({
                overNight: new FormControl(false),
                longStops: new FormControl(false)
            }),
            flexibleTickets: new FormGroup({
                refund: new FormControl(false),
                nonRefund: new FormControl(false)
            })
        });
        this.formINIT = false;
        this.priceOptions = this.options;
        this.subscription = new Subscription();
        this.moreT = [];
        this.orgnizedResponce = [];
        this.cheapeastLowestFare = 0;
        this.shortestLowestFare = 0;
        this.bestExperienceLowestFare = 0;
        /**Custom airlines filter */
        this.customFilteredAirline = [];
        this.chosenCustomFilteredAirline = [];
        this.customFilteredAirlineSlice = [];
        this.customFilteredAirlineStart = 0;
        this.customFilteredAirlineEnd = 5;
        this.customFilteredAirlineSliceMobile = [];
        this.customFilteredAirlineStartMobile = 0;
        this.customFilteredAirlineEndMobile = 2;
    }
}
FlightResultService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightResultService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpZ2h0LXJlc3VsdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcnAtdHJhdmVsLXVpL3NyYy9saWIvZmxpZ2h0LXJlc3VsdC9zZXJ2aWNlcy9mbGlnaHQtcmVzdWx0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQWlDLGtCQUFrQixFQUFpRCxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySixPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQVNyRSxNQUFNLE9BQU8sbUJBQW1CO0lBZ0s5QjtRQTlKQSxRQUFHLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDcEMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN2QixVQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRTlCLGFBQVEsR0FBWSxFQUFFLENBQUE7UUFLdEI7O1dBRUc7UUFDSCxlQUFVLEdBQXFCLEVBQUUsQ0FBQTtRQUNqQzs7YUFFSztRQUNMLGdCQUFXLEdBQVcsRUFBRSxDQUFBO1FBRXhCOztXQUVHO1FBQ0gsZUFBVSxHQUFXLFdBQVcsQ0FBQTtRQUNoQyxzQkFBaUIsR0FBWSxLQUFLLENBQUE7UUFDbEM7O1VBRUU7UUFDRixZQUFPLEdBQVksSUFBSSxDQUFBO1FBQ3ZCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsVUFB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LElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUE7UUFDM0IsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FBQTtRQUdqQyw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsMkJBQTJCLEdBQUksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLDBCQUEwQixHQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsOEJBQThCLEdBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7O2dIQWxwQ1UsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCByZXRyeSwgdGFrZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGYXJlUnVsZXMsIEZsaWdodFNlYXJjaFJlc3VsdCwgU2VhcmNoRmxpZ2h0TW9kdWxlLCBhaXJJdGluZXJhcmllcywgZmlsdGVyRmxpZ2h0SW50ZXJmYWNlLCBmbGlnaHQsIGZsaWdodFJlc3VsdEZpbHRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGbGlnaHRSZXN1bHRBcGlTZXJ2aWNlIH0gZnJvbSAnLi9mbGlnaHQtcmVzdWx0LWFwaS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgc2VhcmNoRmxpZ2h0TW9kZWwgfSBmcm9tICcuLi8uLi9mbGlnaHQtc2VhcmNoL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXItc2xpZGVyL25neC1zbGlkZXInO1xyXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IGN1c3RvbUFpcmxpbmVGaWx0ZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzJ1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxpZ2h0UmVzdWx0U2VydmljZSB7XHJcblxyXG4gIGFwaSA9IGluamVjdChGbGlnaHRSZXN1bHRBcGlTZXJ2aWNlKVxyXG4gIHJvdXRlciA9IGluamVjdChSb3V0ZXIpXHJcbiAgcm91dGUgPSBpbmplY3QoQWN0aXZhdGVkUm91dGUpXHJcbiAgZmlsdGVyPzogZmxpZ2h0UmVzdWx0RmlsdGVyO1xyXG4gIHNlYXJjaElEIDogc3RyaW5nID0gJydcclxuICAvKipcclxuICogcmVzcG9uc2UgRGF0YSBmcm9tIEFwaSAgYiB0eXBlIEZsaWdodFNlYXJjaFJlc3VsdFxyXG4gKi9cclxuICByZXNwb25zZT86IEZsaWdodFNlYXJjaFJlc3VsdFxyXG4gIC8qKlxyXG4gICAqIHJlc3BvbnNlIGFpckl0aW5lcmFyaWVzIERhdGEgZnJvbSBBcGkgIGIgdHlwZSBhaXJJdGluZXJhcmllc1xyXG4gICAqL1xyXG4gIEZpbHRlckRhdGE6IGFpckl0aW5lcmFyaWVzW10gPSBbXVxyXG4gIC8qKlxyXG4gICAgICogbG9hZCBlcnJvciBtZXNzYWdlIHdoZW4gbm8gZGF0YSBiYWNrIGZyb20gYXBpXHJcbiAgICAgKi9cclxuICBub3JtYWxFcnJvcjogc3RyaW5nID0gJydcclxuXHJcbiAgLyoqXHJcbiAgICogZmxpZ2h0IFR5cGUgXHJcbiAgICovXHJcbiAgRmxpZ2h0VHlwZTogc3RyaW5nID0gJ1JvdW5kVHJpcCdcclxuICBub3JtYWxFcnJvclN0YXR1czogYm9vbGVhbiA9IGZhbHNlXHJcbiAgLyoqXHJcbiAgKiBsb2FkaW5nIHN0YXRlIC4uXHJcbiAgKi9cclxuICBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZVxyXG4gIHJvdW5kVDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGFpckxSOiBhbnkgPSBbXVxyXG4vKipmYXJlIHJ1bGVzIGxvYWRpbmcgc3RhdGUgKi9cclxuZmFyZUxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIFJlc3VsdEZvdW5kOiBib29sZWFuID0gZmFsc2VcclxuICAvKipcclxuICAqICBNaW4gdmFsdWUgcHJpY2UgXHJcbiAgKiBcclxuICAqL1xyXG4gIHByaWNlTWluVmFsdWU6IG51bWJlciA9IDA7XHJcbiAgLyoqXHJcbiAgKiAgTWF4IHZhbHVlIHByaWNlIFxyXG4gICogXHJcbiAgKi9cclxuICBwcmljZU1heFZhbHVlOiBudW1iZXIgPSA1MDAwO1xyXG4gIEZpbHRlckNoYW5nZXMkOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcbiAgLyoqXHJcbiAqICBvcHRpbnMgaW5pdCBhbmQgcmV0dXJuIGRhdGEgYXMgc3RyaW5nIFxyXG4gKiBcclxuICovXHJcbiAgb3B0aW9uczogT3B0aW9ucyA9IHtcclxuICAgIGZsb29yOiAwLFxyXG4gICAgY2VpbDogNTAwMCxcclxuICAgIHRyYW5zbGF0ZTogKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSkudG9TdHJpbmcoKTtcclxuICAgIH0sXHJcbiAgfTtcclxuICAvKipcclxuICogaW5pdGFsIHJhdGUgY3VycmVjeSBjb2RlIGt3ZFxyXG4gKiBcclxuICovXHJcbiAgcmF0ZTogbnVtYmVyID0gMTtcclxuICBjb2RlOiBzdHJpbmcgPSBcIktXRFwiXHJcbiAgLyoqXHJcbiAqICBhcnJheSBvZiAgdHlwZSBzdHJpbmcgcmV0dXJuIGZlaCBrb2wgYWlybGluZSBiYWNrIGZyb20gYWlySXRpbmVyYXJpZXNcclxuICogXHJcbiAqL1xyXG4gIGFpcmxpbmVzQTogc3RyaW5nW10gPSBbXTtcclxuICBhaXJsaW5lc0Zvcm06IGFueSA9IFtdO1xyXG4gIGJvb2tpbmdTaXRlczogc3RyaW5nW10gPSBbJ0toYWxlZWpHYXRlJywgJ290aGVyJ107XHJcbiAgLyoqXHJcbiAqICBhcnJheSBvZiAgdHlwZSBib29sZWFuXHJcbiAqIFxyXG4gKi9cclxuICBib29raW5nU2l0ZXNGb3JtOiBib29sZWFuW10gPSBbXVxyXG4gIC8qKlxyXG4gKiAgaW5pdGFsIHNsaWRlciBmb3IgZmlsdGVyIHJldHVybiBmZWggZGF0ZSBtaW4gYW5kIG1heCBcclxuICogXHJcbiAqL1xyXG4gIGRlcGFydGluZ01pbjogbnVtYmVyID0gMDtcclxuICBkZXBhcnRpbmdNYXg6IG51bWJlciA9IDcwMDBcclxuICBvcHRpb25zZGVwYXJ0aW5nOiBPcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cclxuICBhcnJpdmluZ01pbjogbnVtYmVyID0gMDtcclxuICBhcnJpdmluZ01heDogbnVtYmVyID0gNzAwMFxyXG4gIG9wdGlvbnNBcnJpdmluZzogT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICBtaW5WYWx1ZTogbnVtYmVyID0gMFxyXG4gIG1heFZhbHVlOiBudW1iZXIgPSA1MDAwXHJcblxyXG4gIGR1cmF0aW9uTWluOiBudW1iZXIgPSAwO1xyXG4gIGR1cmF0aW9uTWF4OiBudW1iZXIgPSA3MDAwO1xyXG4gIG9wdGlvbnNEdXJhdGhpb246IE9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuLyoqUHJvcGVydHkgZm9yIGZhcmUgUnVsZXMgKi9cclxuICBmYXJlUnVsZXMhOiBGYXJlUnVsZXNbXTtcclxuICAvKipcclxuICAqICBpbml0YWwgZnJvbSBmaWx0ZXJcclxuICAqIFxyXG4gICovXHJcbiAgZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgYWlybGluZTogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgIGFpcmxpbmVzOiBuZXcgRm9ybUFycmF5KFtdKSxcclxuICAgIH0pLFxyXG4gICAgYm9va2luZ1NpdGU6IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBib29raW5nU2l0ZXM6IG5ldyBGb3JtQXJyYXkoW10pXHJcbiAgICB9KSxcclxuXHJcbiAgICBzdG9wc0Zvcm06IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBub1N0b3BzOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpLFxyXG4gICAgICBvbmVTdG9wOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpLFxyXG4gICAgICB0d29BbmRtOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpLFxyXG4gICAgfSksXHJcbiAgICBzYW1lQWlybGluZTogbmV3IEZvcm1Db250cm9sKGZhbHNlKSxcclxuXHJcbiAgICBwcmljZVNsaWRlcjogbmV3IEZvcm1Db250cm9sKFswLCAwXSksXHJcbiAgICBkdXJhdGlvblNsaWRlcjogbmV3IEZvcm1Db250cm9sKFswLCAwXSksXHJcbiAgICBkcGFydGluZ1NsaWRlcjogbmV3IEZvcm1Db250cm9sKFswLCAwXSksXHJcbiAgICBhcnJpdmluZ1NsaWRlcjogbmV3IEZvcm1Db250cm9sKFswLCAwXSksXHJcblxyXG4gICAgcmV0dXJuU2xpZGVyOiBuZXcgRm9ybUNvbnRyb2woWzMwLCA3MDAwXSksXHJcbiAgICBleHBlcmllbmNlOiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgb3Zlck5pZ2h0OiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpLFxyXG4gICAgICBsb25nU3RvcHM6IG5ldyBGb3JtQ29udHJvbChmYWxzZSlcclxuICAgIH0pLFxyXG5cclxuICAgIGZsZXhpYmxlVGlja2V0czogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgIHJlZnVuZDogbmV3IEZvcm1Db250cm9sKGZhbHNlKSxcclxuICAgICAgbm9uUmVmdW5kOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpXHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICBmb3JtSU5JVDpib29sZWFuID1mYWxzZTtcclxuXHJcbiAgcHJpY2VPcHRpb25zISA6IE9wdGlvbnNcclxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKVxyXG5cclxuICBtb3JlVDogYm9vbGVhbltdID0gW107XHJcbiAgLyoqXHJcbiogIGFycmF5IHJldHVybiBkYXRhIHR5cGUgYWlySXRpbmVyYXJpZXNbXSBhZnRlciBvcmdhbml6ZVxyXG4qIFxyXG4qL1xyXG4gIG9yZ25pemVkUmVzcG9uY2U6IGFpckl0aW5lcmFyaWVzW11bXSA9IFtdO1xyXG5cclxuIFxyXG4gIC8qKlxyXG4gICAqIGxvd2VzdCBmYXJlcyBmb3Igc29ydGluZyBjb250YWluZXJzXHJcbiAgICovXHJcbiAgY2hlYXBlYXN0TG93ZXN0RmFyZTpudW1iZXIgPSAwXHJcbiAgc2hvcnRlc3RMb3dlc3RGYXJlOm51bWJlciA9IDBcclxuICBiZXN0RXhwZXJpZW5jZUxvd2VzdEZhcmU6bnVtYmVyID0gMFxyXG5cclxuXHJcbiAgLyoqQ3VzdG9tIGFpcmxpbmVzIGZpbHRlciAqL1xyXG4gIGN1c3RvbUZpbHRlcmVkQWlybGluZSA6IGN1c3RvbUFpcmxpbmVGaWx0ZXJbXSA9IFtdO1xyXG4gIGNob3NlbkN1c3RvbUZpbHRlcmVkQWlybGluZSA6IHN0cmluZ1tdID0gW107XHJcbiAgY3VzdG9tRmlsdGVyZWRBaXJsaW5lU2xpY2U6Y3VzdG9tQWlybGluZUZpbHRlcltdID0gW107XHJcbiAgY3VzdG9tRmlsdGVyZWRBaXJsaW5lU3RhcnQgOiBudW1iZXIgPSAwO1xyXG4gIGN1c3RvbUZpbHRlcmVkQWlybGluZUVuZCA6IG51bWJlciA9IDQ7XHJcblxyXG4gIGN1c3RvbUZpbHRlcmVkQWlybGluZVNsaWNlTW9iaWxlOmN1c3RvbUFpcmxpbmVGaWx0ZXJbXSA9IFtdO1xyXG4gIGN1c3RvbUZpbHRlcmVkQWlybGluZVN0YXJ0TW9iaWxlIDogbnVtYmVyID0gMDtcclxuICBjdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmRNb2JpbGUgOiBudW1iZXIgPSAyO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAqIGdldCBhbGwgZGF0YSBmcm9tIHRoZSByb3V0ZXIgdG8gY2FsbCBhcGkgdG8gZ2V0IGZsaWdodFJlc3VsdERhdGFcclxuICogZnJvbSBBcGkgIHNlYXJjaEZsaWdodFxyXG4gKiovXHJcbiAgZ2V0RGF0YUZyb21VcmwobGFuZzogc3RyaW5nLCBjdXJyZW5jeTogc3RyaW5nLCBwb2ludE9mUmVzZXJ2YXRpb246IHN0cmluZywgZmxpZ2h0VHlwZTogc3RyaW5nLCBmbGlnaHRzSW5mbzogc3RyaW5nLCBzZXJhY2hJZDogc3RyaW5nLCBwYXNzZW5nZXJzOiBzdHJpbmcsIENjbGFzczogc3RyaW5nLCBzaG93RGlyZWN0OiBib29sZWFuLGVuZEN1c3RvbUFpcmxpbmVGaWx0ZXI6bnVtYmVyLGVuZEN1c3RvbUFpcmxpbmVGaWx0ZXJNb2JpbGU6bnVtYmVyKSB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBbXVxyXG4gICAgdGhpcy5GaWx0ZXJEYXRhID0gW11cclxuICAgIHRoaXMucmVzcG9uc2UgPSB1bmRlZmluZWRcclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lRW5kID0gZW5kQ3VzdG9tQWlybGluZUZpbHRlclxyXG4gICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmRNb2JpbGUgPSBlbmRDdXN0b21BaXJsaW5lRmlsdGVyTW9iaWxlXHJcbiAgICB0aGlzLkZsaWdodFR5cGUgPSBmbGlnaHRUeXBlO1xyXG4gICAgdGhpcy5zZWFyY2hJRCA9IHNlcmFjaElkXHJcbiAgICBpZiAodGhpcy5GbGlnaHRUeXBlID09ICdSb3VuZFRyaXAnKSB7XHJcbiAgICAgIHRoaXMucm91bmRUID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgbGV0IHNlYXJjaEFwaTogU2VhcmNoRmxpZ2h0TW9kdWxlID0gbmV3IFNlYXJjaEZsaWdodE1vZHVsZShsYW5nLCBjdXJyZW5jeSwgcG9pbnRPZlJlc2VydmF0aW9uLCBmbGlnaHRUeXBlLCBmbGlnaHRzSW5mbywgcGFzc2VuZ2VycywgQ2NsYXNzLCBzZXJhY2hJZCwgc2hvd0RpcmVjdCwgJ2FsbCcpO1xyXG4gICAgaWYgKFNlYXJjaEZsaWdodE1vZHVsZSkge1xyXG4gICAgICBsZXQgbXlhcGkgPSBzZWFyY2hBcGk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5hcGkuc2VhcmNoRmxpZ2h0KG15YXBpKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5mb3JtSU5JVCA9ZmFsc2U7XHJcbiAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PSAnVmFsaWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLlJlc3VsdEZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJBaXJsaW5lcygpXHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hMb3dlc3RGYXJlc0ZvclNvcnRpbmcodGhpcy5yZXNwb25zZS5haXJJdGluZXJhcmllcylcclxuICAgICAgICAgICAgdGhpcy5GaWx0ZXJEYXRhID0gcmVzdWx0LmFpckl0aW5lcmFyaWVzO1xyXG4gICAgICAgICAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSB0aGlzLm9yZ25pemUodGhpcy5GaWx0ZXJEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuRmlsdGVyQ2hhbmdlcyQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgICAgICAgYWlybGluZTogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgICAgICAgICBhaXJsaW5lczogbmV3IEZvcm1BcnJheShbXSlcclxuICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgYm9va2luZ1NpdGU6IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgYm9va2luZ1NpdGVzOiBuZXcgRm9ybUFycmF5KFtdKVxyXG4gICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICBzdG9wc0Zvcm06IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgbm9TdG9wczogbmV3IEZvcm1Db250cm9sKGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIG9uZVN0b3A6IG5ldyBGb3JtQ29udHJvbChmYWxzZSksXHJcbiAgICAgICAgICAgICAgICB0d29BbmRtOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgc2FtZUFpcmxpbmU6IG5ldyBGb3JtQ29udHJvbChmYWxzZSksXHJcbiAgICAgICAgICAgICAgcHJpY2VTbGlkZXI6IG5ldyBGb3JtQ29udHJvbChbMCwgMF0pLFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uU2xpZGVyOiBuZXcgRm9ybUNvbnRyb2woWzAsIDcwMDBdKSxcclxuICAgICAgICAgICAgICBkcGFydGluZ1NsaWRlcjogbmV3IEZvcm1Db250cm9sKFswLCAyMDAwMF0pLFxyXG4gICAgICAgICAgICAgIGFycml2aW5nU2xpZGVyOiBuZXcgRm9ybUNvbnRyb2woWzAsIDIwMDAwXSksXHJcbiAgICAgICAgICAgICAgcmV0dXJuU2xpZGVyOiBuZXcgRm9ybUNvbnRyb2woWzAsIDcwMDBdKSxcclxuXHJcbiAgICAgICAgICAgICAgZXhwZXJpZW5jZTogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgICAgICAgICBvdmVyTmlnaHQ6IG5ldyBGb3JtQ29udHJvbChmYWxzZSksXHJcbiAgICAgICAgICAgICAgICBsb25nU3RvcHM6IG5ldyBGb3JtQ29udHJvbChmYWxzZSlcclxuICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgZmxleGlibGVUaWNrZXRzOiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICAgICAgICAgIHJlZnVuZDogbmV3IEZvcm1Db250cm9sKGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIG5vblJlZnVuZDogbmV3IEZvcm1Db250cm9sKGZhbHNlKVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maW5kRGVwYXJ0aW5nbk1pbk1heCh0aGlzLnJlc3BvbnNlLmFpckl0aW5lcmFyaWVzKTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdldChcImRwYXJ0aW5nU2xpZGVyXCIpPy5zZXRWYWx1ZSggdGhpcy5maW5kRGVwYXJ0aW5nbk1pbk1heCh0aGlzLnJlc3BvbnNlLmFpckl0aW5lcmFyaWVzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZXQoXCJkcGFydGluZ1NsaWRlclwiKT8udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2V0KFwiZHVyYXRpb25TbGlkZXJcIik/LnNldFZhbHVlKHRoaXMuZmluZER1cmF0aW9uTWluTWF4KHRoaXMucmVzcG9uc2UuYWlySXRpbmVyYXJpZXMpKTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdldChcImR1cmF0aW9uU2xpZGVyXCIpPy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLmZpbmREZXBhcnRpbmduTWluTWF4KHRoaXMucmVzcG9uc2UuYWlySXRpbmVyYXJpZXMpXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZXQoXCJhcnJpdmluZ1NsaWRlclwiKT8uc2V0VmFsdWUodGhpcy5maW5kQXJyaXZpbmdNaW5NYXgodGhpcy5yZXNwb25zZS5haXJJdGluZXJhcmllcykpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2V0KFwiYXJyaXZpbmdTbGlkZXJcIik/LnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTsgICAgICAgICAgICAvLyB0aGlzLm1pbkFuTWF4KHRoaXMucmVzcG9uc2UuYWlySXRpbmVyYXJpZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2V0KCdwcmljZVNsaWRlcicpPy5zZXRWYWx1ZSh0aGlzLm1pbkFuTWF4KHRoaXMucmVzcG9uc2UuYWlySXRpbmVyYXJpZXMpKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wc3ZhbHVlcygpLFxyXG4gICAgICAgICAgICAgIHRoaXMuYWlybGluZXNBID0gdGhpcy5yZXNwb25zZS5haXJsaW5lcztcclxuICAgICAgICAgICAgdGhpcy5haXJsaW5lc0Zvcm0gPSBbXVxyXG4gICAgICAgICAgICB0aGlzLmFpcmxpbmVzQS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICg8Rm9ybUFycmF5PnRoaXMuZmlsdGVyRm9ybS5nZXQoJ2FpcmxpbmUnKT8uZ2V0KCdhaXJsaW5lcycpKS5wdXNoKG5ldyBGb3JtQ29udHJvbChmYWxzZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYm9va2luZ1NpdGVzRm9ybSA9IFtdXHJcbiAgICAgICAgICAgIHRoaXMuYm9va2luZ1NpdGVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgKDxGb3JtQXJyYXk+dGhpcy5maWx0ZXJGb3JtLmdldCgnYm9va2luZ1NpdGUnKT8uZ2V0KCdib29raW5nU2l0ZXMnKSkucHVzaChuZXcgRm9ybUNvbnRyb2woZmFsc2UpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUlOSVQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcigpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxFcnJvciA9IFwiTm8gcmVzdWx0IGZvdW5kLiA8YnI+IHBsZWFzZSBzZWFyY2ggYWdhaW5cIlxyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbEVycm9yU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuUmVzdWx0Rm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICAvKipcclxuICogdXBkYXRlIGZpbHRlciBpbnB1dFxyXG4gKiBcclxuICoqL1xyXG4gIHVwZGF0ZUZpbHRlcigpIHtcclxuICBcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgdGhpcy5maWx0ZXJGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1JTklUKSB7XHJcbiAgICAgICAgICBsZXQgZmlsdGVyOiBmbGlnaHRSZXN1bHRGaWx0ZXIgPSBuZXcgZmxpZ2h0UmVzdWx0RmlsdGVyKFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2V0KFwic2FtZUFpcmxpbmVcIik/LnZhbHVlISxcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdldChcInByaWNlU2xpZGVyXCIpPy52YWx1ZSFbMF0sXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybT8uZ2V0KFwicHJpY2VTbGlkZXJcIik/LnZhbHVlIVsxXSxcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdldChcImR1cmF0aW9uU2xpZGVyXCIpPy52YWx1ZSFbMF0sXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZXQoXCJkdXJhdGlvblNsaWRlclwiKT8udmFsdWUhWzFdLFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2V0KFwiZHBhcnRpbmdTbGlkZXJcIik/LnZhbHVlIVswXSxcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdldChcImRwYXJ0aW5nU2xpZGVyXCIpPy52YWx1ZSFbMV0sXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRm9ybS5nZXQoXCJhcnJpdmluZ1NsaWRlclwiKT8udmFsdWUhWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2V0KFwiYXJyaXZpbmdTbGlkZXJcIik/LnZhbHVlIVsxXSxcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJGb3JtLmdldChcInJldHVyblNsaWRlclwiKT8udmFsdWUhWzBdLFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckZvcm0uZ2V0KFwicmV0dXJuU2xpZGVyXCIpPy52YWx1ZSFbMV0sXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcHN2YWx1ZXMoKSxcclxuICAgICAgICAgICAgW3RoaXMuZmlsdGVyRm9ybS5nZXQoJ2V4cGVyaWVuY2UnKT8uZ2V0KCdvdmVyTmlnaHQnKT8udmFsdWUhXSxcclxuICAgICAgICAgICAgW3RoaXMuZmlsdGVyRm9ybS5nZXQoJ2ZsZXhpYmxlVGlja2V0cycpPy5nZXQoJ3JlZnVuZCcpPy52YWx1ZSEsIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2ZsZXhpYmxlVGlja2V0cycpPy5nZXQoJ25vblJlZnVuZCcpPy52YWx1ZSFdLFxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJpbmdieWFpcmxpbmUodGhpcy5maWx0ZXJGb3JtLmdldCgnYWlybGluZScpPy5nZXQoJ2FpcmxpbmVzJyk/LnZhbHVlISksXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyaW5nYnlCb29raW5nU2l0ZXModGhpcy5maWx0ZXJGb3JtLmdldCgnYm9va2luZ1NpdGUnKT8uZ2V0KCdib29raW5nU2l0ZXMnKT8udmFsdWUhKVxyXG5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLm9uZUZvckFsbChmaWx0ZXIsIHRoaXMuRmlsdGVyRGF0YSwgdGhpcy5yb3VuZFQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZmlsdGVyIGZ1bmNcclxuXHJcblxyXG4gIC8vIG5ldyBmaWx0ZXJhdGlvbiBtZXRob2RcclxuICBvbmVGb3JBbGwoZmlsdGVyOiBmaWx0ZXJGbGlnaHRJbnRlcmZhY2UsIGZsaWd0c0FycmF5OiBhaXJJdGluZXJhcmllc1tdLCByb3VuZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vcmduaXplZFJlc3BvbmNlID0gdGhpcy5vcmduaXplKGZsaWd0c0FycmF5LmZpbHRlcih2ID0+XHJcblxyXG4gICAgICB0aGlzLmZpbHRlckZsaWdoV2l0aFByaWNlKHYsIGZpbHRlcikgJiZcclxuICAgICAgdGhpcy5maWx0ZXJGbGlnaFdpdGhEZXBhcnRpb25UaW1lKHYsIGZpbHRlcikgJiZcclxuICAgICAgdGhpcy5maWx0ZXJGbGlnaFdpdGhBcnJpdmFsVGltZSh2LCBmaWx0ZXIpICYmXHJcbiAgICAgIHRoaXMuRmxleFRpY2tldGNoZWNrKHYsIGZpbHRlcikgJiZcclxuICAgICAgdGhpcy5maWx0ZXJGbGlnaHRXaXRoTnVtYmVyb2ZTdG9wc0Z1bmN0aW9uKHYsIGZpbHRlcikgJiZcclxuICAgICAgdGhpcy5maWx0ZXJGbGlnaFdpdGhEdXJhdGlvbih2LCBmaWx0ZXIpICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyV2l0aEV4cGVyaWVuY2UodiwgZmlsdGVyKSAmJlxyXG4gICAgICB0aGlzLmZpbHRlckZsaWdoV2l0aFJldHVyblRpbWUodiwgZmlsdGVyLCB0aGlzLnJvdW5kVCkgJiZcclxuICAgICAgdGhpcy5jb21wbGV0ZVRyaXBPblNhbWVBaXJsaW5lKHYsIGZpbHRlcikgJiZcclxuICAgICAgdGhpcy5maWx0ZXJGbGlnaHRXaXRoQWlybGluZUZ1bmN0aW9uKHYsIGZpbHRlcix0aGlzLnJvdW5kVClcclxuXHJcblxyXG4gICAgKSlcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBncm91cGluZyBkYXRhIHJldHVybiB0d28gYXJyYXkgYXJyYXkgYWlySXRpbmVyYXJpZXMgYW5kIGFycmF5IGhhdmUgc2FtZSBwcmljZVxyXG4gICAqKi9cclxuXHJcbiAgb3Jnbml6ZShhcnJheTogYWlySXRpbmVyYXJpZXNbXSkge1xyXG4gICAgbGV0IG91dCA6YWlySXRpbmVyYXJpZXNbXVtdPVtdO1xyXG4gICAgbGV0IHJlbWFpbjphaXJJdGluZXJhcmllc1tdID1hcnJheTtcclxuICAgIGxldCBpID0gMDtcclxuICAgIHdoaWxlIChyZW1haW4ubGVuZ3RoID4wIHx8ICFyZW1haW4pIHtcclxuICAgICAgaWYgKGk+NTApe1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIG91dC5wdXNoKHJlbWFpbi5maWx0ZXIoKHYsaSxhKT0+di5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPWzBdLmZsaWdodEFpcmxpbmUuYWlybGluZUNvZGUgPT09YVswXS5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPWzBdLmZsaWdodEFpcmxpbmUuYWlybGluZUNvZGUgJiYgdi5pdGluVG90YWxGYXJlLmFtb3VudCA9PT0gYVswXS5pdGluVG90YWxGYXJlLmFtb3VudCkpO1xyXG4gICAgICAgIHJlbWFpbiA9IHJlbWFpbi5maWx0ZXIoKHYsaSxhKT0+di5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPWzBdLmZsaWdodEFpcmxpbmUuYWlybGluZUNvZGUgIT1hWzBdLmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE9bMF0uZmxpZ2h0QWlybGluZS5haXJsaW5lQ29kZSB8fCB2Lml0aW5Ub3RhbEZhcmUuYW1vdW50ICE9IGFbMF0uaXRpblRvdGFsRmFyZS5hbW91bnQpO1xyXG4gICAgICB9XHJcbiAgICAgIGkgPSBpICsxXHJcbiAgICB9XHJcbiAgICBcclxuICAgcmV0dXJuIG91dFxyXG4gIFxyXG4gIFxyXG4gIH1cclxuICAvKipcclxuICAgKiBjcmVhdGUgYW4gYXJyYXkgd2l0aCB0aGUgc2FtZSBsZW5ndGggb2YgdGhlIG91dHB1dFxyXG4gICAqKi9cclxuICB2YWx1ZXNvZnRydWVNKGFycmF5OiBhaXJJdGluZXJhcmllc1tdKSB7XHJcbiAgICBsZXQgb3V0OiBhbnlbXSA9IFtdO1xyXG4gICAgbGV0IGFycnlhbGVuZ3R5ID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycnlhbGVuZ3R5OyBpbmRleCsrKSB7XHJcbiAgICAgIGxldCB0cnV0aDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgIG91dC5wdXNoKHRydXRoKTtcclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5tb3JlVCA9IG91dDtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgICogXHJcbiAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgXHJcbiAgICAqIHNvcnQgcmVzdWx0IGJhc2Ugb24gdHlwZTpudW1iZXIgcmV0dXJuIGRhdGE6IGFpckl0aW5lcmFyaWVzW10gc29ydGluZyBieSBjb25kaXRpb24gb3IgdHlwZSAgXHJcbiAgICAqIFxyXG4gICAgKi9cclxuXHJcbiAgc29ydE15UmVzdWx0KHR5cGU6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMucmVzcG9uc2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBcclxuICAgICAgICAgIFsuLi50aGlzLm9yZ25pemVkUmVzcG9uY2VdLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGFbMF0uaXRpblRvdGFsRmFyZS5hbW91bnQgLSBiWzBdLml0aW5Ub3RhbEZhcmUuYW1vdW50IH0pXHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgIHRoaXMub3Jnbml6ZWRSZXNwb25jZSA9IFsuLi50aGlzLm9yZ25pemVkUmVzcG9uY2VdLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGFbMF0udG90YWxEdXJhdGlvbiAtIGJbMF0udG90YWxEdXJhdGlvbiB9KVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBbLi4udGhpcy5vcmduaXplZFJlc3BvbmNlXS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiA8YW55Pm5ldyBEYXRlKGFbMF0uZGVwdERhdGUpIC0gPGFueT5uZXcgRGF0ZShiWzBdLmRlcHREYXRlKSB9KVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlID09IDQpIHtcclxuICAgICAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBbLi4udGhpcy5vcmduaXplZFJlc3BvbmNlXS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiA8YW55Pm5ldyBEYXRlKGJbMF0uZGVwdERhdGUpIC0gPGFueT5uZXcgRGF0ZShhWzBdLmRlcHREYXRlKSB9KVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlID09IDUpIHtcclxuICAgICAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBbLi4udGhpcy5vcmduaXplZFJlc3BvbmNlXS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiA8YW55Pm5ldyBEYXRlKGFbMF0uYWxsSm91cm5leS5mbGlnaHRzWzFdLmZsaWdodERUT1swXS5kZXBhcnR1cmVEYXRlKSAtIDxhbnk+bmV3IERhdGUoYlswXS5hbGxKb3VybmV5LmZsaWdodHNbMV0uZmxpZ2h0RFRPWzBdLmRlcGFydHVyZURhdGUpIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlID09IDYpIHtcclxuICAgICAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBbLi4udGhpcy5vcmduaXplZFJlc3BvbmNlXS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiA8YW55Pm5ldyBEYXRlKGJbMF0uYWxsSm91cm5leS5mbGlnaHRzWzFdLmZsaWdodERUT1swXS5kZXBhcnR1cmVEYXRlKSAtIDxhbnk+bmV3IERhdGUoYVswXS5hbGxKb3VybmV5LmZsaWdodHNbMV0uZmxpZ2h0RFRPWzBdLmRlcGFydHVyZURhdGUpIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlID09IDcpIHtcclxuICAgICAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBbLi4udGhpcy5vcmduaXplZFJlc3BvbmNlXS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhWzBdLmV4cGVyaWFuY2UgLSBiWzBdLmV4cGVyaWFuY2UgfSlcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGhlIGxvd2VzdCBmYXJlcyBmb3IgYWxsIHNvcnRpbmcgY3JpdGVyaWFzXHJcbiAgICogQHBhcmFtIGRhdGEgKGFsbCB0aGUgaXRpbmVyYXJpZXMpXHJcbiAgICovXHJcbiAgZmV0Y2hMb3dlc3RGYXJlc0ZvclNvcnRpbmcoZGF0YTphaXJJdGluZXJhcmllc1tdKXtcclxuICAgIHRoaXMuY2hlYXBlYXN0TG93ZXN0RmFyZSA9IFsuLi5kYXRhXS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhLml0aW5Ub3RhbEZhcmUuYW1vdW50IC0gYi5pdGluVG90YWxGYXJlLmFtb3VudCB9KVswXS5pdGluVG90YWxGYXJlLmFtb3VudFxyXG4gICAgdGhpcy5iZXN0RXhwZXJpZW5jZUxvd2VzdEZhcmUgPSBbLi4uZGF0YV0uc29ydCgoYSwgYikgPT4geyByZXR1cm4gYS5leHBlcmlhbmNlIC0gYi5leHBlcmlhbmNlIH0pWzBdLml0aW5Ub3RhbEZhcmUuYW1vdW50XHJcbiAgICB0aGlzLnNob3J0ZXN0TG93ZXN0RmFyZSA9IFsuLi5kYXRhXS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhLnRvdGFsRHVyYXRpb24gLSBiLnRvdGFsRHVyYXRpb24gfSlbMF0uaXRpblRvdGFsRmFyZS5hbW91bnRcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IG1pbiAsIG1heCB2YWx1ZSBzbGlkZXIgZnJvbSBiYWNrIGRhdGEgXHJcbiAgICoqL1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBGaWx0ZXIgVmFsdWVzIGFpckl0aW5lcmFyaWVzW10gYnkgUHJpY2UgQW5kIFVwZGF0ZSBGaWx0aXJhdGlvbiBTbGlkZXJcclxuICAqKi9cclxuICBtaW5Bbk1heChkYXRhOiBhaXJJdGluZXJhcmllc1tdKSB7XHJcblxyXG4gICAgbGV0IGFycjogYWlySXRpbmVyYXJpZXNbXSA9IFsuLi5kYXRhXTtcclxuICAgIGxldCBzb3J0ZWRSZXMgPSBbXHJcbiAgICAgIC4uLmFyci5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGEuaXRpblRvdGFsRmFyZS5hbW91bnQgLSBiLml0aW5Ub3RhbEZhcmUuYW1vdW50O1xyXG4gICAgICB9KSxcclxuICAgIF07XHJcblxyXG4gICAgbGV0IG1pblZhbHVlID0gc29ydGVkUmVzWzBdLml0aW5Ub3RhbEZhcmUuYW1vdW50O1xyXG4gICAgbGV0IG1heFZhbHVlMSA9IHNvcnRlZFJlc1tzb3J0ZWRSZXMubGVuZ3RoIC0gMV0uaXRpblRvdGFsRmFyZS5hbW91bnQ7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICBmbG9vcjogbWluVmFsdWUsXHJcbiAgICAgIGNlaWw6IE1hdGgucm91bmQobWF4VmFsdWUxICsgMTApLFxyXG4gICAgICB0cmFuc2xhdGU6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSkudG9TdHJpbmcoKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICB0aGlzLnByaWNlTWluVmFsdWUgPSBtaW5WYWx1ZTtcclxuICAgIHRoaXMucHJpY2VNYXhWYWx1ZSA9IE1hdGgucm91bmQobWF4VmFsdWUxICsgMTApO1xyXG4gICAgdGhpcy5tYXhWYWx1ZSA9IE1hdGgucm91bmQobWF4VmFsdWUxICsgMTApO1xyXG4gICAgcmV0dXJuIFttaW5WYWx1ZSwgdGhpcy5tYXhWYWx1ZV1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiBGaW5kIE1pbiBBbmQgTWF4IFZhbHVlcyBhbmQgIEZpbHRlciBWYWx1ZXMgYWlySXRpbmVyYXJpZXNbXSAgT2YgRmxpZ2h0IER1cmF0aW9uICBBbmQgVXBkYXRlIEZpbHRpcmF0aW9uIFNsaWRlclxyXG4gICAgKiovXHJcbiAgZmluZER1cmF0aW9uTWluTWF4KGFycmF5OiBhbnlbXSkge1xyXG4gICAgbGV0IHNvcnRlZCA9IFsuLi5hcnJheV0uc29ydCgoYSwgYikgPT4gYi50b3RhbER1cmF0aW9uIC0gYS50b3RhbER1cmF0aW9uKTtcclxuICAgIGxldCBtaW4gPSBzb3J0ZWRbc29ydGVkLmxlbmd0aCAtIDFdWyd0b3RhbER1cmF0aW9uJ107XHJcbiAgICBsZXQgbWF4ID0gc29ydGVkWzBdWyd0b3RhbER1cmF0aW9uJ107XHJcbiAgICB0aGlzLmR1cmF0aW9uTWF4ID0gbWF4ICsgMTAwO1xyXG4gICAgdGhpcy5kdXJhdGlvbk1pbiA9IG1pbjtcclxuICAgIHRoaXMub3B0aW9uc0R1cmF0aGlvbiA9IHtcclxuICAgICAgZmxvb3I6IG1pbixcclxuICAgICAgY2VpbDogbWF4ICsgMTAwLFxyXG4gICAgICBub1N3aXRjaGluZzogdHJ1ZSxcclxuICAgICAgdHJhbnNsYXRlOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgbGV0IGggPSB2YWx1ZSAvIDYwIHwgMDtcclxuICAgICAgICBsZXQgbSA9IHZhbHVlICUgNjAgfCAwO1xyXG4gICAgICAgIHJldHVybiBoICsgXCJoXCIgKyBcIjpcIiArIG0gKyBcIm1cIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFttaW4sIG1heCArIDEwMF07XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqICBGaW5kIE1pbiBBbmQgTWF4IFZhbHVlcyBPZiBGbGlnaHQgRGVwYXJ0aW5nIERhdGVzICBBbmQgVXBkYXRlIEZpbHRpcmF0aW9uIFNsaWRlclxyXG4gICAqKi9cclxuICBmaW5kRGVwYXJ0aW5nbk1pbk1heChhcnJheTogYWlySXRpbmVyYXJpZXNbXSkge1xyXG4gICAgbGV0IG1pbiA9IHRoaXMuY29udmVydFRvTWluKGFycmF5WzBdLmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE9bMF0uZGVwYXJ0dXJlRGF0ZSk7XHJcbiAgICBsZXQgbWF4ID0gdGhpcy5jb252ZXJ0VG9NaW4oYXJyYXlbMF0uYWxsSm91cm5leS5mbGlnaHRzWzBdLmZsaWdodERUT1swXS5kZXBhcnR1cmVEYXRlKTtcclxuICAgIGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGxldCB0ID0gdGhpcy5jb252ZXJ0VG9NaW4oZWxlbWVudC5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPWzBdLmRlcGFydHVyZURhdGUpXHJcbiAgICAgIGlmICh0IDwgbWluKSB7XHJcbiAgICAgICAgbWluID0gdDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodCA+IG1heCkge1xyXG4gICAgICAgIG1heCA9IHQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZGVwYXJ0aW5nTWluID0gbWluO1xyXG4gICAgdGhpcy5kZXBhcnRpbmdNYXggPSBtYXg7XHJcbiAgICB0aGlzLm9wdGlvbnNkZXBhcnRpbmcgPSB7XHJcbiAgICAgIGZsb29yOiBtaW4sXHJcbiAgICAgIGNlaWw6IG1heCxcclxuICAgICAgbm9Td2l0Y2hpbmc6IGZhbHNlLFxyXG4gICAgICB0cmFuc2xhdGU6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgICAgICBsZXQgaCA9IHZhbHVlIC8gNjAgfCAwO1xyXG4gICAgICAgIGxldCBtID0gdmFsdWUgJSA2MCB8IDA7XHJcbiAgICAgICAgcmV0dXJuIGggKyBcImhcIiArIFwiOlwiICsgbSArIFwibVwiO1xyXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh2YWx1ZSAqIDEwMDAsICdISDptbSBhJylcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBbbWluLCBtYXhdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiogIEZpbmQgTWluIEFuZCBNYXggVmFsdWVzIE9mIEZsaWdodCBhcnJpdmluZyBEYXRlcyAgQW5kIFVwZGF0ZSBGaWx0aXJhdGlvbiBTbGlkZXJcclxuKiovXHJcblxyXG4gIGZpbmRBcnJpdmluZ01pbk1heChhcnJheTogYWlySXRpbmVyYXJpZXNbXSkge1xyXG4gICAgbGV0IG1pbiA9IHRoaXMuY29udmVydFRvTWluKGFycmF5WzBdLmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE9bYXJyYXlbMF0uYWxsSm91cm5leS5mbGlnaHRzWzBdLmZsaWdodERUTy5sZW5ndGggLSAxXS5hcnJpdmFsRGF0ZSk7XHJcbiAgICBsZXQgbWF4ID0gdGhpcy5jb252ZXJ0VG9NaW4oYXJyYXlbMF0uYWxsSm91cm5leS5mbGlnaHRzWzBdLmZsaWdodERUT1thcnJheVswXS5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPLmxlbmd0aCAtIDFdLmFycml2YWxEYXRlKTtcclxuICAgIGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGxldCB0ID0gdGhpcy5jb252ZXJ0VG9NaW4oZWxlbWVudC5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPW2VsZW1lbnQuYWxsSm91cm5leS5mbGlnaHRzWzBdLmZsaWdodERUTy5sZW5ndGggLSAxXS5hcnJpdmFsRGF0ZSlcclxuICAgICAgaWYgKHQgPCBtaW4pIHtcclxuICAgICAgICBtaW4gPSB0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0ID4gbWF4KSB7XHJcbiAgICAgICAgbWF4ID0gdDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hcnJpdmluZ01pbiA9IG1pbjtcclxuICAgIHRoaXMuYXJyaXZpbmdNYXggPSBtYXg7XHJcbiAgICB0aGlzLm9wdGlvbnNBcnJpdmluZyA9IHtcclxuICAgICAgZmxvb3I6IG1pbixcclxuICAgICAgY2VpbDogbWF4LFxyXG4gICAgICBub1N3aXRjaGluZzogdHJ1ZSxcclxuICAgICAgdHJhbnNsYXRlOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgbGV0IGggPSB2YWx1ZSAvIDYwIHwgMDtcclxuICAgICAgICBsZXQgbSA9IHZhbHVlICUgNjAgfCAwO1xyXG4gICAgICAgIHJldHVybiBoICsgXCJoXCIgKyBcIjpcIiArIG0gKyBcIm1cIjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBbbWluLCBtYXhdO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbnMgZmlsdGVyIHRvIGZpbHRlciBkYXRhIFxyXG4gICAqKi9cclxuXHJcbiAgLyoqXHJcbiAqICB0YWtlIGRhdGUgc3RyaW5nIHJldHVybiBudW1iZXJcclxuICoqL1xyXG4gIGNvbnZlcnRUb01pbih0aW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgbGV0IGRhdGUgPSB0aW1lO1xyXG4gICAgbGV0IFQgPSBkYXRlLmluZGV4T2YoJ1QnKTtcclxuICAgIGxldCBoID0gZGF0ZS5zbGljZShUICsgMSk7XHJcbiAgICBsZXQgaHIgPSAraC5zbGljZSgwLCAyKSAqIDYwO1xyXG4gICAgbGV0IG0gPSAraC5zbGljZSgzLCA1KTtcclxuICAgIGxldCB0bSA9IGhyICsgbTtcclxuICAgIHJldHVybiB0bVxyXG4gIH1cclxuICAvKipcclxuICogIGZpbHRlciBieSBwcmljZSB2YWx1ZVxyXG4gKiovXHJcbiAgZmlsdGVyRmxpZ2hXaXRoUHJpY2UoZmxpZ2h0OiBhaXJJdGluZXJhcmllcywgZmlsdGVyOiBmaWx0ZXJGbGlnaHRJbnRlcmZhY2UpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmbGlnaHQuaXRpblRvdGFsRmFyZS5hbW91bnQgPj0gZmlsdGVyLnByaWNlTWluISAmJiBmbGlnaHQuaXRpblRvdGFsRmFyZS5hbW91bnQgPCBmaWx0ZXIucHJpY2VNYXghO1xyXG4gIH1cclxuICAvKipcclxuKiAgZmlsdGVyIGJ5IERlcGFydGluZ1RpbWVcclxuKiovXHJcbiAgZmlsdGVyRmxpZ2hXaXRoRGVwYXJ0aW9uVGltZShmbGlnaHQ6IGFpckl0aW5lcmFyaWVzLCBmaWx0ZXI6IGZpbHRlckZsaWdodEludGVyZmFjZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWluKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPWzBdLmRlcGFydHVyZURhdGUpID49IGZpbHRlci5kZXBhdGluZ01pbiEgJiYgdGhpcy5jb252ZXJ0VG9NaW4oZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE9bMF0uZGVwYXJ0dXJlRGF0ZSkgPD0gZmlsdGVyLmRlcGFydGluZ01heCE7XHJcblxyXG4gIH1cclxuICAvKipcclxuKiAgZmlsdGVyIGJ5IEFycml2YWxUaW1lXHJcbioqL1xyXG4gIGZpbHRlckZsaWdoV2l0aEFycml2YWxUaW1lKGZsaWdodDogYWlySXRpbmVyYXJpZXMsIGZpbHRlcjogZmlsdGVyRmxpZ2h0SW50ZXJmYWNlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0VG9NaW4oZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE9bZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE8ubGVuZ3RoIC0gMV0uYXJyaXZhbERhdGUpID49IGZpbHRlci5hcnJpdmluZ01pbiEgJiYgdGhpcy5jb252ZXJ0VG9NaW4oZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE9bZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0c1swXS5mbGlnaHREVE8ubGVuZ3RoIC0gMV0uYXJyaXZhbERhdGUpIDw9IGZpbHRlci5hcnJpdmluZ01heCE7XHJcblxyXG4gIH1cclxuICAvKipcclxuICogIGZpbHRlciBieSBEdXJhdGlvbiBmbGlnaHRcclxuICoqL1xyXG4gIGZpbHRlckZsaWdoV2l0aER1cmF0aW9uKGZsaWdodDogYWlySXRpbmVyYXJpZXMsIGZpbHRlcjogZmlsdGVyRmxpZ2h0SW50ZXJmYWNlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmxpZ2h0LnRvdGFsRHVyYXRpb24gPj0gZmlsdGVyLmR1cmF0aW9uTWluISAmJiBmbGlnaHQudG90YWxEdXJhdGlvbiA8IGZpbHRlci5kdXJhdGlvbk1heCE7XHJcbiAgfVxyXG4gIC8qKlxyXG4qICBmaWx0ZXIgYnkgc3RvcHMgdmFsdWVcclxuKiovXHJcblxyXG4gIHN0b3BzdmFsdWVzKCkge1xyXG4gICAgbGV0IG91dDogbnVtYmVyW10gPSBbXTtcclxuICAgIGlmICh0aGlzLmZpbHRlckZvcm0uZ2V0KCdzdG9wc0Zvcm0nKT8uZ2V0KCdub1N0b3BzJyk/LnZhbHVlKSB7XHJcbiAgICAgIG91dC5wdXNoKDApXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5maWx0ZXJGb3JtLmdldCgnc3RvcHNGb3JtJyk/LmdldCgnb25lU3RvcCcpPy52YWx1ZSkge1xyXG4gICAgICBvdXQucHVzaCgxKVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3N0b3BzRm9ybScpPy5nZXQoJ3R3b0FuZG0nKT8udmFsdWUpIHtcclxuICAgICAgb3V0LnB1c2goMik7XHJcbiAgICAgIG91dC5wdXNoKDMpO1xyXG4gICAgICBvdXQucHVzaCg0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3N0b3BzRm9ybScpPy5nZXQoJ25vU3RvcHMnKT8udmFsdWUgJiYgIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3N0b3BzRm9ybScpPy5nZXQoJ29uZVN0b3AnKT8udmFsdWUgJiYgIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3N0b3BzRm9ybScpPy5nZXQoJ3R3b0FuZG0nKT8udmFsdWUpIHtcclxuICAgICAgb3V0ID0gWzAsIDEsIDIsIDMsIDRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXRcclxuICB9XHJcbiAgLyoqXHJcbiogIGZpbHRlciBieSBzdG9wcyB2YWx1ZVxyXG4qKi9cclxuICBmaWx0ZXJGbGlnaHRXaXRoTnVtYmVyb2ZTdG9wc0Z1bmN0aW9uKGZsaWdodDogYWlySXRpbmVyYXJpZXMsIGZpbHRlcjogZmlsdGVyRmxpZ2h0SW50ZXJmYWNlKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgc3RvcEZsYWdlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlmKGZpbHRlci5zdG9wcyFbMF0gPT0gMCAmJiBmaWx0ZXIuc3RvcHMhWzFdID09IDEgJiYgZmlsdGVyLnN0b3BzIVsyXSA9PSAyICYmIGZpbHRlci5zdG9wcyFbM10gPT0gMyAmJiBmaWx0ZXIuc3RvcHMhWzRdID09IDQpe1xyXG4gICAgICBzdG9wRmxhZ2UgPSB0cnVlXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmaWx0ZXI/LnN0b3BzIVswXSA9PSAwICYmIGZpbHRlci5zdG9wcz8ubGVuZ3RoISA9PSAxKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChmbGlnaHQuYWxsSm91cm5leS5mbGlnaHRzW2ldLnN0b3BzTnVtICE9IDApIHtcclxuICAgICAgICAgIHN0b3BGbGFnZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAoZmlsdGVyLnN0b3BzIVswXSA9PSAwICYmIGZpbHRlci5zdG9wcyFbMV0gPT0gMSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0c1tpXS5zdG9wc051bSA+IDEpIHtcclxuICAgICAgICAgIHN0b3BGbGFnZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAoZmlsdGVyLnN0b3BzIVswXSA9PSAwICYmIGZpbHRlci5zdG9wcyFbMV0gPT0gMikge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0c1tpXS5zdG9wc051bSA9PSAxKSB7XHJcbiAgICAgICAgICBzdG9wRmxhZ2UgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKGZpbHRlci5zdG9wcyFbMF0gPT0gMSAmJiBmaWx0ZXIuc3RvcHM/Lmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmxpZ2h0LmFsbEpvdXJuZXkuZmxpZ2h0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChmbGlnaHQuYWxsSm91cm5leS5mbGlnaHRzW2ldLnN0b3BzTnVtICE9IDEpIHtcclxuICAgICAgICAgIHN0b3BGbGFnZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZihmaWx0ZXIuc3RvcHMhWzBdID09IDEgJiYgZmlsdGVyLnN0b3BzIVsxXSA9PSAyKXtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbGlnaHQuYWxsSm91cm5leS5mbGlnaHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbaV0uc3RvcHNOdW0gPCAyICYmIGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbaV0uc3RvcHNOdW0gIT0gMSkge1xyXG4gICAgICAgICAgc3RvcEZsYWdlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbHNlIGlmIChmaWx0ZXIuc3RvcHMhWzBdID09IDIpIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbGlnaHQuYWxsSm91cm5leS5mbGlnaHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbaV0uc3RvcHNOdW0gPCAyKSB7XHJcbiAgICAgICAgICBzdG9wRmxhZ2UgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2Uge1xyXG4gICAgICBzdG9wRmxhZ2UgPSB0cnVlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiBzdG9wRmxhZ2VcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogIGZpbHRlciBieSBhaXJsaW5lXHJcbiAgKiovXHJcblxyXG5cclxuXHJcbiAgZmlsdGVyaW5nYnlhaXJsaW5lKHZhbDogYW55W10pIHtcclxuICAgIGxldCBhaXJMOiBhbnlbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHZhbC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IHZhbFtpbmRleF07XHJcbiAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYWlyTC5wdXNoKHRoaXMuYWlybGluZXNBW2luZGV4XSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgaWYgKGFpckwubGVuZ3RoID09IDApIHtcclxuICAgICAgbGV0IG91dCA9IGFpckw7XHJcbiAgICAgIHRoaXMuYWlyTFIgPSBvdXRcclxuICAgICAgcmV0dXJuIG91dFxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBhaXJMO1xyXG4gICAgfVxyXG4gIH1cclxuICBmaWx0ZXJGbGlnaHRXaXRoQWlybGluZUZ1bmN0aW9uKGZsaWdodDogYWlySXRpbmVyYXJpZXMsIGZpbHRlcjogZmlsdGVyRmxpZ2h0SW50ZXJmYWNlLHJvdW5kVDpib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZihyb3VuZFQpe1xyXG4gICAgICByZXR1cm4gZmlsdGVyLmFpcmxpbmVzIS5pbmRleE9mKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbMF1bJ2ZsaWdodEFpcmxpbmUnXVsnYWlybGluZU5hbWUnXSkgIT0gLTEgfHwgZmlsdGVyLmFpcmxpbmVzIS5pbmRleE9mKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbMV1bJ2ZsaWdodEFpcmxpbmUnXVsnYWlybGluZU5hbWUnXSkgIT0gLTEgIHx8IGZpbHRlci5haXJsaW5lcz8ubGVuZ3RoID09IDBcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gZmlsdGVyLmFpcmxpbmVzIS5pbmRleE9mKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbMF1bJ2ZsaWdodEFpcmxpbmUnXVsnYWlybGluZU5hbWUnXSkgIT0gLTEgfHwgZmlsdGVyLmFpcmxpbmVzPy5sZW5ndGggPT0gMFxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICogIGZpbHRlciBieSBSZXR1cm5UaW1lXHJcbiAqKi9cclxuXHJcbiAgZmlsdGVyRmxpZ2hXaXRoUmV0dXJuVGltZShmbGlnaHQ6IGFpckl0aW5lcmFyaWVzLCBmaWx0ZXI6IGZpbHRlckZsaWdodEludGVyZmFjZSwgcm91bmRUOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICByb3VuZFQgPSB0aGlzLnJvdW5kVFxyXG4gICAgaWYocm91bmRUKXtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWluKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbMV0uZmxpZ2h0RFRPWzBdLmRlcGFydHVyZURhdGUpID49IGZpbHRlci5yZXR1cm5NaW4hICYmIHRoaXMuY29udmVydFRvTWluKGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbMV0uZmxpZ2h0RFRPWzBdLmRlcGFydHVyZURhdGUpIDwgZmlsdGVyLnJldHVybk1heCE7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIFxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gKiAgZmlsdGVyIGJ5IGJvb2tpbmcgc2l0ZXNcclxuICoqL1xyXG5cclxuXHJcbiAgZmlsdGVyaW5nYnlCb29raW5nU2l0ZXModmFsOiBzdHJpbmdbXSkge1xyXG4gICAgbGV0IHNlbGVjdGVkU2l0ZXM6IGFueVtdID0gW107XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdmFsLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBjb25zdCBlbGVtZW50ID0gdmFsW2luZGV4XTtcclxuICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICBzZWxlY3RlZFNpdGVzLnB1c2godGhpcy5ib29raW5nU2l0ZXNbaW5kZXhdKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICBpZiAoc2VsZWN0ZWRTaXRlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICBsZXQgb3V0ID0gc2VsZWN0ZWRTaXRlcztcclxuICAgICAgcmV0dXJuIG91dFxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBzZWxlY3RlZFNpdGVzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBjaGVjayB2YWx1ZSBzdG9wIFxyXG4gICoqL1xyXG4gIHN0b3BzY2hlY2soc3RvcHM6IG51bWJlcltdLCBmbGlnaHQ6IGZsaWdodFtdKSB7XHJcbiAgICBsZXQgc3RhdHVzOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgZmxpZ2h0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGlmIChzdG9wcy5pbmRleE9mKGVsZW1lbnQuc3RvcHNOdW0pID09IC0xKSB7XHJcbiAgICAgICAgc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdGF0dXNcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBjaGVjayBGbGV4dFRpY2tldCBcclxuICAqKi9cclxuICBGbGV4VGlja2V0Y2hlY2soZmxpZ2h0OiBhaXJJdGluZXJhcmllcywgZmlsdGVyOiBmaWx0ZXJGbGlnaHRJbnRlcmZhY2UpOiBib29sZWFuIHtcclxuICAgIGlmIChmaWx0ZXIuZmxleGlibGVUaWNrZXQhWzBdICYmICFmaWx0ZXIuZmxleGlibGVUaWNrZXQhWzFdKSB7XHJcbiAgICAgIGlmIChmbGlnaHQuaXNSZWZ1bmRhYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKCFmaWx0ZXIuZmxleGlibGVUaWNrZXQhWzBdICYmIGZpbHRlci5mbGV4aWJsZVRpY2tldCFbMV0pIHtcclxuICAgICAgaWYgKGZsaWdodC5pc1JlZnVuZGFibGUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAoIWZpbHRlci5mbGV4aWJsZVRpY2tldCFbMF0gJiYgIWZpbHRlci5mbGV4aWJsZVRpY2tldCFbMV0pIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcbiAgICBlbHNlIGlmIChmaWx0ZXIuZmxleGlibGVUaWNrZXQhWzBdICYmIGZpbHRlci5mbGV4aWJsZVRpY2tldCFbMV0pIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAqIGZpbHRlciBkYXRhIGJhc2VkIG9uICBleHBlcmllbmNlIHZhbHVlIFxyXG4gICoqL1xyXG4gIGZpbHRlcldpdGhFeHBlcmllbmNlKGZsaWdodDogYWlySXRpbmVyYXJpZXMsIGZpbHRlcjogZmlsdGVyRmxpZ2h0SW50ZXJmYWNlKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoZmlsdGVyLmV4cGVyaWVuY2UhWzBdICYmICFmaWx0ZXIuZXhwZXJpZW5jZSFbMV0pIHtcclxuICAgICAgaWYgKGZsaWdodC5vdmVyTmlnaHQgPT0gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7IHJldHVybiBmYWxzZSB9XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAoZmlsdGVyLmV4cGVyaWVuY2UhWzFdICYmICFmaWx0ZXIuZXhwZXJpZW5jZSFbMF0pIHtcclxuICAgICAgaWYgKGZsaWdodD8uc3RvcHNUaW1lISA8IDQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKGZpbHRlci5leHBlcmllbmNlIVsxXSAmJiBmaWx0ZXIuZXhwZXJpZW5jZSFbMF0pIHtcclxuICAgICAgaWYgKGZsaWdodC5vdmVyTmlnaHQgPT0gMCAmJiBmbGlnaHQuc3RvcHNUaW1lISA8IDQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2UgaWYgKCFmaWx0ZXIuZXhwZXJpZW5jZSFbMV0gJiYgIWZpbHRlci5leHBlcmllbmNlIVswXSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAqIGZpbHRlciBkYXRhIGJhc2VkIG9uICBTYW1lQWlybGluZSAgXHJcbiAgKiovXHJcbiAgY29tcGxldGVUcmlwT25TYW1lQWlybGluZShmbGlnaHQ6IGFpckl0aW5lcmFyaWVzLCBmaWx0ZXI6IGZpbHRlckZsaWdodEludGVyZmFjZSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFmaWx0ZXIuc2FtZUFpcmxpbmUpIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgYWlybGluZUNoYW5nZSA9IHRydWVcclxuICAgICAgbGV0IGZpcnN0QWlybGluZSA9IGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0RFRPWzBdLmZsaWdodEFpcmxpbmUuYWlybGluZU5hbWVcclxuXHJcbiAgICAgIGxldCBmbGlnaHRBaXJsaW5lczogc3RyaW5nW11bXVxyXG4gICAgICBmbGlnaHRBaXJsaW5lcyA9IGZsaWdodC5hbGxKb3VybmV5LmZsaWdodHMubWFwKHYgPT4ge1xyXG4gICAgICAgIHJldHVybiB2LmZsaWdodERUTy5tYXAoZiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZi5mbGlnaHRBaXJsaW5lLmFpcmxpbmVOYW1lXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmxpZ2h0QWlybGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZsaWdodEFpcmxpbmVzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAoZmxpZ2h0QWlybGluZXNbaV1bal0gIT0gZmlyc3RBaXJsaW5lKSB7XHJcbiAgICAgICAgICAgIGFpcmxpbmVDaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGFpcmxpbmVDaGFuZ2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogYWZ0ZXIgZmluZGluZyB0aGUgbWluIGFuZCBtYXggdmFsdWVzIGZvciBhbGwgZmlsdGlyYXRpb24gY3JpdGlyaWFzIC4uIHVwZGF0ZSB0aGUgc2xpZGVycyB3aXRoIHRoZXNlICwsXHJcbiAgICogbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXNcclxuICAgKi9cclxuICBzZXRTbGlkZXJPcHRpb25zKCl7XHJcbiAgICB0aGlzLm9wdGlvbnNEdXJhdGhpb249e1xyXG4gICAgICBmbG9vcjogdGhpcy5kdXJhdGlvbk1pbixcclxuICAgICAgY2VpbDogdGhpcy5kdXJhdGlvbk1heCxcclxuICAgICAgbm9Td2l0Y2hpbmc6IHRydWUsXHJcbiAgICAgIHRyYW5zbGF0ZTogKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGxldCBoID0gdmFsdWUgLyA2MCB8IDA7XHJcbiAgICAgICAgbGV0IG0gPSB2YWx1ZSAlIDYwIHwgMDtcclxuICAgICAgICByZXR1cm4gaCArIFwiaFwiICsgXCI6XCIgKyBtICsgXCJtXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgdGhpcy5vcHRpb25zZGVwYXJ0aW5nID0ge1xyXG4gICAgZmxvb3I6IHRoaXMuZGVwYXJ0aW5nTWluLFxyXG4gICAgY2VpbDogdGhpcy5kZXBhcnRpbmdNYXgsXHJcbiAgICBub1N3aXRjaGluZzogZmFsc2UsXHJcbiAgICB0cmFuc2xhdGU6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgICAgbGV0IGggPSB2YWx1ZSAvIDYwIHwgMDtcclxuICAgICAgbGV0IG0gPSB2YWx1ZSAlIDYwIHwgMDtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiBgJHt0aGlzLmhvdXJzRm9ybWF0ZXIoaCl9OiR7dGhpcy5tRm9ybWF0ZXIobSl9ICR7dGhpcy5EYXlPck5pZ2h0KGgsbSl9YDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAgIHRoaXMub3B0aW9uc0Fycml2aW5nID0ge1xyXG4gICAgICBmbG9vcjogdGhpcy5hcnJpdmluZ01pbixcclxuICAgICAgY2VpbDogdGhpcy5hcnJpdmluZ01heCxcclxuICAgICAgbm9Td2l0Y2hpbmc6IHRydWUsXHJcbiAgICAgIHRyYW5zbGF0ZTogKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGxldCBoID0gdmFsdWUgLyA2MCB8IDA7XHJcbiAgICAgICAgbGV0IG0gPSB2YWx1ZSAlIDYwIHwgMDtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5ob3Vyc0Zvcm1hdGVyKGgpfToke3RoaXMubUZvcm1hdGVyKG0pfSAke3RoaXMuRGF5T3JOaWdodChoLG0pfWA7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gIHRoaXMub3B0aW9ucyA9IHtcclxuICAgIGZsb29yOiB0aGlzLnByaWNlTWluVmFsdWUsXHJcbiAgICBjZWlsOiBNYXRoLnJvdW5kKHRoaXMucHJpY2VNYXhWYWx1ZSArIDEpLFxyXG4gICAgbWluTGltaXQ6TWF0aC5yb3VuZCh0aGlzLnByaWNlTWluVmFsdWUpLFxyXG4gICAgbWF4TGltaXQ6TWF0aC5yb3VuZCh0aGlzLnByaWNlTWF4VmFsdWUrMSksXHJcbiAgICB0cmFuc2xhdGU6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29kZSArIE1hdGgucm91bmQodmFsdWUqdGhpcy5yYXRlKTtcclxuICAgIH1cclxuICB9O1xyXG4gIH1cclxuXHJcbnVwZGF0ZUN1cnJlbmN5Q29kZShjb2RlOiBzdHJpbmcpe1xyXG4gIHRoaXMuY29kZSA9IGNvZGU7XHJcbn1cclxuICBEYXlPck5pZ2h0KGg6bnVtYmVyLG06bnVtYmVyKTpzdHJpbmd7XHJcbiAgICBsZXQgaG91ck9mZGF5ID0gaCA+IDI0P2glMjQ6aDtcclxuICAgcmV0dXJuIGhvdXJPZmRheSsobS8xMDApID4gMTI/J1BNJzpcIkFNXCJcclxuICB9XHJcbiAgaG91cnNGb3JtYXRlcihoOm51bWJlcik6c3RyaW5ne1xyXG4gICAgbGV0IGhvdXJPZmRheSA9IGggPiAyND9oJTI0Omg7XHJcbiAgICBsZXQgZkhvdXJPZmRheSAgPSBob3VyT2ZkYXkgPjEyPyBob3VyT2ZkYXkgLTEyIDogaG91ck9mZGF5O1xyXG4gIFxyXG4gICAgcmV0dXJuIGZIb3VyT2ZkYXkgPj0gMTAgP2ZIb3VyT2ZkYXkudG9TdHJpbmcoKTpgMCR7ZkhvdXJPZmRheX1gO1xyXG4gIH1cclxuICBtRm9ybWF0ZXIobTpudW1iZXIpOnN0cmluZ3tcclxuICByZXR1cm4gbSA+PTEwP20udG9TdHJpbmcoKTpgMCR7bX1gO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqKlNvcnQgYWNjb3JkaW5nIHRvIHRoZSBsb3dlc3QgZmFyZSAoYW1vdW50KSBhbmQgdGhlbiBjcmVhdGUgYWlybGluZXMgYXJyYXlcclxuICAgKiphY2NvcmRpbmcgdG8gdGhlIHNvcnRpbmcgdG8gdXNlIHRoZW0gaW4gZmlsdGlyYXRpb25cclxuICAgKiovXHJcbiAgIGZpbHRlckFpcmxpbmVzKCkge1xyXG4gICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmUgPSBbXTtcclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lU2xpY2UgPSBbXTtcclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lU2xpY2VNb2JpbGUgPSBbXTtcclxuICAgIGlmICghdGhpcy5yZXNwb25zZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgc29ydGVkID0gdGhpcy5yZXNwb25zZS5haXJJdGluZXJhcmllcy5zbGljZSgpLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgcmV0dXJuIGEuaXRpblRvdGFsRmFyZS5hbW91bnQgLSBiLml0aW5Ub3RhbEZhcmUuYW1vdW50O1xyXG4gICAgfSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2UuYWlybGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGFpcmxpbmVOb3cgPSB0aGlzLnJlc3BvbnNlLmFpcmxpbmVzW2ldO1xyXG4gICAgICBsZXQgaW5kZXggPSBzb3J0ZWQuZmluZEluZGV4KFxyXG4gICAgICAgIChhaXIpID0+XHJcbiAgICAgICAgICBhaXIuYWxsSm91cm5leS5mbGlnaHRzWzBdLmZsaWdodEFpcmxpbmUuYWlybGluZU5hbWUgPT0gYWlybGluZU5vd1xyXG4gICAgICApO1xyXG4gICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICB2YXIgbWF4U3RvcHMgPSBzb3J0ZWRbaW5kZXhdLmFsbEpvdXJuZXkuZmxpZ2h0cy5zbGljZSgpLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBiLnN0b3BzTnVtIC0gYS5zdG9wc051bTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZS5wdXNoKHtcclxuICAgICAgICAgIGxvZ286IHNvcnRlZFtpbmRleF0uYWxsSm91cm5leS5mbGlnaHRzWzBdLmZsaWdodEFpcmxpbmUuYWlybGluZUxvZ28sXHJcbiAgICAgICAgICBzdG9wczogbWF4U3RvcHNbMF0uc3RvcHNOdW0sXHJcbiAgICAgICAgICBwcmljZTogc29ydGVkW2luZGV4XS5pdGluVG90YWxGYXJlLmFtb3VudCxcclxuICAgICAgICAgIGN1cnJlbmN5OiBzb3J0ZWRbaW5kZXhdLml0aW5Ub3RhbEZhcmUuY3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgbmFtZTogc29ydGVkW2luZGV4XS5hbGxKb3VybmV5LmZsaWdodHNbMF0uZmxpZ2h0QWlybGluZS5haXJsaW5lTmFtZSxcclxuICAgICAgICAgIHNlbGVjdGVkOmZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHRoaXMuY29kZSA9IHNvcnRlZFswXS5pdGluVG90YWxGYXJlLmN1cnJlbmN5Q29kZVxyXG4gICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTbGljZSA9IHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lLnNsaWNlKHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lU3RhcnQsdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmQpXHJcbiAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVNsaWNlTW9iaWxlID0gdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmUuc2xpY2UodGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTdGFydE1vYmlsZSx0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZUVuZE1vYmlsZSlcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbmF2aWdhdGUgbmV4dCBvbiBjdXN0b20gZmlsdGVyIGFpcmxpbmUgZGF0YVxyXG4gICAqIEByZXR1cm5zIFxyXG4gICAqL1xyXG4gIG5leHRjdXN0b21GaWx0ZXJlZEFpcmxpbmUoKXtcclxuICAgIGlmKHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lRW5kID09IHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lLmxlbmd0aCl7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTdGFydCArPTE7XHJcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lRW5kICs9MTtcclxuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTbGljZSA9IHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lLnNsaWNlKHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lU3RhcnQsdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmQpXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG5hdmlnYXRlIHByZXZpb3VzIG9uIGN1c3RvbSBmaWx0ZXIgYWlybGluZSBkYXRhXHJcbiAgICogQHJldHVybnMgXHJcbiAgICovXHJcbiAgcHJldmN1c3RvbUZpbHRlcmVkQWlybGluZSgpe1xyXG4gICAgaWYodGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTdGFydCA9PSAwKXtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVN0YXJ0IC09MTtcclxuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmQgLT0xO1xyXG4gICAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVNsaWNlID0gdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmUuc2xpY2UodGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTdGFydCx0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZUVuZClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG5hdmlnYXRlIG5leHQgb24gY3VzdG9tIG1vYmlsZSBmaWx0ZXIgYWlybGluZSBkYXRhXHJcbiAgICogQHJldHVybnMgXHJcbiAgICovXHJcbiAgbmV4dGN1c3RvbUZpbHRlcmVkQWlybGluZU1vYmlsZSgpe1xyXG4gICAgaWYodGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmRNb2JpbGUgPT0gdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmUubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVN0YXJ0TW9iaWxlICs9MTtcclxuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmRNb2JpbGUgKz0xO1xyXG4gICAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVNsaWNlTW9iaWxlID0gdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmUuc2xpY2UodGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTdGFydE1vYmlsZSx0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZUVuZE1vYmlsZSlcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbmF2aWdhdGUgcHJldmlvdXMgb24gY3VzdG9tIG1vYmlsZSBmaWx0ZXIgYWlybGluZSBkYXRhXHJcbiAgICogQHJldHVybnMgXHJcbiAgICovXHJcbiAgcHJldmN1c3RvbUZpbHRlcmVkQWlybGluZU1vYmlsZSgpe1xyXG4gICAgaWYodGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTdGFydE1vYmlsZSA9PSAwKXtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVN0YXJ0TW9iaWxlIC09MTtcclxuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVFbmRNb2JpbGUgLT0xO1xyXG4gICAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVNsaWNlTW9iaWxlID0gdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmUuc2xpY2UodGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmVTdGFydE1vYmlsZSx0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZUVuZE1vYmlsZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENob29zZSBGcm9tIFRoZSBTb3J0ZWQgTG93ZXN0IEZhcmUgQWlybGluZSBUbyBGaWx0ZXIgV2l0aCBBbmQgQ2hhbmdlIFRoZSBGb3JtXHJcbiAgICoqL1xyXG4gIGNob29zZUN1c3RvbUZpbHRlckFpcmxpbmUodmFsOiBjdXN0b21BaXJsaW5lRmlsdGVyLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICB2YXIgaW5kZXhGb3JGb3JtID0gdGhpcy5jdXN0b21GaWx0ZXJlZEFpcmxpbmUuZmluZEluZGV4KFxyXG4gICAgICBhPT4gYS5uYW1lID09IHZhbC5uYW1lXHJcbiAgICApO1xyXG4gICAgdmFyIGFpcmxpbmVJbmRleCA9IHRoaXMuY2hvc2VuQ3VzdG9tRmlsdGVyZWRBaXJsaW5lLmZpbmRJbmRleChcclxuICAgICAgKG5hbWU6IHN0cmluZykgPT4gbmFtZSA9PSB2YWwubmFtZVxyXG4gICAgKTtcclxuICAgIGlmIChhaXJsaW5lSW5kZXggPT0gLTEpIHtcclxuICAgICAgKHRoaXMuZmlsdGVyRm9ybS5nZXQoXCJhaXJsaW5lXCIpIS5nZXQoXCJhaXJsaW5lc1wiKSBhcyBGb3JtQXJyYXkpXHJcbiAgICAgICAgLmF0KGluZGV4Rm9yRm9ybSlcclxuICAgICAgICAuc2V0VmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5jaG9zZW5DdXN0b21GaWx0ZXJlZEFpcmxpbmUucHVzaCh2YWwubmFtZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICh0aGlzLmZpbHRlckZvcm0uZ2V0KFwiYWlybGluZVwiKSEuZ2V0KFwiYWlybGluZXNcIikgYXMgRm9ybUFycmF5KVxyXG4gICAgICAgIC5hdChpbmRleEZvckZvcm0pXHJcbiAgICAgICAgLnNldFZhbHVlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNob3NlbkN1c3RvbUZpbHRlcmVkQWlybGluZS5zcGxpY2UoYWlybGluZUluZGV4LDEpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgSWYgVGhlIEFpcmxpbmUgSXMgU2VsZWN0ZWQgT3IgTm90XHJcbiAgICoqL1xyXG4gIGNoZWNrQ3VzdG9tRmlsdGVyQWlybGluZShhaXJsaW5lTmFtZTogc3RyaW5nKSB7XHJcbiAgICB2YXIgYWlybGluZUluZGV4ID0gdGhpcy5jaG9zZW5DdXN0b21GaWx0ZXJlZEFpcmxpbmUuZmluZEluZGV4KFxyXG4gICAgICAobmFtZTogc3RyaW5nKSA9PiBuYW1lID09IGFpcmxpbmVOYW1lXHJcbiAgICApO1xyXG4gICAgaWYgKGFpcmxpbmVJbmRleCA9PSAtMSkge1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuLyoqIEEgbWV0aG9kIHRvIGdldCB0aGUgZmFyZSBydWxlcyBkYXRhICovXHJcbiAgc2hvd0ZhcmVSdWxlcyhzZWFyY2hJZDpzdHJpbmcsc3F1ZW5jTnVtYmVyOiBudW1iZXIsIHBLZXk6IHN0cmluZykge1xyXG5cclxuICAgIHRoaXMuZmFyZUxvYWRpbmc9dHJ1ZTtcclxuICAgIHRoaXMuYXBpLmZhcmVSdWxlcyhzZWFyY2hJZCwgc3F1ZW5jTnVtYmVyLCBwS2V5KS5zdWJzY3JpYmUoXHJcbiAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICB0aGlzLmZhcmVMb2FkaW5nPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmFyZVJ1bGVzID0gcmVzdWx0LmZhcmVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiB0aGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIHRvIGRlc3RvcnkgYW55IG9wZW5lZCBzdWJzY3JpcHRpb24gb24gdGhpcyBzZXJ2aWNlXHJcbiAgICovXHJcbiAgZGVzdHJveWVyKCkge1xyXG4gICAgLy8gdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxyXG4gICAgdGhpcy5yZXNwb25zZSA9dW5kZWZpbmVkXHJcbiAgICB0aGlzLkZpbHRlckRhdGEgPSBbXVxyXG4gICAgdGhpcy5ub3JtYWxFcnJvciA9ICcnXHJcbiAgICB0aGlzLkZsaWdodFR5cGUgPSAnUm91bmRUcmlwJ1xyXG4gICAgdGhpcy5ub3JtYWxFcnJvclN0YXR1cyA9IGZhbHNlXHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICB0aGlzLnJvdW5kVCA9IGZhbHNlO1xyXG4gICAgdGhpcy5haXJMUiA9IFtdXHJcblxyXG4gICAgdGhpcy5SZXN1bHRGb3VuZCA9IGZhbHNlXHJcbiAgICB0aGlzLnByaWNlTWluVmFsdWUgPSAwO1xyXG4gICAgdGhpcy5wcmljZU1heFZhbHVlID0gNTAwMDtcclxuICAgIHRoaXMuRmlsdGVyQ2hhbmdlcyQgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIGZsb29yOiAwLFxyXG4gICAgICBjZWlsOiA1MDAwLFxyXG4gICAgICB0cmFuc2xhdGU6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSkudG9TdHJpbmcoKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICB0aGlzLnJhdGUgPSAxO1xyXG4gICAgdGhpcy5jb2RlID0gXCJLV0RcIlxyXG4gICAgdGhpcy5haXJsaW5lc0EgPSBbXTtcclxuICAgIHRoaXMuYWlybGluZXNGb3JtID0gW107XHJcbiAgICB0aGlzLmJvb2tpbmdTaXRlcyA9IFsnS2hhbGVlakdhdGUnLCAnb3RoZXInXTtcclxuICAgIHRoaXMuYm9va2luZ1NpdGVzRm9ybSA9IFtdXHJcbiAgICB0aGlzLmRlcGFydGluZ01pbiA9IDA7XHJcbiAgICB0aGlzLmRlcGFydGluZ01heCA9IDcwMDBcclxuICAgIHRoaXMub3B0aW9uc2RlcGFydGluZyA9IHRoaXMub3B0aW9ucztcclxuXHJcbiAgICB0aGlzLmFycml2aW5nTWluID0gMDtcclxuICAgIHRoaXMuYXJyaXZpbmdNYXggPSA3MDAwXHJcbiAgICB0aGlzLm9wdGlvbnNBcnJpdmluZyA9IHRoaXMub3B0aW9ucztcclxuICAgIHRoaXMubWluVmFsdWUgPSAwXHJcbiAgICB0aGlzLm1heFZhbHVlID0gNTAwMFxyXG5cclxuICAgIHRoaXMuZHVyYXRpb25NaW4gPSAwO1xyXG4gICAgdGhpcy5kdXJhdGlvbk1heCA9IDcwMDA7XHJcbiAgICB0aGlzLm9wdGlvbnNEdXJhdGhpb24gPSB0aGlzLm9wdGlvbnNcclxuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBhaXJsaW5lOiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBhaXJsaW5lczogbmV3IEZvcm1BcnJheShbXSksXHJcbiAgICAgIH0pLFxyXG4gICAgICBib29raW5nU2l0ZTogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgYm9va2luZ1NpdGVzOiBuZXcgRm9ybUFycmF5KFtdKVxyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIHN0b3BzRm9ybTogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgbm9TdG9wczogbmV3IEZvcm1Db250cm9sKGZhbHNlKSxcclxuICAgICAgICBvbmVTdG9wOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpLFxyXG4gICAgICAgIHR3b0FuZG06IG5ldyBGb3JtQ29udHJvbChmYWxzZSksXHJcbiAgICAgIH0pLFxyXG4gICAgICBzYW1lQWlybGluZTogbmV3IEZvcm1Db250cm9sKGZhbHNlKSxcclxuXHJcbiAgICAgIHByaWNlU2xpZGVyOiBuZXcgRm9ybUNvbnRyb2woWzAsIDBdKSxcclxuICAgICAgZHVyYXRpb25TbGlkZXI6IG5ldyBGb3JtQ29udHJvbChbMCwgMF0pLFxyXG4gICAgICBkcGFydGluZ1NsaWRlcjogbmV3IEZvcm1Db250cm9sKFswLCAwXSksXHJcbiAgICAgIGFycml2aW5nU2xpZGVyOiBuZXcgRm9ybUNvbnRyb2woWzAsIDBdKSxcclxuXHJcbiAgICAgIHJldHVyblNsaWRlcjogbmV3IEZvcm1Db250cm9sKFszMCwgNzAwMF0pLFxyXG4gICAgICBleHBlcmllbmNlOiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBvdmVyTmlnaHQ6IG5ldyBGb3JtQ29udHJvbChmYWxzZSksXHJcbiAgICAgICAgbG9uZ1N0b3BzOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpXHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgZmxleGlibGVUaWNrZXRzOiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICByZWZ1bmQ6IG5ldyBGb3JtQ29udHJvbChmYWxzZSksXHJcbiAgICAgICAgbm9uUmVmdW5kOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpXHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZvcm1JTklUID1mYWxzZTtcclxuXHJcbiAgICB0aGlzLnByaWNlT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKClcclxuXHJcbiAgICB0aGlzLm1vcmVUID0gW107XHJcbiAgICB0aGlzLm9yZ25pemVkUmVzcG9uY2UgPSBbXTtcclxuICAgIHRoaXMuY2hlYXBlYXN0TG93ZXN0RmFyZSA9IDBcclxuICAgIHRoaXMuc2hvcnRlc3RMb3dlc3RGYXJlID0gMFxyXG4gICAgdGhpcy5iZXN0RXhwZXJpZW5jZUxvd2VzdEZhcmUgPSAwXHJcblxyXG5cclxuICAgIC8qKkN1c3RvbSBhaXJsaW5lcyBmaWx0ZXIgKi9cclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lID0gW107XHJcbiAgICB0aGlzLmNob3NlbkN1c3RvbUZpbHRlcmVkQWlybGluZSAgPSBbXTtcclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lU2xpY2UgPSBbXTtcclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lU3RhcnQgID0gMDtcclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lRW5kID0gNTtcclxuXHJcbiAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVNsaWNlTW9iaWxlID0gW107XHJcbiAgICB0aGlzLmN1c3RvbUZpbHRlcmVkQWlybGluZVN0YXJ0TW9iaWxlID0gMDtcclxuICAgIHRoaXMuY3VzdG9tRmlsdGVyZWRBaXJsaW5lRW5kTW9iaWxlICA9IDI7XHJcbiAgfVxyXG59XHJcbiJdfQ==