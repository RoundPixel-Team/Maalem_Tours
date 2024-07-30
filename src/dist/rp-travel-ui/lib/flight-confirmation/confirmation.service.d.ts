import { ConfirmationApiService } from './confirmation-api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { confirmationModel } from './interfaces';
import * as i0 from "@angular/core";
export declare class ConfirmationService {
    private sanitizer;
    api: ConfirmationApiService;
    loading: boolean;
    confirmationData: confirmationModel;
    wgoDeebUrl: SafeUrl;
    error: any;
    constructor(sanitizer: DomSanitizer);
    /**
     * fetching confirmation data
     * update state of [confirmationData:FlightSearchResult] in case of success response
     * update loading state
     * @param searchId
     * @param hgNum
     * @param tok
     */
    getConfirmationDate(searchId: string, hgNum: string, tok: string): void;
    /**
     *
     * @returns formatt wgo deeb url
     */
    formatWegoClicktUrl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmationService>;
}
