import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from '../../shared/services/environment.service';
import * as i0 from "@angular/core";
export class FlightSearchApiService {
    constructor() {
        this.http = inject(HttpClient);
        this.env = inject(EnvironmentService);
    }
}
FlightSearchApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FlightSearchApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: FlightSearchApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpZ2h0LXNlYXJjaC1hcGkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL2ZsaWdodC1zZWFyY2gvc2VydmljZXMvZmxpZ2h0LXNlYXJjaC1hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBTS9FLE1BQU0sT0FBTyxzQkFBc0I7SUFJakM7UUFITyxTQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFCLFFBQUcsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUV6QixDQUFDOzttSEFKTCxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Vudmlyb25tZW50LnNlcnZpY2UnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGlnaHRTZWFyY2hBcGlTZXJ2aWNlIHtcclxuICBwdWJsaWMgaHR0cCA9IGluamVjdChIdHRwQ2xpZW50KTtcclxuICBwdWJsaWMgZW52ID0gaW5qZWN0KEVudmlyb25tZW50U2VydmljZSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbn1cclxuIl19