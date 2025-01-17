export interface baseSearchResult {
    status: string;
    searchResultException: {
        code: string;
        exceptionMessage: string;
    };
}
/**
 * this is the the model of the backend on case of status 200
 */
export interface FlightSearchResult extends baseSearchResult {
    pnr?: any;
    fareAmount?: any;
    airlines: any[];
    airItineraries: airItineraries[];
    searchCriteria: searchCriteria;
    cabinClasses: string[];
    passengersDetails?: any[];
}
/**
 * containing the search criteria of the current request
 */
export interface searchCriteria {
    adultNum: number;
    childNum: number;
    currency: string;
    flights: searchCriteriaFlights[];
    flightType: string;
    infantNum: number;
    language: string;
    pos: string;
    preferredAirline: any;
    searchId: string;
    selectDirectFlightsOnly: boolean;
    selectedFlightClass: string;
    source: string;
    totalPassengersNum: number;
}
export interface searchCriteriaFlights {
    arrivingTo: string;
    departingFrom: string;
    departingOnDate: string;
}
/**
 * flight itinerary Mdel
 */
export interface airItineraries {
    referralLink?: string;
    otaName?: string;
    providerLogo?: string;
    pKey?: number;
    flightSignature?: string;
    overNight?: number;
    stopsTime?: number;
    experiance: number;
    sequenceNum: number;
    isRefundable: boolean;
    itinTotalFare: itinTotalFare;
    totalDuration: number;
    deptDate: string;
    arrivalDate: string;
    cabinClass: string;
    flightType: string;
    allJourney: {
        flights: flight[];
    };
    baggageInformation: baggageInformation[];
    searchCriteria?: searchCriteria;
    passengerFareBreakDownDTOs?: passengerFareBreakDownDTOs[];
}
/**
 * Filter Form Model
 * [this is a generic model for the filter containing all filter criteria and you can use only what you need]
 */
export interface flighFilterForm {
    airlines?: string[];
    bookingSite?: string[];
    stopsForm: {
        noStops: boolean;
        oneStop: boolean;
        twoAndm: boolean;
    };
    sameAirline?: boolean;
    priceSlider?: number[];
    durationSlider?: number[];
    dpartingSlider?: number[];
    arrivingSlider?: number[];
    returnSlider?: number[];
    experience?: {
        overNight: boolean;
        longStops: boolean;
    };
    flexibleTickets?: {
        refund: boolean;
        nonRefund: boolean;
    };
}
/**
 * Filter Model
 * [this is a generic model for the filter containing all filter criteria and you can use only what you need]
 */
export declare class flightResultFilter {
    sameAirline: boolean;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    durationMin?: number | undefined;
    durationMax?: number | undefined;
    depatingMin?: number | undefined;
    departingMax?: number | undefined;
    arrivingMin?: number | undefined;
    arrivingMax?: number | undefined;
    returnMin?: number | undefined;
    returnMax?: number | undefined;
    stops?: number[] | undefined;
    experience?: boolean[] | undefined;
    flexibleTicket?: boolean[] | undefined;
    airlines?: string[] | undefined;
    bookingSites?: string[] | undefined;
    constructor(sameAirline: boolean, priceMin?: number | undefined, priceMax?: number | undefined, durationMin?: number | undefined, durationMax?: number | undefined, depatingMin?: number | undefined, departingMax?: number | undefined, arrivingMin?: number | undefined, arrivingMax?: number | undefined, returnMin?: number | undefined, returnMax?: number | undefined, stops?: number[] | undefined, experience?: boolean[] | undefined, flexibleTicket?: boolean[] | undefined, airlines?: string[] | undefined, bookingSites?: string[] | undefined);
}
export interface filterFlightInterface {
    sameAirline?: boolean;
    priceMin?: number;
    priceMax?: number;
    durationMin?: number;
    durationMax?: number;
    depatingMin?: number;
    departingMax?: number;
    arrivingMin?: number;
    arrivingMax?: number;
    returnMin?: number;
    returnMax?: number;
    stops?: number[];
    experience?: boolean[];
    flexibleTicket?: boolean[];
    airlines?: string[];
    bookingSites?: string[];
}
/**
 * this model is mapping to flight fare rules response
 */
export interface FareRules {
    departureCountry: string;
    arrivalCountry: string;
    adtRules: fares[];
    cnnRules: fares[];
    infRules: fares[];
}
export interface fares {
    fareRule: string;
    title: string;
}
export interface fareRulesResponse {
    errorMessage: string;
    fares: FareRules[];
}
export interface itinTotalFare {
    amount: number;
    fareAmount?: number;
    promoCode?: string;
    promoDiscount?: number;
    currencyCode: string;
    totalTaxes: number;
}
export interface flight {
    flightDTO: FlightDTO[];
    elapsedTime: number;
    stopsNum: number;
    flightAirline: FlightAirline;
}
export interface FlightDTO {
    supplierRefID: any;
    transitPosition?: string;
    transitWidth?: number;
    sequenceNum?: number;
    isStopSegment: boolean;
    deptTime: any;
    landTime: any;
    departureDate: string;
    arrivalDate: string;
    flightAirline: {
        airlineCode: string;
        airlineName: string;
        airlineLogo: string;
        alternativeBusinessName: string;
        languageCode: string;
        passportDetailsRequired: boolean;
    };
    operatedAirline: {
        airlineCode: string;
        airlineName: string;
        airlineLogo: string;
        alternativeBusinessName: string;
        languageCode: string;
        passportDetailsRequired: boolean;
    };
    durationPerLeg: number;
    departureTerminalAirport: {
        airportCode: string;
        airportName: string;
        cityName: string;
        cityCode: string;
        countryCode: string;
        countryName: string;
        regionName: string;
    };
    arrivalTerminalAirport: {
        airportCode: string;
        airportName: string;
        cityName: string;
        cityCode: string;
        countryCode: string;
        countryName: string;
        regionName: string;
    };
    transitTime: string;
    flightInfo: {
        flightNumber: string;
        equipmentNumber: string;
        mealCode: string;
        bookingCode: string;
        cabinClass: string;
    };
    segmentDetails: {
        uniqueKey: any;
        baggage: string;
        childBaggage: any;
        infantBaggage: any;
    };
}
export interface FlightAirline {
    airlineCode: string;
    airlineLogo: string;
    airlineName: string;
    alternativeBusinessName: string;
    passportDetailsRequired: boolean;
}
export interface baggageInformation {
    baggage: string;
    childBaggage: string;
    infantBaggage: string;
    airlineName: string;
    deptCity: string;
    landCity: string;
    flightNum: string;
}
export interface passengerFareBreakDownDTOs {
    key: string;
    cancelPenaltyDTOs: Penelty[];
    changePenaltyDTOs: Penelty[];
    passengerQuantity: number;
    passengersRef: any[];
    pricingMethod: string;
    passengerType: string;
    flightFaresDTOs: fare[];
    taxes: taxes[];
}
export interface Penelty {
    curency: string;
    percentage: number;
    price: number;
}
export interface fare {
    currencyCode: string;
    fareAmount: number;
    fareType: string;
}
export interface taxes {
    amount: number;
    contentl: string;
    countryCode?: string | null;
    taxCode: string;
    taxCurrencyCode: string;
    taxName?: string | null;
}
export declare class SearchFlightModule {
    lan: string;
    currency: string;
    pointOfReservation: string;
    flightType: string;
    flightsInfo: string;
    passengers: string;
    Cclass: string;
    serachId: any;
    showDirect: boolean;
    preferredAirLine: string;
    constructor(lan: string, currency: string, pointOfReservation: string, flightType: string, flightsInfo: string, passengers: string, Cclass: string, serachId: any, showDirect: boolean, preferredAirLine: string);
}
export interface customAirlineFilter {
    logo: string;
    stops: string | number;
    price: string | number;
    currency: string;
    name: string;
    selected: boolean;
}
/**
 * This is the fare Rules models
 */
export interface FareRules {
    departureCountry: string;
    arrivalCountry: string;
    adtRules: fares[];
    cnnRules: fares[];
    infRules: fares[];
}
export interface fares {
    fareRule: string;
    title: string;
}
