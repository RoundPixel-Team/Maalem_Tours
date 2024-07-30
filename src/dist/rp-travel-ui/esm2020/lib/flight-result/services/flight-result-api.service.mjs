import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from '../../shared/services/environment.service';
import { catchError, retry, take } from 'rxjs';
import * as i0 from "@angular/core";
export class FlightResultApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
    searchFlight(searchFlight) {
        let api = `${this.env.searchflow}/flights/flightsSearch/${searchFlight.lan}/${searchFlight.currency}/${searchFlight.pointOfReservation}/${searchFlight.flightType}/${searchFlight.flightsInfo}/${searchFlight.passengers}/${searchFlight.Cclass}/${searchFlight.showDirect}/all/0/0/Direct?searchID=${searchFlight.serachId}`;
        return this.http.get(api).pipe(retry(2), take(1), catchError(err => { console.log(err); throw err; }));
        ;
    }
    fareRules(sid, seq, pKey) {
        let api = `${this.env.FareRules}/api/GetFareRules?SId=${sid}&SeqNum=${seq}&PKey=${pKey}`;
        console.log(api);
        return this.http.get(api).pipe(take(1));
    }
}
FlightResultApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightResultApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightResultApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpZ2h0LXJlc3VsdC1hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL2ZsaWdodC1yZXN1bHQvc2VydmljZXMvZmxpZ2h0LXJlc3VsdC1hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQU0vQyxNQUFNLE9BQU8sc0JBQXNCO0lBS2pDO1FBSE8sU0FBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN6QixRQUFHLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFFdkIsQ0FBQztJQUdqQixZQUFZLENBQUMsWUFBZ0M7UUFDM0MsSUFBSSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsMEJBQTBCLFlBQVksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUMsa0JBQWtCLElBQUksWUFBWSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUMsV0FBVyxJQUFJLFlBQVksQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsVUFBVSw0QkFBNEIsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RVLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQXFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUEsRUFBRSxHQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxNQUFNLEdBQUcsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFBQSxDQUFDO0lBQ3hILENBQUM7SUFFRCxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZO1FBQzlDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLHlCQUF5QixHQUFHLFdBQVcsR0FBRyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ3pGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBb0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7O21IQWxCVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Vudmlyb25tZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGYXJlUnVsZXMsIEZsaWdodFNlYXJjaFJlc3VsdCwgU2VhcmNoRmxpZ2h0TW9kdWxlLCBmYXJlUnVsZXNSZXNwb25zZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCByZXRyeSwgdGFrZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzZWFyY2hGbGlnaHRNb2RlbCB9IGZyb20gJy4uLy4uL2ZsaWdodC1zZWFyY2gvaW50ZXJmYWNlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGlnaHRSZXN1bHRBcGlTZXJ2aWNlIHtcclxuXHJcbiAgcHVibGljIGh0dHAgPSBpbmplY3QoSHR0cENsaWVudClcclxuICBwdWJsaWMgZW52ID0gaW5qZWN0KEVudmlyb25tZW50U2VydmljZSlcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcblxyXG4gIHNlYXJjaEZsaWdodChzZWFyY2hGbGlnaHQ6IFNlYXJjaEZsaWdodE1vZHVsZSkge1xyXG4gICAgbGV0IGFwaTogc3RyaW5nID0gYCR7dGhpcy5lbnYuc2VhcmNoZmxvd30vZmxpZ2h0cy9mbGlnaHRzU2VhcmNoLyR7c2VhcmNoRmxpZ2h0Lmxhbn0vJHtzZWFyY2hGbGlnaHQuY3VycmVuY3l9LyR7c2VhcmNoRmxpZ2h0LnBvaW50T2ZSZXNlcnZhdGlvbn0vJHtzZWFyY2hGbGlnaHQuZmxpZ2h0VHlwZX0vJHtzZWFyY2hGbGlnaHQuZmxpZ2h0c0luZm99LyR7c2VhcmNoRmxpZ2h0LnBhc3NlbmdlcnN9LyR7c2VhcmNoRmxpZ2h0LkNjbGFzc30vJHtzZWFyY2hGbGlnaHQuc2hvd0RpcmVjdH0vYWxsLzAvMC9EaXJlY3Q/c2VhcmNoSUQ9JHtzZWFyY2hGbGlnaHQuc2VyYWNoSWR9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEZsaWdodFNlYXJjaFJlc3VsdD4oYXBpKS5waXBlKHJldHJ5KDIpLCB0YWtlKDEpLGNhdGNoRXJyb3IoZXJyPT57Y29uc29sZS5sb2coZXJyKTt0aHJvdyBlcnJ9KSApOztcclxuICB9XHJcblxyXG4gIGZhcmVSdWxlcyhzaWQ6IHN0cmluZywgc2VxOiBudW1iZXIsIHBLZXk6IHN0cmluZykge1xyXG4gICAgbGV0IGFwaSA9IGAke3RoaXMuZW52LkZhcmVSdWxlc30vYXBpL0dldEZhcmVSdWxlcz9TSWQ9JHtzaWR9JlNlcU51bT0ke3NlcX0mUEtleT0ke3BLZXl9YDtcclxuICAgIGNvbnNvbGUubG9nKGFwaSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8ZmFyZVJ1bGVzUmVzcG9uc2U+KGFwaSkucGlwZSh0YWtlKDEpKTtcclxuICB9XHJcbn1cclxuIl19