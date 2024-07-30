import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../shared/services/environment.service';
import { confirmationModel } from './interfaces';
import * as i0 from "@angular/core";
export declare class ConfirmationApiService {
    http: HttpClient;
    env: EnvironmentService;
    constructor();
    /**
     *
     * @param url
     * @returns  the payment result status
     */
    getPaymentResult(url: string): import("rxjs").Observable<any>;
    /**
     *
     * @param tok
     * @param url
     * @returns status after successful payment
     */
    PostProcessing(tok: string, url: string): import("rxjs").Observable<any>;
    /**
     *
     * @param HGNu
     * @param searchid
     * @param tok
     * @returns flight confirmation details after payment has been finshed
     */
    getConfirmation(HGNu: string, searchid: string, tok?: string): import("rxjs").Observable<confirmationModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmationApiService>;
}
