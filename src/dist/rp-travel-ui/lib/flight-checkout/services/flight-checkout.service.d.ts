import { Subject, Subscription } from 'rxjs';
import { FlightCheckoutApiService } from './flight-checkout-api.service';
import { BreakDownView, Cobon, flightOfflineService, passengersModel, selectedFlight } from '../interfaces';
import { FormArray, FormGroup } from '@angular/forms';
import { passengerFareBreakDownDTOs, fare } from '../../flight-result/interfaces';
import { HomePageService } from '../../home-page/services/home-page.service';
import * as i0 from "@angular/core";
declare type fareCalc = (fare: fare[]) => number;
declare type calcEqfare = (flightFaresDTO: passengerFareBreakDownDTOs[], type: string, farecalc: fareCalc) => number;
export declare class FlightCheckoutService {
    api: FlightCheckoutApiService;
    home: HomePageService;
    subscription: Subscription;
    serviceFees: number;
    yesOrNoVaild: boolean;
    packageVaild: boolean;
    addbuttonVaild: boolean;
    /**
     * here is the loaded selected data
     */
    selectedFlight: selectedFlight | undefined;
    /**
     * here is all the loaded offline services
     */
    allOfflineServices: flightOfflineService[];
    /**
     * here is the chosen/selected offline service
     */
    selectedOfflineServices: string[];
    /**
     * here is all loaded offline services orgnized and grouped by type
     */
    organizedOfllineServices: flightOfflineService[];
    /**
     * here is the recommened service which is added to the cost/ticket by default
     */
    recommendedOfflineService: flightOfflineService | undefined;
    /**
     * type of booking in checkout
     */
    bookingType: string;
    /**
     * here is the price with the recommened offline service added
     */
    priceWithRecommenedService: number;
    /**
     * offline services loading state ..
     */
    offlineServicesLoader: boolean;
    /**
     * loading state ..
     */
    loader: boolean;
    /**
     * applying copoun code loading state ..
     */
    copounCodeLoader: boolean;
    /**
     * this contains all the applied copon code details
     */
    copounCodeDetails: Cobon | undefined;
    /**
     * this is containing the error while applying copoun code
     */
    copounCodeError: string;
    /**
     * this is the main form for the checkout which contains all users array forms
     */
    usersForm: FormGroup<{
        users: FormArray<never>;
    }>;
    /**
     * this is a getter to return the users array forms (users) from the main form (usersForm)
     */
    get usersArray(): FormArray;
    /**
     * passengers fare disscount varriables
     */
    fareDisscount: [number, string, string];
    /**
     * passengers fare breakup values
     */
    fareBreackup: BreakDownView | undefined;
    paymentLink: Subject<unknown>;
    paymentLinkFailure: Subject<unknown>;
    /**
     * variable to hold the value of the selected flight language
     */
    selectedFlightLang: Subject<unknown>;
    /**
     * variable to hold the value of the offline services response
     */
    offlineServicesResponse: Subject<flightOfflineService[]>;
    /**errors varriables */
    selectedFlightError: boolean;
    /**
     * this is a getter to return the users array forms (users) from the main form (usersForm)
     */
    usersArrayFunc(): FormArray;
    constructor();
    /**
     *
     * @param searchId
     * @param sequenceNum
     * @param providerKey
     * this is for fetching the selected flight data and update selected flight state (selectedFlight:selectedFlight)
     * also update loader state
     */
    getSelectedFlightData(searchId: string, sequenceNum: number, providerKey: number): void;
    /**
     *
     * @param searchId
     * @param pos
     * this is for fetching the flight offline services data and update offline service state (offlineServices:flightOfflineServices[])
     * also update offlineServicesLoader state
     */
    getAllOfflineServices(url: string, multiTypes: boolean): void;
    /**
     *
     * @param data [all offline services data]
     * @returns offline services organized and grouped with the new logic
     */
    organizeOfflineServices(data: flightOfflineService[]): flightOfflineService[];
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
    buildUsersForm(adults: number, childs: number, infants: number, passportFlag: boolean): void;
    /**
     *
     * @param service
     * this for adding a new offline service with the selected flight
     * also adding offline service cost to the whole price
     */
    addOfflineService(service: flightOfflineService): void;
    /**
     *
     * @param service
     * this is to remove an already selected offline service with the selected flight
     * also removing offline service from the whole price
     */
    removeOfflineService(service: flightOfflineService): void;
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
    applyCopounCode(copounCode: string, searchId: string, sequenceNum: number, providerKey: string): void;
    /**
     * this is responsible for assigning last passengers form value before last payment
     * it depends on local storage key called (lastPassengers) which contains data for array of passengers
     */
    fetchLastPassengerData(): void;
    /**
     *
     * @returns error type either main form error (email & phone number) or passenger error (error happens while entering passengers data)
     * IT RETURNS (Valid) in the type of string this means that every thing is OK and ready to payment
     */
    validatePassengersForm(): string;
    /**
     *
     * @param currentCurrency
     * here is the save booking function which returning the payment link if all params is good
     * it updates the behaviour subject (paymentLink) with the link
     * it also updates the behaviour subject (paymentLinkFailure) with the error
     */
    saveBooking(currentCurrency: string, type: string): void;
    /**
     *
     * @param currentCurrency
     * @returns the passenger details (body param) needed by backend to make the save booking action
     */
    generateSaveBookingBodyParam(currentCurrency: string): passengersModel;
    /**
     * this function is responsiple for getting disscount from passengers fare breakup
     * it also updates the disscount state fareDisscount : [number,string,string]
     */
    calculateFareBreakupDisscount(): void;
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
    returnPassTotalFarDifferance(flightFaresDTO: passengerFareBreakDownDTOs[], totalAmount: number, totalTax: number, curruncy: string, calcEqfare: calcEqfare, fareCalc: fareCalc): [number, string, string];
    /**
    *
    * @param flightFaresDTO
    * @param type
    * @param farecalc
    * @returns numer of passenger * fare of passenger
    */
    calcEqfare(flightFaresDTO: passengerFareBreakDownDTOs[], type: string, farecalc: fareCalc): number;
    /**
    *
    * @param fare
    * @returns validate equivelent fare
    */
    returnCorrectFare(fare: fare[]): number;
    /**
     *
     */
    calculatePassengersFareBreakupValue(): void;
    /**
     *
     * @param flightFaresDTO
     * @param passNumber
     * @returns [total value ,curruncy code]
     */
    returnPassTotalFar(flightFaresDTO: fare[], passNumber: number, calcfare: fareCalc): [number, string];
    /**
     *
     * @param flightFaresDTO
     * @param passNumber
     * @returns [total value per passenger ,curruncy code , number of passenger]
     */
    returnPassFareScatterd(flightFaresDTO: fare[], passNumber: number, calcfare: fareCalc): [number, string, number];
    updatePackageServiceInteractionValidation(val: boolean): void;
    updateYesOrNoServiceInteractionValidation(val: boolean): void;
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlightCheckoutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlightCheckoutService>;
}
export {};
