import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../shared/services/environment.service';
import { Cobon, flightOfflineService, passengersModel, selectedFlight } from '../interfaces';
import * as i0 from "@angular/core";
export declare class FlightCheckoutApiService {
    http: HttpClient;
    env: EnvironmentService;
    constructor();
    /**
     *
     * @param searchid
     * @param sequenceNum
     * @param providerKey
     * @returns all information about the selected flight according to its searchId , sequence number and provider key
     */
    getSelectedFlight(searchid: string, sequenceNum: number, providerKey: number): import("rxjs").Observable<selectedFlight>;
    /**
     *
     * @param SID
     * @param POS
     * @returns a list of offline services provided for a flight reservation using the search ID and the POS
     */
    offlineServices(url: string): import("rxjs").Observable<flightOfflineService[]>;
    /**
     *
     * @param promo
     * @param Sid
     * @param sequenceNum
     * @param pkey
     * @returns disscount amount if the copoun code is active and valid
     */
    activateCobon(promo: string, Sid: string, sequenceNum: any, pkey: string): import("rxjs").Observable<Cobon>;
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
    saveBooking(searchid: string, sequenceNum: number, body: passengersModel, pkey: string, lang: string, selectedServices: string[], ip: string, ipLocation: string): import("rxjs").Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlightCheckoutApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlightCheckoutApiService>;
}
