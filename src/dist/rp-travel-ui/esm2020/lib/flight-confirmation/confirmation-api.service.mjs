import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from '../shared/services/environment.service';
import { catchError, map, retry, take } from 'rxjs';
import * as i0 from "@angular/core";
export class ConfirmationApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    /**
     *
     * @param url
     * @returns  the payment result status
     */
    getPaymentResult(url) {
        let api = `${this.env.prepay}/api/paymentresult?${url}`;
        return this.http.get(api).pipe(take(1), map((result) => { return result; }));
    }
    /**
     *
     * @param tok
     * @param url
     * @returns status after successful payment
     */
    PostProcessing(tok, url) {
        let api = `${url}&tok=${tok}`;
        return this.http.get(api).pipe(take(1), map((result) => {
            return result;
        }));
    }
    /**
     *
     * @param HGNu
     * @param searchid
     * @param tok
     * @returns flight confirmation details after payment has been finshed
     */
    getConfirmation(HGNu, searchid, tok) {
        let api = `${this.env.BookingFlow}/api/BookingConfirmation?HG=${HGNu}&SId=${searchid}&tok=${tok}`;
        return this.http.get(api).pipe(retry(3), take(1), map((result) => {
            return result;
        }), catchError((err) => { console.log("CONFIRMATION ERROR", err); throw err; }));
    }
}
ConfirmationApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmationApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ConfirmationApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLWFwaS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcnAtdHJhdmVsLXVpL3NyYy9saWIvZmxpZ2h0LWNvbmZpcm1hdGlvbi9jb25maXJtYXRpb24tYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBT3BELE1BQU0sT0FBTyxzQkFBc0I7SUFLakM7UUFITyxTQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3pCLFFBQUcsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUV2QixDQUFDO0lBQ2pCOzs7O09BSUc7SUFDSCxnQkFBZ0IsQ0FBQyxHQUFXO1FBQzFCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FDRCxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUNyQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2IsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxlQUFlLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUMsR0FBVztRQUN4RCxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVywrQkFBK0IsSUFBSSxRQUFRLFFBQVEsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQy9DLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDUixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDYixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUMsRUFBQyxVQUFVLENBQUMsQ0FBQyxHQUFPLEVBQUMsRUFBRSxHQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxNQUFNLEdBQUcsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUM1RSxDQUFDO0lBQ0osQ0FBQzs7bUhBcERVLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRnJCLE1BQU07MkZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZW52aXJvbm1lbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgcmV0cnksIHRha2UgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRmxpZ2h0U2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vZmxpZ2h0LXJlc3VsdC9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgY29uZmlybWF0aW9uTW9kZWwgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29uZmlybWF0aW9uQXBpU2VydmljZSB7XHJcblxyXG4gIHB1YmxpYyBodHRwID0gaW5qZWN0KEh0dHBDbGllbnQpXHJcbiAgcHVibGljIGVudiA9IGluamVjdChFbnZpcm9ubWVudFNlcnZpY2UpXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHVybCBcclxuICAgKiBAcmV0dXJucyAgdGhlIHBheW1lbnQgcmVzdWx0IHN0YXR1cyBcclxuICAgKi9cclxuICBnZXRQYXltZW50UmVzdWx0KHVybDogc3RyaW5nKSB7XHJcbiAgICBsZXQgYXBpID0gYCR7dGhpcy5lbnYucHJlcGF5fS9hcGkvcGF5bWVudHJlc3VsdD8ke3VybH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55PihhcGkpLnBpcGUoXHJcbiAgICAgIHRha2UoMSksXHJcbiAgICAgIG1hcChcclxuICAgICAgICAocmVzdWx0KSA9PiB7IHJldHVybiByZXN1bHQ7IH1cclxuICAgICAgKVxyXG4gICAgKVxyXG4gIH1cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0b2sgXHJcbiAgICogQHBhcmFtIHVybCBcclxuICAgKiBAcmV0dXJucyBzdGF0dXMgYWZ0ZXIgc3VjY2Vzc2Z1bCBwYXltZW50XHJcbiAgICovXHJcbiAgUG9zdFByb2Nlc3NpbmcodG9rOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XHJcbiAgICBsZXQgYXBpID0gYCR7dXJsfSZ0b2s9JHt0b2t9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYXBpKS5waXBlKFxyXG4gICAgICB0YWtlKDEpLFxyXG4gICAgICBtYXAoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIEhHTnUgXHJcbiAgICogQHBhcmFtIHNlYXJjaGlkIFxyXG4gICAqIEBwYXJhbSB0b2sgXHJcbiAgICogQHJldHVybnMgZmxpZ2h0IGNvbmZpcm1hdGlvbiBkZXRhaWxzIGFmdGVyIHBheW1lbnQgaGFzIGJlZW4gZmluc2hlZFxyXG4gICAqL1xyXG4gIGdldENvbmZpcm1hdGlvbihIR051OiBzdHJpbmcsIHNlYXJjaGlkOiBzdHJpbmcsdG9rPzpzdHJpbmcpIHtcclxuICAgIGxldCBhcGkgPSBgJHt0aGlzLmVudi5Cb29raW5nRmxvd30vYXBpL0Jvb2tpbmdDb25maXJtYXRpb24/SEc9JHtIR051fSZTSWQ9JHtzZWFyY2hpZH0mdG9rPSR7dG9rfWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxjb25maXJtYXRpb25Nb2RlbD4oYXBpKS5waXBlKFxyXG4gICAgICByZXRyeSgzKSxcclxuICAgICAgdGFrZSgxKSxcclxuICAgICAgbWFwKChyZXN1bHQpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9KSxjYXRjaEVycm9yKChlcnI6YW55KT0+e2NvbnNvbGUubG9nKFwiQ09ORklSTUFUSU9OIEVSUk9SXCIsZXJyKTt0aHJvdyBlcnJ9KVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19