import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FareRules, FlightSearchResult, airItineraries, filterFlightInterface, flight, flightResultFilter } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightResultApiService } from './flight-result-api.service';
import { Options } from '@angular-slider/ngx-slider';
import { customAirlineFilter } from '../interfaces';
import * as i0 from "@angular/core";
export declare class FlightResultService {
    api: FlightResultApiService;
    router: Router;
    route: ActivatedRoute;
    filter?: flightResultFilter;
    searchID: string;
    /**
   * response Data from Api  b type FlightSearchResult
   */
    response?: FlightSearchResult;
    /**
     * response airItineraries Data from Api  b type airItineraries
     */
    FilterData: airItineraries[];
    /**
       * load error message when no data back from api
       */
    normalError: string;
    /**
     * flight Type
     */
    FlightType: string;
    normalErrorStatus: boolean;
    /**
    * loading state ..
    */
    loading: boolean;
    roundT: boolean;
    airLR: any;
    /**fare rules loading state */
    fareLoading: boolean;
    ResultFound: boolean;
    /**
    *  Min value price
    *
    */
    priceMinValue: number;
    /**
    *  Max value price
    *
    */
    priceMaxValue: number;
    FilterChanges$: Subscription;
    /**
   *  optins init and return data as string
   *
   */
    options: Options;
    /**
   * inital rate currecy code kwd
   *
   */
    rate: number;
    code: string;
    /**
   *  array of  type string return feh kol airline back from airItineraries
   *
   */
    airlinesA: string[];
    airlinesForm: any;
    bookingSites: string[];
    /**
   *  array of  type boolean
   *
   */
    bookingSitesForm: boolean[];
    /**
   *  inital slider for filter return feh date min and max
   *
   */
    departingMin: number;
    departingMax: number;
    optionsdeparting: Options;
    arrivingMin: number;
    arrivingMax: number;
    optionsArriving: Options;
    minValue: number;
    maxValue: number;
    durationMin: number;
    durationMax: number;
    optionsDurathion: Options;
    /**Property for fare Rules */
    fareRules: FareRules[];
    /**
    *  inital from filter
    *
    */
    filterForm: FormGroup<{
        airline: FormGroup<{
            airlines: FormArray<never>;
        }>;
        bookingSite: FormGroup<{
            bookingSites: FormArray<never>;
        }>;
        stopsForm: FormGroup<{
            noStops: FormControl<boolean | null>;
            oneStop: FormControl<boolean | null>;
            twoAndm: FormControl<boolean | null>;
        }>;
        sameAirline: FormControl<boolean | null>;
        priceSlider: FormControl<number[] | null>;
        durationSlider: FormControl<number[] | null>;
        dpartingSlider: FormControl<number[] | null>;
        arrivingSlider: FormControl<number[] | null>;
        returnSlider: FormControl<number[] | null>;
        experience: FormGroup<{
            overNight: FormControl<boolean | null>;
            longStops: FormControl<boolean | null>;
        }>;
        flexibleTickets: FormGroup<{
            refund: FormControl<boolean | null>;
            nonRefund: FormControl<boolean | null>;
        }>;
    }>;
    formINIT: boolean;
    priceOptions: Options;
    subscription: Subscription;
    moreT: boolean[];
    /**
  *  array return data type airItineraries[] after organize
  *
  */
    orgnizedResponce: airItineraries[][];
    /**
     * lowest fares for sorting containers
     */
    cheapeastLowestFare: number;
    shortestLowestFare: number;
    bestExperienceLowestFare: number;
    /**Custom airlines filter */
    customFilteredAirline: customAirlineFilter[];
    chosenCustomFilteredAirline: string[];
    customFilteredAirlineSlice: customAirlineFilter[];
    customFilteredAirlineStart: number;
    customFilteredAirlineEnd: number;
    customFilteredAirlineSliceMobile: customAirlineFilter[];
    customFilteredAirlineStartMobile: number;
    customFilteredAirlineEndMobile: number;
    constructor();
    /**
   * get all data from the router to call api to get flightResultData
   * from Api  searchFlight
   **/
    getDataFromUrl(lang: string, currency: string, pointOfReservation: string, flightType: string, flightsInfo: string, serachId: string, passengers: string, Cclass: string, showDirect: boolean, endCustomAirlineFilter: number, endCustomAirlineFilterMobile: number): void;
    /**
   * update filter input
   *
   **/
    updateFilter(): void;
    oneForAll(filter: filterFlightInterface, fligtsArray: airItineraries[], round: boolean): void;
    /**
     * grouping data return two array array airItineraries and array have same price
     **/
    orgnize(array: airItineraries[]): airItineraries[][];
    /**
     * create an array with the same length of the output
     **/
    valuesoftrueM(array: airItineraries[]): any[];
    /**
      *
      * @param type
      
      * sort result base on type:number return data: airItineraries[] sorting by condition or type
      *
      */
    sortMyResult(type: number): void;
    /**
     * get the lowest fares for all sorting criterias
     * @param data (all the itineraries)
     */
    fetchLowestFaresForSorting(data: airItineraries[]): void;
    /**
     * get min , max value slider from back data
     **/
    /**
    * Filter Values airItineraries[] by Price And Update Filtiration Slider
    **/
    minAnMax(data: airItineraries[]): number[];
    /**
      * Find Min And Max Values and  Filter Values airItineraries[]  Of Flight Duration  And Update Filtiration Slider
      **/
    findDurationMinMax(array: any[]): any[];
    /**
     *  Find Min And Max Values Of Flight Departing Dates  And Update Filtiration Slider
     **/
    findDepartingnMinMax(array: airItineraries[]): number[];
    /**
  *  Find Min And Max Values Of Flight arriving Dates  And Update Filtiration Slider
  **/
    findArrivingMinMax(array: airItineraries[]): number[];
    /**
     * Functions filter to filter data
     **/
    /**
   *  take date string return number
   **/
    convertToMin(time: string): number;
    /**
   *  filter by price value
   **/
    filterFlighWithPrice(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
  *  filter by DepartingTime
  **/
    filterFlighWithDepartionTime(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
  *  filter by ArrivalTime
  **/
    filterFlighWithArrivalTime(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
   *  filter by Duration flight
   **/
    filterFlighWithDuration(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
  *  filter by stops value
  **/
    stopsvalues(): number[];
    /**
  *  filter by stops value
  **/
    filterFlightWithNumberofStopsFunction(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
    *  filter by airline
    **/
    filteringbyairline(val: any[]): any[];
    filterFlightWithAirlineFunction(flight: airItineraries, filter: filterFlightInterface, roundT: boolean): boolean;
    /**
   *  filter by ReturnTime
   **/
    filterFlighWithReturnTime(flight: airItineraries, filter: filterFlightInterface, roundT: boolean): boolean;
    /**
   *  filter by booking sites
   **/
    filteringbyBookingSites(val: string[]): any[];
    /**
    * check value stop
    **/
    stopscheck(stops: number[], flight: flight[]): Boolean;
    /**
    * check FlextTicket
    **/
    FlexTicketcheck(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
    * filter data based on  experience value
    **/
    filterWithExperience(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
    * filter data based on  SameAirline
    **/
    completeTripOnSameAirline(flight: airItineraries, filter: filterFlightInterface): boolean;
    /**
     * after finding the min and max values for all filtiration critirias .. update the sliders with these ,,
     * minimum and maximum values
     */
    setSliderOptions(): void;
    updateCurrencyCode(code: string): void;
    DayOrNight(h: number, m: number): string;
    hoursFormater(h: number): string;
    mFormater(m: number): string;
    /**
     **Sort according to the lowest fare (amount) and then create airlines array
     **according to the sorting to use them in filtiration
     **/
    filterAirlines(): void;
    /**
     * navigate next on custom filter airline data
     * @returns
     */
    nextcustomFilteredAirline(): void;
    /**
     * navigate previous on custom filter airline data
     * @returns
     */
    prevcustomFilteredAirline(): void;
    /**
     * navigate next on custom mobile filter airline data
     * @returns
     */
    nextcustomFilteredAirlineMobile(): void;
    /**
     * navigate previous on custom mobile filter airline data
     * @returns
     */
    prevcustomFilteredAirlineMobile(): void;
    /**
     * Choose From The Sorted Lowest Fare Airline To Filter With And Change The Form
     **/
    chooseCustomFilterAirline(val: customAirlineFilter, index: number): void;
    /**
     * Check If The Airline Is Selected Or Not
     **/
    checkCustomFilterAirline(airlineName: string): boolean;
    /** A method to get the fare rules data */
    showFareRules(searchId: string, squencNumber: number, pKey: string): void;
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlightResultService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlightResultService>;
}
