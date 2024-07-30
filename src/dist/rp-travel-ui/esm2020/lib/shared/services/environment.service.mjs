import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class EnvironmentService {
    constructor() {
        this.offlineSeats = "http://178.63.214.221:7026"; //ticket boarding ofline seats
        this.searchflow = 'https://flightsearch.rhlaty.com';
        this.BookingFlow = 'https://flightflow.rhlaty.com';
        this.FareRules = 'https://flightprov.rhlaty.com';
        this.asm = 'https://backofficeapi.rhlaty.com';
        this.Apihotels = 'https://Hotelsapi.ticketboarding.com';
        this.users = 'https://usersapi.rhlaty.com';
        this.admin = 'https://adminapi.rhlaty.com/';
        this.getDPayment = 'https://adminapi.rhlaty.com/';
        this.bookHotels = 'https://Hotelsapi.ticketboarding.com';
        this.prepay = 'https://prepayapi.rhlaty.com';
        this.backOffice = 'https://backofficeapi.rhlaty.com';
        this.FlightTop = 'https://flightsearch.rhlaty.com';
        this.offers = {
            //Ticket boarding offers endpoints
            getAll: 'http://178.63.214.221:7893/api/GetAllOffersAPI?POS=',
            getAllActive: 'https://flightsearch.ticketboarding.com/api/GetOffers?POS=',
            getByID: 'https://flightsearch.ticketboarding.com/api/SelectOffer?OfferId=',
            BookOffer: "https://flightflow.ticketboarding.com/api/BookOffer",
            RetriveItineraryDetails: '/api/Admin/RetriveItineraryDetails'
        };
    }
    /**
     *
     * @param env [all environment endpoints]
     * configure the environment at your application startup
     * follow the interface named "enviromentModel" to provide all the system endpoints needed
     */
    envConfiguration(env) {
        this.Apihotels = env.Apihotels;
        this.BookingFlow = env.BookingFlow;
        this.FareRules = env.FareRules;
        this.FlightTop = env.FlightTop;
        this.admin = env.admin;
        this.asm = env.asm;
        this.backOffice = env.backOffice;
        this.bookHotels = env.bookHotels;
        this.getDPayment = env.getDPayment;
        this.prepay = env.prepay;
        this.offers.BookOffer = env.offers.BookOffer;
        this.offers.RetriveItineraryDetails = env.offers.RetriveItineraryDetails;
        this.offers.getAll = env.offers.getAll;
        this.offers.getByID = env.offers.getByID;
        this.offlineSeats = env.offlineSeats;
        this.searchflow = env.searchflow;
        this.users = env.users;
    }
}
EnvironmentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: EnvironmentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EnvironmentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: EnvironmentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: EnvironmentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9lbnZpcm9ubWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxrQkFBa0I7SUF3QjdCO1FBdEJBLGlCQUFZLEdBQUssNEJBQTRCLENBQUEsQ0FBQyw4QkFBOEI7UUFDMUUsZUFBVSxHQUFJLGlDQUFpQyxDQUFBO1FBQy9DLGdCQUFXLEdBQUcsK0JBQStCLENBQUE7UUFDN0MsY0FBUyxHQUFLLCtCQUErQixDQUFBO1FBQzdDLFFBQUcsR0FBVyxrQ0FBa0MsQ0FBQTtRQUNoRCxjQUFTLEdBQUssc0NBQXNDLENBQUE7UUFDcEQsVUFBSyxHQUFTLDZCQUE2QixDQUFBO1FBQzNDLFVBQUssR0FBUyw4QkFBOEIsQ0FBQTtRQUM1QyxnQkFBVyxHQUFHLDhCQUE4QixDQUFBO1FBQzVDLGVBQVUsR0FBSSxzQ0FBc0MsQ0FBQTtRQUNwRCxXQUFNLEdBQUcsOEJBQThCLENBQUE7UUFDdkMsZUFBVSxHQUFJLGtDQUFrQyxDQUFBO1FBQ2hELGNBQVMsR0FBSyxpQ0FBaUMsQ0FBQTtRQUMvQyxXQUFNLEdBQUU7WUFDTixrQ0FBa0M7WUFDbEMsTUFBTSxFQUFFLHFEQUFxRDtZQUM3RCxZQUFZLEVBQUUsNERBQTREO1lBQzFFLE9BQU8sRUFBRSxrRUFBa0U7WUFDM0UsU0FBUyxFQUFFLHFEQUFxRDtZQUNoRSx1QkFBdUIsRUFBQyxvQ0FBb0M7U0FDN0QsQ0FBQTtJQUVhLENBQUM7SUFFakI7Ozs7O09BS0c7SUFDSCxnQkFBZ0IsQ0FBQyxHQUFtQjtRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQTtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQTtRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUE7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQTtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFBO1FBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQTtRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUE7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO0lBQ3hCLENBQUM7OytHQWxEVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGVudmlyb21lbnRNb2RlbCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnRTZXJ2aWNlIHtcclxuXHJcbiAgb2ZmbGluZVNlYXRzPSAgICBcImh0dHA6Ly8xNzguNjMuMjE0LjIyMTo3MDI2XCIgLy90aWNrZXQgYm9hcmRpbmcgb2ZsaW5lIHNlYXRzXHJcbiAgICBzZWFyY2hmbG93ID0gICdodHRwczovL2ZsaWdodHNlYXJjaC5yaGxhdHkuY29tJ1xyXG4gICAgQm9va2luZ0Zsb3cgPSAnaHR0cHM6Ly9mbGlnaHRmbG93LnJobGF0eS5jb20nXHJcbiAgICBGYXJlUnVsZXMgPSAgICdodHRwczovL2ZsaWdodHByb3YucmhsYXR5LmNvbSdcclxuICAgIGFzbSA9ICAgICAgICAgJ2h0dHBzOi8vYmFja29mZmljZWFwaS5yaGxhdHkuY29tJ1xyXG4gICAgQXBpaG90ZWxzID0gICAnaHR0cHM6Ly9Ib3RlbHNhcGkudGlja2V0Ym9hcmRpbmcuY29tJ1xyXG4gICAgdXNlcnMgPSAgICAgICAnaHR0cHM6Ly91c2Vyc2FwaS5yaGxhdHkuY29tJ1xyXG4gICAgYWRtaW4gPSAgICAgICAnaHR0cHM6Ly9hZG1pbmFwaS5yaGxhdHkuY29tLydcclxuICAgIGdldERQYXltZW50ID0gJ2h0dHBzOi8vYWRtaW5hcGkucmhsYXR5LmNvbS8nXHJcbiAgICBib29rSG90ZWxzID0gICdodHRwczovL0hvdGVsc2FwaS50aWNrZXRib2FyZGluZy5jb20nXHJcbiAgICBwcmVwYXkgPSAnaHR0cHM6Ly9wcmVwYXlhcGkucmhsYXR5LmNvbSdcclxuICAgIGJhY2tPZmZpY2UgPSAgJ2h0dHBzOi8vYmFja29mZmljZWFwaS5yaGxhdHkuY29tJ1xyXG4gICAgRmxpZ2h0VG9wID0gICAnaHR0cHM6Ly9mbGlnaHRzZWFyY2gucmhsYXR5LmNvbSdcclxuICAgIG9mZmVycz0ge1xyXG4gICAgICAvL1RpY2tldCBib2FyZGluZyBvZmZlcnMgZW5kcG9pbnRzXHJcbiAgICAgIGdldEFsbDogJ2h0dHA6Ly8xNzguNjMuMjE0LjIyMTo3ODkzL2FwaS9HZXRBbGxPZmZlcnNBUEk/UE9TPScsXHJcbiAgICAgIGdldEFsbEFjdGl2ZTogJ2h0dHBzOi8vZmxpZ2h0c2VhcmNoLnRpY2tldGJvYXJkaW5nLmNvbS9hcGkvR2V0T2ZmZXJzP1BPUz0nLFxyXG4gICAgICBnZXRCeUlEOiAnaHR0cHM6Ly9mbGlnaHRzZWFyY2gudGlja2V0Ym9hcmRpbmcuY29tL2FwaS9TZWxlY3RPZmZlcj9PZmZlcklkPScsXHJcbiAgICAgIEJvb2tPZmZlcjogXCJodHRwczovL2ZsaWdodGZsb3cudGlja2V0Ym9hcmRpbmcuY29tL2FwaS9Cb29rT2ZmZXJcIixcclxuICAgICAgUmV0cml2ZUl0aW5lcmFyeURldGFpbHM6Jy9hcGkvQWRtaW4vUmV0cml2ZUl0aW5lcmFyeURldGFpbHMnXHJcbiAgICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBlbnYgW2FsbCBlbnZpcm9ubWVudCBlbmRwb2ludHNdXHJcbiAgICogY29uZmlndXJlIHRoZSBlbnZpcm9ubWVudCBhdCB5b3VyIGFwcGxpY2F0aW9uIHN0YXJ0dXBcclxuICAgKiBmb2xsb3cgdGhlIGludGVyZmFjZSBuYW1lZCBcImVudmlyb21lbnRNb2RlbFwiIHRvIHByb3ZpZGUgYWxsIHRoZSBzeXN0ZW0gZW5kcG9pbnRzIG5lZWRlZFxyXG4gICAqL1xyXG4gIGVudkNvbmZpZ3VyYXRpb24oZW52OmVudmlyb21lbnRNb2RlbCl7XHJcbiAgICB0aGlzLkFwaWhvdGVscyA9IGVudi5BcGlob3RlbHNcclxuICAgIHRoaXMuQm9va2luZ0Zsb3cgPSBlbnYuQm9va2luZ0Zsb3dcclxuICAgIHRoaXMuRmFyZVJ1bGVzID0gZW52LkZhcmVSdWxlc1xyXG4gICAgdGhpcy5GbGlnaHRUb3AgPSBlbnYuRmxpZ2h0VG9wXHJcbiAgICB0aGlzLmFkbWluID0gZW52LmFkbWluXHJcbiAgICB0aGlzLmFzbSA9IGVudi5hc21cclxuICAgIHRoaXMuYmFja09mZmljZSA9IGVudi5iYWNrT2ZmaWNlXHJcbiAgICB0aGlzLmJvb2tIb3RlbHMgPSBlbnYuYm9va0hvdGVsc1xyXG4gICAgdGhpcy5nZXREUGF5bWVudCA9IGVudi5nZXREUGF5bWVudFxyXG4gICAgdGhpcy5wcmVwYXkgPSBlbnYucHJlcGF5XHJcbiAgICB0aGlzLm9mZmVycy5Cb29rT2ZmZXIgPSBlbnYub2ZmZXJzLkJvb2tPZmZlclxyXG4gICAgdGhpcy5vZmZlcnMuUmV0cml2ZUl0aW5lcmFyeURldGFpbHMgPSBlbnYub2ZmZXJzLlJldHJpdmVJdGluZXJhcnlEZXRhaWxzXHJcbiAgICB0aGlzLm9mZmVycy5nZXRBbGwgPSBlbnYub2ZmZXJzLmdldEFsbFxyXG4gICAgdGhpcy5vZmZlcnMuZ2V0QnlJRCA9IGVudi5vZmZlcnMuZ2V0QnlJRFxyXG4gICAgdGhpcy5vZmZsaW5lU2VhdHMgPSBlbnYub2ZmbGluZVNlYXRzXHJcbiAgICB0aGlzLnNlYXJjaGZsb3cgPSBlbnYuc2VhcmNoZmxvd1xyXG4gICAgdGhpcy51c2VycyA9IGVudi51c2Vyc1xyXG4gIH1cclxufVxyXG4iXX0=