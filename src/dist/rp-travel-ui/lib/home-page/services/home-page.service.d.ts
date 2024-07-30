import { HomePageApiService } from './home-page-api.service';
import { BookedOffer, Itinerary, OfferDTO, airPorts, countries, currencyModel, pointOfSaleModel } from '../interfaces';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class HomePageService {
    api: HomePageApiService;
    route: ActivatedRoute;
    subscription: Subscription;
    /**
     * here is all available currencies
     */
    allCurrency: currencyModel[];
    /**
       * Here's the value of selected currency
       */
    selectedCurrency: currencyModel;
    /**
     * here is all available airports
     */
    allAirports: airPorts[];
    /**
    * here is all available countries
    */
    allCountries: countries[];
    /**
     * here is all available offers
     */
    allOffers: OfferDTO[];
    /**
     * here is all available point of sale
     */
    pointOfSale: pointOfSaleModel;
    /**
     * loading state ..
     */
    loader: boolean;
    /**
     * Getting selected offer data
     */
    selectedOffer: OfferDTO;
    /**number of nights properties */
    numberOfNights: number;
    /**
     * getting offline itinerary
     */
    offlineItinerary: Itinerary;
    /**
     * getting offer images
     */
    offerImages: string[];
    /**book offer API request value*/
    submittedForm: BookedOffer;
    /**
     * Creating booking offer form
     */
    offerCheckOutForm: FormGroup<{
        FullName: FormControl<string | null>;
        Email: FormControl<string | null>;
        PhoneNumber: FormControl<string | null>;
        Nationality: FormControl<string | null>;
    }>;
    constructor();
    /**
     *
     * @param baseCurrency
     * this is for fetching all currencies and update my all currencies state (allCurrency:currencyModel[])
     * also updates loader state (loader:boolean)
     */
    getCurrency(baseCurrency: string): void;
    /**
     * set the default selected currency model according to point of sale
     * @param currencyModel
     */
    setSelectedCurrency(currency: currencyModel): void;
    /**
   *
   * @param currentLang
   * this is for fetching all airports (allAirports: airPorts[]) based on current language
   * also updates loader state (loader:boolean)
   */
    getAirports(currentLang: string): void;
    /**
  *
  * @param currentLang
  * this is for fetching all countries (allCountries :countries[]) based on current language
  * also updates loader state (loader:boolean)
  */
    getCountries(currentLang: string): void;
    /**
                      
     * this is for fetching and updating Point of Sale (pointOfSale:pointOfSaleModel)
     *and also updates loader state
     */
    getPointOfSale(): void;
    /**
   *
   * @param pos
   * this is for fetching all offers (allOffers :OfferDTO[]) based on current POS
   * also updates loader state (loader:boolean)
   */
    getAllOffers(pos: string): void;
    /**
     *
     * @param id
     * @returns this is for fetching  and updating single offer (offerById:OfferDTO) depending on given id
     * and also updates the loader state.
     */
    getOfferById(id: number | string): void;
    /**
     *
     * @param id
     * @returns this function is responsible for mapping & extracting the offer service properties.
     *  Also,it's responsible for retrieving the offline itinerary from the api in case of offline seats
     *  depending on the offer code.
     */
    extractOfferData(id: number | string): void;
    /**
     *
     * @param source
     * @param langCode
     * @param phonecountrycode
     * @returns it send the request of book offer form with the http headers which are the passed
     *  parameters and with the body of the request in type of (BookedOffer)
     */
    bookOffer(source: string, langCode: string, phonecountrycode: string): void;
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HomePageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HomePageService>;
}
