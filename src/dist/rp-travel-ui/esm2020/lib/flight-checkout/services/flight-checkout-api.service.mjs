import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from '../../shared/services/environment.service';
import { catchError, mergeMap, retry, take } from 'rxjs';
import * as i0 from "@angular/core";
export class FlightCheckoutApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    /**
     *
     * @param searchid
     * @param sequenceNum
     * @param providerKey
     * @returns all information about the selected flight according to its searchId , sequence number and provider key
     */
    getSelectedFlight(searchid, sequenceNum, providerKey) {
        let api = `${this.env.searchflow}/api/GetSelectedFlight?searchid=${searchid}&SequenceNum=${sequenceNum}&PKey=${providerKey}`;
        return this.http.get(api).pipe(retry(3), take(1), catchError(err => { throw err; }));
    }
    /**
     *
     * @param SID
     * @param POS
     * @returns a list of offline services provided for a flight reservation using the search ID and the POS
     */
    offlineServices(url) {
        return this.http.get(url).pipe(retry(2), take(1), catchError(err => { console.log(err); throw err; }));
    }
    /**
     *
     * @param promo
     * @param Sid
     * @param sequenceNum
     * @param pkey
     * @returns disscount amount if the copoun code is active and valid
     */
    activateCobon(promo, Sid, sequenceNum, pkey) {
        //check the validity of cobon and return
        let api = `${this.env.BookingFlow}/api/GetPromotionDetails?PromoCode=${promo}&SearchId=${Sid}&SeqNum=${sequenceNum}&PKey=${pkey}  `;
        return this.http.get(api).pipe(take(1));
    }
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
    saveBooking(searchid, sequenceNum, body, pkey, lang, selectedServices, ip, ipLocation) {
        let api = `${this.env.BookingFlow}/api/SaveBooking?SearchId=${searchid}&SeqNum=${sequenceNum}&PKey=${pkey}`;
        return this.http.post(api, body).pipe(take(1), retry(1), mergeMap((result) => {
            let api = `${this.env.BookingFlow}/api/CheckFlightValidation?HGNum=${result.hgNumber}&Language=${lang}&SearchId=${searchid}&SeqNum=${sequenceNum}&PKey=${pkey}`;
            return this.http.get(api).pipe(retry(1), take(1), mergeMap(() => {
                let apis = `${this.env.BookingFlow}/api/GetPaymentView?IP=${ip}&IPLoc=${ipLocation}&HG=${result.hgNumber}&SId=${searchid}&NotifyToken=`;
                let bodys = {
                    UserSeletedInsurance: { ProductId: "" },
                    UserSeletedServices: { SeletedServicesCodes: selectedServices },
                };
                return this.http.post(apis, bodys).pipe(take(1), retry(1));
            }), catchError(err => { console.log(err); throw err; }));
        }), catchError(err => { console.log(err); throw err; }));
    }
}
FlightCheckoutApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightCheckoutApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightCheckoutApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpZ2h0LWNoZWNrb3V0LWFwaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcnAtdHJhdmVsLXVpL3NyYy9saWIvZmxpZ2h0LWNoZWNrb3V0L3NlcnZpY2VzL2ZsaWdodC1jaGVja291dC1hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLekQsTUFBTSxPQUFPLHdCQUF3QjtJQUtuQztRQUhPLFNBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekIsUUFBRyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBRXZCLENBQUM7SUFFakI7Ozs7OztPQU1HO0lBQ0gsaUJBQWlCLENBQUMsUUFBZ0IsRUFBQyxXQUFtQixFQUFDLFdBQW1CO1FBQ3hFLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLG1DQUFtQyxRQUFRLGdCQUFnQixXQUFXLFNBQVMsV0FBVyxFQUFFLENBQUM7UUFDN0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBaUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQSxFQUFFLEdBQUMsTUFBTSxHQUFHLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFH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QUMsQ0FDaEQsQ0FBQTtJQUNILENBQUM7O3FIQTFFVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Vudmlyb25tZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2JvbiwgZmxpZ2h0T2ZmbGluZVNlcnZpY2UsIHBhc3NlbmdlcnNNb2RlbCwgc2VsZWN0ZWRGbGlnaHQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWVyZ2VNYXAsIHJldHJ5LCB0YWtlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGlnaHRDaGVja291dEFwaVNlcnZpY2Uge1xyXG5cclxuICBwdWJsaWMgaHR0cCA9IGluamVjdChIdHRwQ2xpZW50KVxyXG4gIHB1YmxpYyBlbnYgPSBpbmplY3QoRW52aXJvbm1lbnRTZXJ2aWNlKVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gc2VhcmNoaWQgXHJcbiAgICogQHBhcmFtIHNlcXVlbmNlTnVtIFxyXG4gICAqIEBwYXJhbSBwcm92aWRlcktleSBcclxuICAgKiBAcmV0dXJucyBhbGwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNlbGVjdGVkIGZsaWdodCBhY2NvcmRpbmcgdG8gaXRzIHNlYXJjaElkICwgc2VxdWVuY2UgbnVtYmVyIGFuZCBwcm92aWRlciBrZXlcclxuICAgKi9cclxuICBnZXRTZWxlY3RlZEZsaWdodChzZWFyY2hpZDogc3RyaW5nLHNlcXVlbmNlTnVtOiBudW1iZXIscHJvdmlkZXJLZXk6IG51bWJlcikge1xyXG4gICAgbGV0IGFwaSA9IGAke3RoaXMuZW52LnNlYXJjaGZsb3d9L2FwaS9HZXRTZWxlY3RlZEZsaWdodD9zZWFyY2hpZD0ke3NlYXJjaGlkfSZTZXF1ZW5jZU51bT0ke3NlcXVlbmNlTnVtfSZQS2V5PSR7cHJvdmlkZXJLZXl9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PHNlbGVjdGVkRmxpZ2h0PihhcGkpLnBpcGUocmV0cnkoMyksdGFrZSgxKSxjYXRjaEVycm9yKGVycj0+e3Rocm93IGVycn0pKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gU0lEIFxyXG4gICAqIEBwYXJhbSBQT1MgXHJcbiAgICogQHJldHVybnMgYSBsaXN0IG9mIG9mZmxpbmUgc2VydmljZXMgcHJvdmlkZWQgZm9yIGEgZmxpZ2h0IHJlc2VydmF0aW9uIHVzaW5nIHRoZSBzZWFyY2ggSUQgYW5kIHRoZSBQT1NcclxuICAgKi9cclxuICBvZmZsaW5lU2VydmljZXModXJsOnN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8ZmxpZ2h0T2ZmbGluZVNlcnZpY2VbXT4odXJsKS5waXBlKHJldHJ5KDIpLHRha2UoMSksY2F0Y2hFcnJvcihlcnI9Pntjb25zb2xlLmxvZyhlcnIpO3Rocm93IGVycn0pKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gcHJvbW8gXHJcbiAgICogQHBhcmFtIFNpZCBcclxuICAgKiBAcGFyYW0gc2VxdWVuY2VOdW0gXHJcbiAgICogQHBhcmFtIHBrZXkgXHJcbiAgICogQHJldHVybnMgZGlzc2NvdW50IGFtb3VudCBpZiB0aGUgY29wb3VuIGNvZGUgaXMgYWN0aXZlIGFuZCB2YWxpZFxyXG4gICAqL1xyXG4gIGFjdGl2YXRlQ29ib24ocHJvbW86IHN0cmluZywgU2lkOiBzdHJpbmcsIHNlcXVlbmNlTnVtOiBhbnksIHBrZXk6IHN0cmluZykge1xyXG4gICAgLy9jaGVjayB0aGUgdmFsaWRpdHkgb2YgY29ib24gYW5kIHJldHVyblxyXG4gICAgbGV0IGFwaSA9IGAke3RoaXMuZW52LkJvb2tpbmdGbG93fS9hcGkvR2V0UHJvbW90aW9uRGV0YWlscz9Qcm9tb0NvZGU9JHtwcm9tb30mU2VhcmNoSWQ9JHtTaWR9JlNlcU51bT0ke3NlcXVlbmNlTnVtfSZQS2V5PSR7cGtleX0gIGA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDb2Jvbj4oYXBpKS5waXBlKHRha2UoMSkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBzZWFyY2hpZCBcclxuICAgKiBAcGFyYW0gc2VxdWVuY2VOdW0gXHJcbiAgICogQHBhcmFtIGJvZHkgXHJcbiAgICogQHBhcmFtIHBrZXkgXHJcbiAgICogQHBhcmFtIGxhbmcgXHJcbiAgICogQHBhcmFtIHNlbGVjdGVkU2VydmljZXMgXHJcbiAgICogQHJldHVybnMgdGhpcyBmdW5jdGlvbiBpcyByZXNwb3NpYmxlIHRvIGNhbGwgdGhlIHNhdmUgYm9va2luZyB0aGVuIGNoZWNraW5nIGZsaWdodCB2YWxpZGF0aW9ucyBhbmQgdGhlbSBnZW5lcmF0ZSB5b3VyIHBheW1lbnQgbGlua1xyXG4gICAqL1xyXG4gIHNhdmVCb29raW5nKHNlYXJjaGlkOiBzdHJpbmcsIHNlcXVlbmNlTnVtOiBudW1iZXIsIGJvZHk6IHBhc3NlbmdlcnNNb2RlbCwgcGtleTogc3RyaW5nLCBsYW5nOnN0cmluZyxzZWxlY3RlZFNlcnZpY2VzOnN0cmluZ1tdLGlwOnN0cmluZyxpcExvY2F0aW9uOnN0cmluZykge1xyXG4gICAgbGV0IGFwaSA9IGAke3RoaXMuZW52LkJvb2tpbmdGbG93fS9hcGkvU2F2ZUJvb2tpbmc/U2VhcmNoSWQ9JHtzZWFyY2hpZH0mU2VxTnVtPSR7c2VxdWVuY2VOdW19JlBLZXk9JHtwa2V5fWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihhcGksIGJvZHkpLnBpcGUodGFrZSgxKSxyZXRyeSgxKSxcclxuICAgICAgbWVyZ2VNYXAoXHJcbiAgICAgICAgKHJlc3VsdCkgPT4geyBcclxuICAgICAgICAgIGxldCBhcGkgPSBgJHt0aGlzLmVudi5Cb29raW5nRmxvd30vYXBpL0NoZWNrRmxpZ2h0VmFsaWRhdGlvbj9IR051bT0ke3Jlc3VsdC5oZ051bWJlcn0mTGFuZ3VhZ2U9JHtsYW5nfSZTZWFyY2hJZD0ke3NlYXJjaGlkfSZTZXFOdW09JHtzZXF1ZW5jZU51bX0mUEtleT0ke3BrZXl9YDtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYXBpKS5waXBlKHJldHJ5KDEpLHRha2UoMSksXHJcbiAgICAgICAgICBtZXJnZU1hcCgoKT0+e1xyXG4gICAgICAgICAgICBsZXQgYXBpcyA9IGAke3RoaXMuZW52LkJvb2tpbmdGbG93fS9hcGkvR2V0UGF5bWVudFZpZXc/SVA9JHtpcH0mSVBMb2M9JHtpcExvY2F0aW9ufSZIRz0ke3Jlc3VsdC5oZ051bWJlcn0mU0lkPSR7c2VhcmNoaWR9Jk5vdGlmeVRva2VuPWA7XHJcbiAgICAgICAgICAgIGxldCBib2R5cyA9IHtcclxuICAgICAgICAgICAgICBVc2VyU2VsZXRlZEluc3VyYW5jZTogeyBQcm9kdWN0SWQ6IFwiXCIgfSxcclxuICAgICAgICAgICAgICBVc2VyU2VsZXRlZFNlcnZpY2VzOiB7IFNlbGV0ZWRTZXJ2aWNlc0NvZGVzOiBzZWxlY3RlZFNlcnZpY2VzIH0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KGFwaXMsIGJvZHlzKS5waXBlKHRha2UoMSkscmV0cnkoMSkpXHJcbiAgICAgICAgICB9KSxjYXRjaEVycm9yKGVycj0+e2NvbnNvbGUubG9nKGVycik7dGhyb3cgZXJyfSkpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICksY2F0Y2hFcnJvcihlcnI9Pntjb25zb2xlLmxvZyhlcnIpO3Rocm93IGVycn0pXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdfQ==