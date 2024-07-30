import * as i0 from '@angular/core';
import { Injectable, Component, Pipe, inject, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import * as i1$1 from '@angular/forms';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { retry, take, catchError, mergeMap, map, Subscription, Subject } from 'rxjs';
import * as i2 from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import * as i1 from '@angular/common';
import { DatePipe } from '@angular/common';
import * as i1$2 from '@angular/platform-browser';

class RpTravelUiService {
    constructor() { }
}
RpTravelUiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RpTravelUiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class RpTravelUiComponent {
    constructor() { }
    ngOnInit() {
    }
}
RpTravelUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RpTravelUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: RpTravelUiComponent, selector: "lib-rp-travel-ui", ngImport: i0, template: `
    <p>
      rp-travel-ui works! CHANGEED
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-rp-travel-ui', template: `
    <p>
      rp-travel-ui works! CHANGEED
    </p>
  ` }]
        }], ctorParameters: function () { return []; } });

class CodToCityPipe {
    transform(value, args) {
        if (!value || !args) {
            return value;
        }
        else {
            for (let index = 0; index < args.length; index++) {
                let element = args[index];
                let a = element.cityCode.toLowerCase();
                if (a == value.toLowerCase()) {
                    return element.cityName;
                }
            }
            return value;
        }
    }
}
CodToCityPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CodToCityPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
CodToCityPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: CodToCityPipe, name: "codToCity" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CodToCityPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'codToCity'
                }]
        }] });

class CouncodePipe {
    transform(value, args) {
        if (!value || !args) {
            return [];
        }
        else {
            if (args.length < 1) {
                return [];
            }
            let result = [];
            for (let index = 0; index < value.length; index++) {
                let element = value[index];
                let a = element.countryName.toLowerCase();
                if (a.indexOf(args.toLowerCase()) != -1) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
CouncodePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CouncodePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
CouncodePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: CouncodePipe, name: "councode" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: CouncodePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'councode'
                }]
        }] });

class DurationToHourMinPipe {
    transform(value) {
        const duration = value.split(':');
        const hours = +duration[0];
        const minutes = +duration[1];
        return hours + 'h ' + minutes + 'm';
    }
}
DurationToHourMinPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DurationToHourMinPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DurationToHourMinPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: DurationToHourMinPipe, name: "durationToHourMin" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DurationToHourMinPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'durationToHourMin'
                }]
        }] });

//this pipe take an argument as the input and return a filterd array wich include the search input
class FilterCityPipe {
    transform(value, args) {
        if (!value || !args) {
            return [];
        }
        else {
            if (args.length < 3) {
                return [];
            }
            let result = [];
            for (let index = 0; index < value.length; index++) {
                let element = value[index];
                let a = element.cityName.toLowerCase();
                let b = element.airportCode.toLowerCase();
                let c = element.airportName.toLowerCase();
                if (a.indexOf(args.toLowerCase()) != -1 || b.indexOf(args.toLowerCase()) != -1 || c.indexOf(args.toLowerCase()) != -1) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
FilterCityPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FilterCityPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FilterCityPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: FilterCityPipe, name: "filterCity" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FilterCityPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filterCity'
                }]
        }] });

class HighlighterPipe {
    transform(text, search) {
        const pattern = search
            .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            .split(' ')
            .filter((t) => t.length > 0)
            .join('|');
        const regex = new RegExp(pattern, 'gi');
        return search ? text.replace(regex, match => `<strong>${match}</strong>`) : text;
    }
}
HighlighterPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HighlighterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
HighlighterPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: HighlighterPipe, name: "highlighter" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HighlighterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'highlighter'
                }]
        }] });

class HotelecitesPipe {
    transform(value, args) {
        if (!value || !args) {
            return [];
        }
        else {
            if (args.length < 3) {
                return [];
            }
            let result = [];
            for (let index = 0; index < value.length; index++) {
                let element = value[index];
                let a = element.City.toLowerCase();
                let b = element.Country.toLowerCase();
                if (a.indexOf(args.toLowerCase()) != -1 || b.indexOf(args.toLowerCase()) != -1) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
HotelecitesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HotelecitesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
HotelecitesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: HotelecitesPipe, name: "hotelecites" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HotelecitesPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'hotelecites'
                }]
        }] });

class HourMinutePipe {
    transform(value) {
        const hours = value / 60 | 0;
        const minutes = value % 60 | 0;
        return hours + 'h ' + minutes + 'm';
    }
}
HourMinutePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HourMinutePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
HourMinutePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: HourMinutePipe, name: "hourminute" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HourMinutePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'hourminute'
                }]
        }] });

class LimitToPipe {
    transform(value, args) {
        if (!value || !args) {
            return value;
        }
        else {
            if (value.length > args) {
                return value.slice(0, args);
            }
            else {
                return value;
            }
        }
    }
}
LimitToPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LimitToPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
LimitToPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: LimitToPipe, name: "limitTo" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: LimitToPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'limitTo'
                }]
        }] });

class EnvironmentService {
    constructor() {
        this.offlineSeats = "http://178.63.214.221:7026"; //ticket boarding ofline seats
        this.searchflow = 'https://flightsearch.rhlaty.com';
        this.BookingFlow = 'https://flightflow.rhlaty.com';
        this.FareRules = 'https://flightprov.rhlaty.com';
        this.asm = 'https://backofficeapi.rhlaty.com';
        this.Apihotels = 'https://Hotelsapi.ticketboarding.com';
        this.users = 'https://usersapi.rhlaty.com';
        this.admin = 'https://adminapi.rhlaty.com/';
        this.getDPayment = 'https://adminapi.rhlaty.com/';
        this.bookHotels = 'https://Hotelsapi.ticketboarding.com';
        this.prepay = 'https://prepayapi.rhlaty.com';
        this.backOffice = 'https://backofficeapi.rhlaty.com';
        this.FlightTop = 'https://flightsearch.rhlaty.com';
        this.offers = {
            //Ticket boarding offers endpoints
            getAll: 'http://178.63.214.221:7893/api/GetAllOffersAPI?POS=',
            getAllActive: 'https://flightsearch.ticketboarding.com/api/GetOffers?POS=',
            getByID: 'https://flightsearch.ticketboarding.com/api/SelectOffer?OfferId=',
            BookOffer: "https://flightflow.ticketboarding.com/api/BookOffer",
            RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails'
        };
    }
    /**
     *
     * @param env [all environment endpoints]
     * configure the environment at your application startup
     * follow the interface named "enviromentModel" to provide all the system endpoints needed
     */
    envConfiguration(env) {
        this.Apihotels = env.Apihotels;
        this.BookingFlow = env.BookingFlow;
        this.FareRules = env.FareRules;
        this.FlightTop = env.FlightTop;
        this.admin = env.admin;
        this.asm = env.asm;
        this.backOffice = env.backOffice;
        this.bookHotels = env.bookHotels;
        this.getDPayment = env.getDPayment;
        this.prepay = env.prepay;
        this.offers.BookOffer = env.offers.BookOffer;
        this.offers.RetriveItineraryDetails = env.offers.RetriveItineraryDetails;
        this.offers.getAll = env.offers.getAll;
        this.offers.getByID = env.offers.getByID;
        this.offlineSeats = env.offlineSeats;
        this.searchflow = env.searchflow;
        this.users = env.users;
    }
}
EnvironmentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: EnvironmentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EnvironmentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: EnvironmentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: EnvironmentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class HomePageApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    /**
      *
      * @param lang
      * @returns all airports depends on the current languague
      */
    UtilityAirports(lang) {
        let API = `${this.env.backOffice}/api/GetSearchFlowMapping?LangCode=${lang}`;
        return this.http.get(API).pipe(retry(3), take(1), catchError(err => { console.log(err); throw err; }));
    }
    /**
     *
     * @param baseCurrency
     * @returns all currency with their changing rate depends on the base currency
     */
    currencyApi(baseCurrency) {
        let API = `${this.env.admin}/api/CurrencyApi?currency=${baseCurrency}`;
        return this.http.get(API).pipe(retry(3), take(1), catchError(err => { console.log(err); throw err; }));
    }
    /**
     *
     * @returns current point of sale by fetching current ip then get this ip location/(POS)
     */
    pointOfSale() {
        let api = "https://api.ipify.org/?format=json";
        return this.http.get(api).pipe(retry(2), take(1), mergeMap((result) => {
            console.log("show me first response", result);
            return this.http.get(`https://ipapi.co/${result.ip}/json/`);
        }), catchError(err => { console.log(err); throw err; }));
    }
    /**
     *
     * @param lang
     * @returns take language and return contries and countries codes
     */
    getCountries(lang) {
        let api = `${this.env.backOffice}/api/GetAllCountriesByLangName?LangCode=${lang}`;
        return this.http.get(api).pipe(retry(2), take(1), catchError(err => { console.log(err); throw err; }));
    }
    /**
     *
     * @param pos
     * @returns All offers of type OfferDTO[] depending on the current point of sale
     */
    GetAllOffers(pos) {
        let API = `${this.env.offers.getAllActive}${pos}`;
        return this.http.get(API).pipe(take(1), retry(3), catchError(err => { console.log(err, "ERROR IN GETTING ALL OFFERS"); throw err; }));
    }
    /**
  *
  * @param id
  * @returns a specific offer of type OfferDTO[] depending on the given ID
  */
    getOfferBYId(id) {
        let API = `${this.env.offers.getByID}${id}`;
        return this.http.get(API).pipe(retry(3), take(1), map((res) => { return res; }), catchError(err => { console.log(err, "ERROR IN GETTING OFFER BY ID"); throw err; }));
    }
    /**
     *
     * @param Source
     * @param LanguageCode
     * @param body
     * @param searchID
     * @returns It takes source, language and searchID parameters and post the body
     * of the request as the booked offer model(body:BookedOffer)
     */
    BookOffers(Source, LanguageCode, body, searchID) {
        let API = `${this.env.offers.BookOffer}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Source': Source, 'LanguageCode': LanguageCode, 'searchID': searchID
            })
        };
        let Body = {
            BookedOffer: body
        };
        return this.http.post(API, Body, httpOptions).pipe(take(1), map((result) => { console.log("show backend book offer response", result); return result; }));
    }
    /**
* @param id
* @returns itinerary depending on the given ID if the service type is offline.
*/
    retriveItinerary(id) {
        let API = `${this.env.offlineSeats}${this.env.offers.RetriveItineraryDetails}?ItineraryId=${id}`;
        return this.http.get(API).pipe(retry(3), take(1), catchError(err => { console.log(err); throw err; }));
    }
}
HomePageApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
HomePageApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class HomePageService {
    constructor() {
        this.api = inject(HomePageApiService);
        this.route = inject(ActivatedRoute);
        this.subscription = new Subscription();
        /**
         * here is all available currencies
         */
        this.allCurrency = [];
        /**
           * Here's the value of selected currency
           */
        this.selectedCurrency = {
            Currency_Code: "KWD",
            Currency_Name: "Kuwait Dinar",
            ID: 2027,
            Image_Url: "https://images.khaleejgate.com/Content/Currencies/KWD.JPG",
            Is_Base_Currency: true,
            rate: 1
        };
        /**
         * here is all available airports
         */
        this.allAirports = [];
        /**
        * here is all available countries
        */
        this.allCountries = [];
        /**
         * here is all available offers
         */
        this.allOffers = [];
        /**
         * loading state ..
         */
        this.loader = false;
        /**
         * getting offer images
         */
        this.offerImages = [];
        /**
         * Creating booking offer form
         */
        this.offerCheckOutForm = new FormGroup({
            FullName: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
            ]),
            Email: new FormControl("", [
                Validators.required,
                Validators.email,
                Validators.minLength(9),
            ]),
            PhoneNumber: new FormControl("", [
                Validators.required,
                Validators.maxLength(5),
            ]),
            Nationality: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
            ]),
        });
    }
    /**
     *
     * @param baseCurrency
     * this is for fetching all currencies and update my all currencies state (allCurrency:currencyModel[])
     * also updates loader state (loader:boolean)
     */
    getCurrency(baseCurrency) {
        this.loader = true;
        this.subscription.add(this.api.currencyApi(baseCurrency).subscribe((res) => {
            if (res) {
                this.allCurrency = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all currency error ->', err);
            this.loader = false;
        }));
    }
    /**
     * set the default selected currency model according to point of sale
     * @param currencyModel
     */
    setSelectedCurrency(currency) {
        this.selectedCurrency = currency;
    }
    /**
   *
   * @param currentLang
   * this is for fetching all airports (allAirports: airPorts[]) based on current language
   * also updates loader state (loader:boolean)
   */
    getAirports(currentLang) {
        this.loader = true;
        this.subscription.add(this.api.UtilityAirports(currentLang).subscribe((res) => {
            if (res) {
                this.allAirports = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all airports error ->', err);
            this.loader = false;
        }));
    }
    /**
  *
  * @param currentLang
  * this is for fetching all countries (allCountries :countries[]) based on current language
  * also updates loader state (loader:boolean)
  */
    getCountries(currentLang) {
        this.loader = true;
        this.subscription.add(this.api.getCountries(currentLang).subscribe((res) => {
            if (res) {
                this.allCountries = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all countires error ->', err);
            this.loader = false;
        }));
    }
    /**
                      
     * this is for fetching and updating Point of Sale (pointOfSale:pointOfSaleModel)
     *and also updates loader state
     */
    getPointOfSale() {
        this.loader = true;
        this.subscription.add(this.api.pointOfSale().subscribe((res) => {
            if (res) {
                this.pointOfSale = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all pointofsales error ->', err);
            this.loader = false;
        }));
    }
    /**
   *
   * @param pos
   * this is for fetching all offers (allOffers :OfferDTO[]) based on current POS
   * also updates loader state (loader:boolean)
   */
    getAllOffers(pos) {
        this.loader = true;
        this.subscription.add(this.api.GetAllOffers(pos).subscribe((res) => {
            if (res) {
                this.allOffers = res.offers;
                this.loader = false;
                console.log(res, 'show offers');
            }
        }, (err) => {
            console.log('get all offers error ->', err);
            this.loader = false;
        }));
    }
    /**
     *
     * @param id
     * @returns this is for fetching  and updating single offer (offerById:OfferDTO) depending on given id
     * and also updates the loader state.
     */
    getOfferById(id) {
        this.loader = true;
        this.subscription.add(this.api.getOfferBYId(id).subscribe((res) => {
            console.log('get ID', id);
            if (res) {
                this.selectedOffer = res;
                this.loader = false;
                console.log("Offer", res);
            }
        }, (err) => {
            console.log('get offer by ID err==>', err);
            this.loader = false;
        }));
    }
    /**
     *
     * @param id
     * @returns this function is responsible for mapping & extracting the offer service properties.
     *  Also,it's responsible for retrieving the offline itinerary from the api in case of offline seats
     *  depending on the offer code.
     */
    extractOfferData(id) {
        this.offerImages = this.selectedOffer.offerImage ? [this.selectedOffer.offerImage.url] : [];
        let startDate = new Date(this.selectedOffer.startDate);
        let endDate = new Date(this.selectedOffer.endDate);
        let differenceInTime = startDate.getTime() - endDate.getTime();
        this.numberOfNights = differenceInTime / (1000 * 3600 * 24);
        this.selectedOffer.offerServices.map(offerService => {
            if (offerService.serviceType == '1') {
                this.subscription.add(this.api.retriveItinerary(offerService.offlineItinerary).subscribe((res) => {
                    if (res) {
                        this.offlineItinerary = res;
                    }
                }, (err) => {
                    console.log('offline itinerary err==>', err);
                }));
            }
        });
    }
    /**
     *
     * @param source
     * @param langCode
     * @param phonecountrycode
     * @returns it send the request of book offer form with the http headers which are the passed
     *  parameters and with the body of the request in type of (BookedOffer)
     */
    bookOffer(source, langCode, phonecountrycode) {
        let offerId = this.route.snapshot.paramMap.get("id");
        if (this.offerCheckOutForm.valid) {
            let Body = {
                Email: this.offerCheckOutForm.value["Email"],
                FullName: this.offerCheckOutForm.value["FullName"],
                Nationality: this.offerCheckOutForm.value["Nationality"],
                PhoneNumber: this.offerCheckOutForm.value["PhoneNumber"],
                PhoneCountryCode: phonecountrycode,
                SelectedOfferCode: Number(offerId),
            };
            this.subscription.add(this.api.BookOffers(source, langCode, Body, offerId).subscribe((res) => {
                if (res) {
                    this.submittedForm = res;
                }
            }, (err) => {
                console.log('Book offer err==>', err);
            }));
        }
        else {
            return;
        }
    }
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer() {
        this.subscription.unsubscribe();
    }
}
HomePageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
HomePageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ExchangePipe {
    constructor() {
        this.home = inject(HomePageService);
        this.currentCurruncy = this.home.selectedCurrency;
    }
    transform(value, args) {
        this.currentCurruncy = this.home.selectedCurrency;
        if (!value || !args) {
            return value;
        }
        else {
            if (args == "value" && this.currentCurruncy.Currency_Code == 'KWD') {
                let total = value * this.currentCurruncy.rate;
                return parseFloat((Math.round(total * 1000) / 1000).toFixed(3));
            }
            if (args == "value" && this.currentCurruncy.Currency_Code != 'KWD') {
                let total = value * this.currentCurruncy.rate;
                return parseFloat((Math.round(total * 100) / 100).toFixed(2));
            }
            if (args == "code") {
                return this.currentCurruncy.Currency_Code;
            }
        }
    }
}
ExchangePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ExchangePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ExchangePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: ExchangePipe, name: "exchange", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ExchangePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'exchange',
                    pure: false
                }]
        }] });

class RpTravelUiModule {
}
RpTravelUiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RpTravelUiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, declarations: [RpTravelUiComponent,
        CodToCityPipe,
        CouncodePipe,
        DurationToHourMinPipe,
        FilterCityPipe,
        HighlighterPipe,
        HotelecitesPipe,
        HourMinutePipe,
        LimitToPipe,
        ExchangePipe], imports: [HttpClientModule,
        ReactiveFormsModule,
        FormsModule], exports: [RpTravelUiComponent,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CodToCityPipe,
        CouncodePipe,
        DurationToHourMinPipe,
        FilterCityPipe,
        HighlighterPipe,
        HotelecitesPipe,
        HourMinutePipe,
        LimitToPipe,
        ExchangePipe] });
RpTravelUiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, providers: [HttpClient, DatePipe], imports: [HttpClientModule,
        ReactiveFormsModule,
        FormsModule, HttpClientModule,
        ReactiveFormsModule,
        FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        RpTravelUiComponent,
                        CodToCityPipe,
                        CouncodePipe,
                        DurationToHourMinPipe,
                        FilterCityPipe,
                        HighlighterPipe,
                        HotelecitesPipe,
                        HourMinutePipe,
                        LimitToPipe,
                        ExchangePipe
                    ],
                    imports: [
                        HttpClientModule,
                        ReactiveFormsModule,
                        FormsModule,
                    ],
                    exports: [
                        RpTravelUiComponent,
                        HttpClientModule,
                        ReactiveFormsModule,
                        FormsModule,
                        CodToCityPipe,
                        CouncodePipe,
                        DurationToHourMinPipe,
                        FilterCityPipe,
                        HighlighterPipe,
                        HotelecitesPipe,
                        HourMinutePipe,
                        LimitToPipe,
                        ExchangePipe
                    ],
                    providers: [HttpClient, DatePipe]
                }]
        }] });

class FlightCheckoutApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    /**
     *
     * @param searchid
     * @param sequenceNum
     * @param providerKey
     * @returns all information about the selected flight according to its searchId , sequence number and provider key
     */
    getSelectedFlight(searchid, sequenceNum, providerKey) {
        let api = `${this.env.searchflow}/api/GetSelectedFlight?searchid=${searchid}&SequenceNum=${sequenceNum}&PKey=${providerKey}`;
        return this.http.get(api).pipe(retry(3), take(1), catchError(err => { throw err; }));
    }
    /**
     *
     * @param SID
     * @param POS
     * @returns a list of offline services provided for a flight reservation using the search ID and the POS
     */
    offlineServices(url) {
        return this.http.get(url).pipe(retry(2), take(1), catchError(err => { console.log(err); throw err; }));
    }
    /**
     *
     * @param promo
     * @param Sid
     * @param sequenceNum
     * @param pkey
     * @returns disscount amount if the copoun code is active and valid
     */
    activateCobon(promo, Sid, sequenceNum, pkey) {
        //check the validity of cobon and return
        let api = `${this.env.BookingFlow}/api/GetPromotionDetails?PromoCode=${promo}&SearchId=${Sid}&SeqNum=${sequenceNum}&PKey=${pkey}  `;
        return this.http.get(api).pipe(take(1));
    }
    /**
     *
     * @param searchid
     * @param sequenceNum
     * @param body
     * @param pkey
     * @param lang
     * @param selectedServices
     * @returns this function is resposible to call the save booking then checking flight validations and them generate your payment link
     */
    saveBooking(searchid, sequenceNum, body, pkey, lang, selectedServices, ip, ipLocation) {
        let api = `${this.env.BookingFlow}/api/SaveBooking?SearchId=${searchid}&SeqNum=${sequenceNum}&PKey=${pkey}`;
        return this.http.post(api, body).pipe(take(1), retry(1), mergeMap((result) => {
            let api = `${this.env.BookingFlow}/api/CheckFlightValidation?HGNum=${result.hgNumber}&Language=${lang}&SearchId=${searchid}&SeqNum=${sequenceNum}&PKey=${pkey}`;
            return this.http.get(api).pipe(retry(1), take(1), mergeMap(() => {
                let apis = `${this.env.BookingFlow}/api/GetPaymentView?IP=${ip}&IPLoc=${ipLocation}&HG=${result.hgNumber}&SId=${searchid}&NotifyToken=`;
                let bodys = {
                    UserSeletedInsurance: { ProductId: "" },
                    UserSeletedServices: { SeletedServicesCodes: selectedServices },
                };
                return this.http.post(apis, bodys).pipe(take(1), retry(1));
            }), catchError(err => { console.log(err); throw err; }));
        }), catchError(err => { console.log(err); throw err; }));
    }
}
FlightCheckoutApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightCheckoutApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class FlightCheckoutService {
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

class FlightResultApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    searchFlight(searchFlight) {
        let api = `${this.env.searchflow}/flights/flightsSearch/${searchFlight.lan}/${searchFlight.currency}/${searchFlight.pointOfReservation}/${searchFlight.flightType}/${searchFlight.flightsInfo}/${searchFlight.passengers}/${searchFlight.Cclass}/${searchFlight.showDirect}/all/0/0/Direct?searchID=${searchFlight.serachId}`;
        return this.http.get(api).pipe(retry(2), take(1), catchError(err => { console.log(err); throw err; }));
        ;
    }
    fareRules(sid, seq, pKey) {
        let api = `${this.env.FareRules}/api/GetFareRules?SId=${sid}&SeqNum=${seq}&PKey=${pKey}`;
        console.log(api);
        return this.http.get(api).pipe(take(1));
    }
}
FlightResultApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightResultApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

/**
 * Filter Model
 * [this is a generic model for the filter containing all filter criteria and you can use only what you need]
 */
class flightResultFilter {
    constructor(sameAirline, priceMin, priceMax, durationMin, durationMax, depatingMin, departingMax, arrivingMin, arrivingMax, returnMin, returnMax, stops, experience, flexibleTicket, airlines, bookingSites) {
        this.sameAirline = sameAirline;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.durationMin = durationMin;
        this.durationMax = durationMax;
        this.depatingMin = depatingMin;
        this.departingMax = departingMax;
        this.arrivingMin = arrivingMin;
        this.arrivingMax = arrivingMax;
        this.returnMin = returnMin;
        this.returnMax = returnMax;
        this.stops = stops;
        this.experience = experience;
        this.flexibleTicket = flexibleTicket;
        this.airlines = airlines;
        this.bookingSites = bookingSites;
    }
}
class SearchFlightModule {
    constructor(lan, currency, pointOfReservation, flightType, flightsInfo, passengers, Cclass, serachId, showDirect, preferredAirLine) {
        this.lan = lan;
        this.currency = currency;
        this.pointOfReservation = pointOfReservation;
        this.flightType = flightType;
        this.flightsInfo = flightsInfo;
        this.passengers = passengers;
        this.Cclass = Cclass;
        this.serachId = serachId;
        this.showDirect = showDirect;
        this.preferredAirLine = preferredAirLine;
    }
}

class FlightResultService {
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

class FlightSearchApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
}
FlightSearchApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightSearchApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class FlightSearchService {
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

class UserManagmentApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    /**
     *
     * @param body [Login form value]
     * @returns all the user data needed to be authinticated within the application
     */
    login(body) {
        let api = `${this.env.users}/api/Account/Login`;
        return this.http.post(api, body).pipe(retry(3), take(1), catchError(err => { throw err; }));
    }
    /**
     *
     * @param body [Signup form value]
     * @returns all the user data needed to be authinticated within the application
     * also saves a new user on the the database
     */
    signup(body) {
        let api = `${this.env.users}/api/Account/Register`;
        return this.http.post(api, body).pipe(retry(3), take(1), catchError(err => { throw err; }));
    }
}
UserManagmentApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserManagmentApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const REG_DATA = 'reg_data';
class UserManagmentService {
    //#endregion
    constructor(__fb, __router) {
        this.__fb = __fb;
        this.__router = __router;
        //#region Variablses
        this.subscription = new Subscription();
        this.api = inject(UserManagmentApiService);
        this.loginForm = new FormGroup({});
        this.registerForm = new FormGroup({});
        this.loading = false;
        this.userChange = new Subject;
    }
    /**
     * this function is responsible to initialize the Login Form
     */
    initLoginForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl(false, [Validators.required]),
        });
    }
    /**
     * this function is responsible to initialize the Register(sign up) Form
     */
    initRegisterForm() {
        this.registerForm = this.__fb.group({
            Isbase: new FormControl(1),
            Email: new FormControl('', [Validators.email, Validators.minLength(8), Validators.required]),
            Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            FirstName: new FormControl(''),
            LastName: new FormControl(''),
            ImageURL: new FormControl(''),
            PhoneNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
            ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
            User_Name: new FormControl(''),
            notification: new FormControl(true)
        }, {
            validators: this.ConfirmPasswordValidator('Password', 'ConfirmPassword'),
        });
    }
    /**
     * this function is responsible to check validation between password and confirm password
     */
    ConfirmPasswordValidator(controlName, matchingControlName) {
        return (formGroup) => {
            let control = formGroup.controls[controlName];
            let matchingControl = formGroup.controls[matchingControlName];
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ custom: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    }
    /**
     * this function is responsible to make intgeration between front and backend request (USER LOGIN)
     * @params router navigation name to navigate to another page (HOME PAGE) after login
     */
    loginSubmit(routerName) {
        this.loading = true;
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.loading = false;
        }
        else {
            this.subscription.add(this.api.login(this.loginForm.value).subscribe((val) => {
                console.log("show me login submit", val);
                this.loading = false;
                this.currentUser = val;
                this.userChange.next('logedin');
                // this.__router.navigate([`/${routerName}`])     //navigate to paramter name page after login
                // window.location.reload();
            }, (err) => { console.log("user login error", err); this.loading = false; }));
        }
    }
    /**
     * this function is responsible to make intgeration between front and backend request (USER REGISTER)
     * @params router navigation name to navigate to another page (LOGIN PAGE) after register
    */
    regitserSubmit(routerName) {
        this.loading = true;
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            this.loading = false;
        }
        else {
            this.api.signup(this.registerForm.value).subscribe((val) => {
                console.log("show me register submit", val);
                localStorage.setItem(REG_DATA, JSON.stringify(this.registerForm.value));
                this.loading = false;
                this.currentUser = val;
                this.userChange.next('signedup');
                // this.__router.navigate([`/${routerName}`]) //navigate to paramter name page after registerate the account
            }, (error) => {
                console.log("show me signup error", error);
                this.loading = false;
            });
        }
    }
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer() {
        this.subscription.unsubscribe();
    }
}
UserManagmentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentService, deps: [{ token: i1$1.FormBuilder }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
UserManagmentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: UserManagmentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.FormBuilder }, { type: i2.Router }]; } });

class ConfirmationApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    /**
     *
     * @param url
     * @returns  the payment result status
     */
    getPaymentResult(url) {
        let api = `${this.env.prepay}/api/paymentresult?${url}`;
        return this.http.get(api).pipe(take(1), map((result) => { return result; }));
    }
    /**
     *
     * @param tok
     * @param url
     * @returns status after successful payment
     */
    PostProcessing(tok, url) {
        let api = `${url}&tok=${tok}`;
        return this.http.get(api).pipe(take(1), map((result) => {
            return result;
        }));
    }
    /**
     *
     * @param HGNu
     * @param searchid
     * @param tok
     * @returns flight confirmation details after payment has been finshed
     */
    getConfirmation(HGNu, searchid, tok) {
        let api = `${this.env.BookingFlow}/api/BookingConfirmation?HG=${HGNu}&SId=${searchid}&tok=${tok}`;
        return this.http.get(api).pipe(retry(3), take(1), map((result) => {
            return result;
        }), catchError((err) => { console.log("CONFIRMATION ERROR", err); throw err; }));
    }
}
ConfirmationApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmationApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ConfirmationService {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.api = inject(ConfirmationApiService);
        this.loading = false;
    }
    /**
     * fetching confirmation data
     * update state of [confirmationData:FlightSearchResult] in case of success response
     * update loading state
     * @param searchId
     * @param hgNum
     * @param tok
     */
    getConfirmationDate(searchId, hgNum, tok) {
        this.loading = true;
        this.error = undefined;
        this.api.getConfirmation(hgNum, searchId, tok).subscribe((res) => {
            if (res) {
                this.confirmationData = res;
                this.formatWegoClicktUrl();
                this.loading = false;
            }
        }, (err) => {
            this.error = err;
            this.loading = false;
        });
    }
    /**
     *
     * @returns formatt wgo deeb url
     */
    formatWegoClicktUrl() {
        let comm_currency_code = 'USD';
        let bv_currency_code = 'KWD';
        let transaction_id = this.confirmationData.pnr;
        let total_booking_value = this.confirmationData.fareAmount;
        let commission = total_booking_value * .02;
        let status = 'confirmed';
        if (localStorage.getItem('click_id')) {
            var url = `https://secure.wego.com/analytics/v2/conversions?conversion_id=c-wego-khaleejgate.com&click_id=${localStorage.getItem('click_id')}&comm_currency_code=${comm_currency_code}&bv_currency_code=${bv_currency_code}&transaction_id=${transaction_id}&commission=${commission}&total_booking_value=${total_booking_value}&status=${status}`;
        }
        else {
            console.log("CLICK ID NOT FOUND");
            var url = `https://secure.wego.com/analytics/v2/conversions?conversion_id=c-wego-triphands.com&click_id=${'no_click_id'}&comm_currency_code=${comm_currency_code}&bv_currency_code=${bv_currency_code}&transaction_id=${transaction_id}&commission=${commission}&total_booking_value=${total_booking_value}&status=${status}`;
        }
        this.wgoDeebUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
ConfirmationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationService, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.DomSanitizer }]; } });

/*
 * Public API Surface of rp-travel-ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CodToCityPipe, ConfirmationApiService, ConfirmationService, CouncodePipe, DurationToHourMinPipe, EnvironmentService, ExchangePipe, FilterCityPipe, FlightCheckoutApiService, FlightCheckoutService, FlightResultApiService, FlightResultService, FlightSearchApiService, FlightSearchService, HighlighterPipe, HomePageApiService, HomePageService, HotelecitesPipe, HourMinutePipe, LimitToPipe, RpTravelUiComponent, RpTravelUiModule, RpTravelUiService, SearchFlightModule, UserManagmentApiService, UserManagmentService, flightResultFilter };
//# sourceMappingURL=rp-travel-ui.mjs.map
