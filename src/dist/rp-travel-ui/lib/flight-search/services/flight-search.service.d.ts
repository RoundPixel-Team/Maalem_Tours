import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { searchBoxFlights, searchBoxModel, searchBoxPassengers, searchFlightModel } from '../interfaces';
import { AlertMsgModel } from '../../shared/interfaces';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
export declare class FlightSearchService {
    private datePipe;
    subscription: Subscription;
    searchFlight: FormGroup;
    localForm?: searchBoxModel | undefined;
    flightType?: string;
    passengers?: searchBoxPassengers;
    lastFlight?: searchBoxFlights;
    resultLink?: searchFlightModel;
    passengerAlert: AlertMsgModel;
    flightAlert: AlertMsgModel;
    removeFlightAlert: AlertMsgModel;
    dateAlert: AlertMsgModel;
    retDateAlert: AlertMsgModel;
    validMultiDateAlert: AlertMsgModel;
    constructor(datePipe: DatePipe);
    /**
     * this function is responsible to fill the searchbox form from local storage if it has a previous data
     */
    initSearchForm(form: searchBoxModel): void;
    /**
     * this function is responsible to fill the oneway searchbox data from data storage
     */
    oneWayData(localForm: searchBoxModel): void;
    /**
     * this function is responsible to fill the roundTrip searchbox data from data storage
     */
    roundTripData(localForm: any): void;
    /**
     * this function is responsible to fill the Multi City searchbox data from data storage
     */
    multiData(localForm: any): void;
    /**
     * this function is responsible to update the flight Type
     * @param flightType (oneWay or roundTrip or multiCity)
     */
    changeFlightType(flightType: string): void;
    /**
     * this function is responsible to get flights form array
     */
    get flightsArray(): FormArray;
    /**
     * this function is responsible to add flight at multi city
     * @return object of string error message (flightAlert)
     */
    addFlight(): AlertMsgModel;
    /**
     * this function is responsible to remove flight from multi city
     * @return object of string error message (removeFlightAlert)
     */
    removeFlight(): AlertMsgModel;
    /**
     * this function is responsible to get Total Number of passengers
     * @return object of string error message (passengerAlert)
     * if message is empty then the validation is true
     */
    getTotalPassengers(adult: number, child: number, infant: number): number;
    /**
     * this function is responsible to change Value Of Adult passenger
     * @return object of string error message (passengerAlert)
     */
    changeAdultPassenger(num: number): AlertMsgModel;
    /**
     * this function is responsible to change Value Of child passenger
     * @return object of string error message (passengerAlert)
     * if message is empty then the validation is true
     */
    changeChildPassenger(num: number): AlertMsgModel;
    /**
     * this function is responsible to change Value Of infant passenger
     * @return object of string error message (passengerAlert)
     * if message is empty then the validation is true
     */
    changeinfantPassenger(num: number): AlertMsgModel;
    /**
     * this function is responsible to change Value Of Class Type
     * @params class value selected from list view
     */
    setClassValue(classVal: string): void;
    /**
     * this function is responsible to exchange between destinations
     * @params item which i want to exchange (from Type searchBoxFlights)
     */
    switchDestination(item: any): void;
    /**
     * this function is responsible to return current Date
     */
    todayDate(): string;
    /**
   * this function is responsible to validate the Multi City searchbox Dates
   * @retuer string with alert message if it has error else return true
   */
    validateMultiCityDates(): AlertMsgModel;
    /**
     * this function is responsible to set the value of depart Date after validate it
     * @params depart date should be format as 2023-08-01
     * @params flightIndex number for
     * @retuen object with empty message if validation is true or object with error messages
     */
    setDepDate(depDate: string, flightIndex: number): AlertMsgModel;
    /**
     * this function is responsible to set the value of Return Date after validate it
     * @params Return date should be format as 2023-08-01
     * @retuen object with empty message if validation is true or object with error messages
     */
    setRetDate(retDate: string): AlertMsgModel;
    /**
     * this function is responsible to set the second flight of flights array if the flight type is roundtrip
     */
    setRetFlight(): void;
    /**
     * this function is responsible to generate Search Id
     */
    id(): string;
    /**
     * this function is responsible to split the airport code from Depart Or Land input
     * @params spiltIndex with index hav the airport code (0 or 1)
     * @params splitPattern pattern used to split the airport string and get separate code alone
     * @params airport whicj selected from depart or land airports Input
     * @retuen airport code
     */
    getAirportCode(spiltIndex: number, splitPattern: string, airport: string): string;
    /**
     * match Flights form array values with FlightInfoModule
     */
    getFlightInfo(spiltIndex: number, splitPattern: string): searchBoxFlights[];
    /**
     * this function is responsible to return string of flights in KWI-CAI-March%2015%202019_ format
     */
    flightInfoFormatter(array: searchBoxFlights[]): string;
    /**
     * this function is responsible to convert array of passanger type number to A-1-C-0-I-0
     * @params passenger object with total numbers of adults,child and infants
     * @example 'en/KWD/EG/RoundTrip/KWI-CAI-August%2019,%202023_CAI-KWI-August%2031,%202023/2023B7I0S617H00B50I90S10H20I30/A-1-C-0-I-0/Economy/false'
     */
    passengerFormatter(passengerObj: searchBoxPassengers): string;
    /**
     * this function is responsible to return link to use it to navigate to search results with all data of search box
     */
    getSearchresultLink(lang: string, currency: string, pointOfSale: string, spiltIndex: number, splitPattern: string): string;
    onSubmit(lang: string, currency: string, pointOfSale: string, spiltIndex: number, splitPattern: string): string | {
        adult: AlertMsgModel;
        child: AlertMsgModel;
        infant: AlertMsgModel;
        retDate: AlertMsgModel;
        depDate: AlertMsgModel;
    };
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlightSearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlightSearchService>;
}
