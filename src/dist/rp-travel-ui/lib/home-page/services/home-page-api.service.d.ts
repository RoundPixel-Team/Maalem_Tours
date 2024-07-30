import { Observable } from 'rxjs';
import { BookedOffer, Itinerary, OfferDTO, airPorts, countries, currencyModel, pointOfSaleModel } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../shared/services/environment.service';
import * as i0 from "@angular/core";
export declare class HomePageApiService {
    http: HttpClient;
    env: EnvironmentService;
    constructor();
    /**
      *
      * @param lang
      * @returns all airports depends on the current languague
      */
    UtilityAirports(lang: string): Observable<airPorts[]>;
    /**
     *
     * @param baseCurrency
     * @returns all currency with their changing rate depends on the base currency
     */
    currencyApi(baseCurrency: string): Observable<currencyModel[]>;
    /**
     *
     * @returns current point of sale by fetching current ip then get this ip location/(POS)
     */
    pointOfSale(): Observable<pointOfSaleModel>;
    /**
     *
     * @param lang
     * @returns take language and return contries and countries codes
     */
    getCountries(lang: string): Observable<countries[]>;
    /**
     *
     * @param pos
     * @returns All offers of type OfferDTO[] depending on the current point of sale
     */
    GetAllOffers(pos: string): Observable<{
        offers: OfferDTO[];
    }>;
    /**
  *
  * @param id
  * @returns a specific offer of type OfferDTO[] depending on the given ID
  */
    getOfferBYId(id: number | string): Observable<OfferDTO>;
    /**
     *
     * @param Source
     * @param LanguageCode
     * @param body
     * @param searchID
     * @returns It takes source, language and searchID parameters and post the body
     * of the request as the booked offer model(body:BookedOffer)
     */
    BookOffers(Source: string, LanguageCode: string, body: BookedOffer, searchID: string): Observable<any>;
    /**
* @param id
* @returns itinerary depending on the given ID if the service type is offline.
*/
    retriveItinerary(id: number | string): Observable<Itinerary>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HomePageApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HomePageApiService>;
}
