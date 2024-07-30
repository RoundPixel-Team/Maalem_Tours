import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../shared/services/environment.service';
import { FlightSearchResult, SearchFlightModule, fareRulesResponse } from '../interfaces';
import * as i0 from "@angular/core";
export declare class FlightResultApiService {
    http: HttpClient;
    env: EnvironmentService;
    constructor();
    searchFlight(searchFlight: SearchFlightModule): import("rxjs").Observable<FlightSearchResult>;
    fareRules(sid: string, seq: number, pKey: string): import("rxjs").Observable<fareRulesResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlightResultApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FlightResultApiService>;
}
