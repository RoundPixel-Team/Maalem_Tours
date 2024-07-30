import { enviromentModel } from '../interfaces';
import * as i0 from "@angular/core";
export declare class EnvironmentService {
    offlineSeats: string;
    searchflow: string;
    BookingFlow: string;
    FareRules: string;
    asm: string;
    Apihotels: string;
    users: string;
    admin: string;
    getDPayment: string;
    bookHotels: string;
    prepay: string;
    backOffice: string;
    FlightTop: string;
    offers: {
        getAll: string;
        getAllActive: string;
        getByID: string;
        BookOffer: string;
        RetriveItineraryDetails: string;
    };
    constructor();
    /**
     *
     * @param env [all environment endpoints]
     * configure the environment at your application startup
     * follow the interface named "enviromentModel" to provide all the system endpoints needed
     */
    envConfiguration(env: enviromentModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EnvironmentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EnvironmentService>;
}
