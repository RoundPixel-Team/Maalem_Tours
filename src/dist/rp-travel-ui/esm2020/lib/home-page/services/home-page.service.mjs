import { Injectable, inject } from '@angular/core';
import { HomePageApiService } from './home-page-api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
export class HomePageService {
    constructor() {
        this.api = inject(HomePageApiService);
        this.route = inject(ActivatedRoute);
        this.subscription = new Subscription();
        /**
         * here is all available currencies
         */
        this.allCurrency = [];
        /**
           * Here's the value of selected currency
           */
        this.selectedCurrency = {
            Currency_Code: "KWD",
            Currency_Name: "Kuwait Dinar",
            ID: 2027,
            Image_Url: "https://images.khaleejgate.com/Content/Currencies/KWD.JPG",
            Is_Base_Currency: true,
            rate: 1
        };
        /**
         * here is all available airports
         */
        this.allAirports = [];
        /**
        * here is all available countries
        */
        this.allCountries = [];
        /**
         * here is all available offers
         */
        this.allOffers = [];
        /**
         * loading state ..
         */
        this.loader = false;
        /**
         * getting offer images
         */
        this.offerImages = [];
        /**
         * Creating booking offer form
         */
        this.offerCheckOutForm = new FormGroup({
            FullName: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
            ]),
            Email: new FormControl("", [
                Validators.required,
                Validators.email,
                Validators.minLength(9),
            ]),
            PhoneNumber: new FormControl("", [
                Validators.required,
                Validators.maxLength(5),
            ]),
            Nationality: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
            ]),
        });
    }
    /**
     *
     * @param baseCurrency
     * this is for fetching all currencies and update my all currencies state (allCurrency:currencyModel[])
     * also updates loader state (loader:boolean)
     */
    getCurrency(baseCurrency) {
        this.loader = true;
        this.subscription.add(this.api.currencyApi(baseCurrency).subscribe((res) => {
            if (res) {
                this.allCurrency = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all currency error ->', err);
            this.loader = false;
        }));
    }
    /**
     * set the default selected currency model according to point of sale
     * @param currencyModel
     */
    setSelectedCurrency(currency) {
        this.selectedCurrency = currency;
    }
    /**
   *
   * @param currentLang
   * this is for fetching all airports (allAirports: airPorts[]) based on current language
   * also updates loader state (loader:boolean)
   */
    getAirports(currentLang) {
        this.loader = true;
        this.subscription.add(this.api.UtilityAirports(currentLang).subscribe((res) => {
            if (res) {
                this.allAirports = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all airports error ->', err);
            this.loader = false;
        }));
    }
    /**
  *
  * @param currentLang
  * this is for fetching all countries (allCountries :countries[]) based on current language
  * also updates loader state (loader:boolean)
  */
    getCountries(currentLang) {
        this.loader = true;
        this.subscription.add(this.api.getCountries(currentLang).subscribe((res) => {
            if (res) {
                this.allCountries = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all countires error ->', err);
            this.loader = false;
        }));
    }
    /**
                      
     * this is for fetching and updating Point of Sale (pointOfSale:pointOfSaleModel)
     *and also updates loader state
     */
    getPointOfSale() {
        this.loader = true;
        this.subscription.add(this.api.pointOfSale().subscribe((res) => {
            if (res) {
                this.pointOfSale = res;
                this.loader = false;
            }
        }, (err) => {
            console.log('get all pointofsales error ->', err);
            this.loader = false;
        }));
    }
    /**
   *
   * @param pos
   * this is for fetching all offers (allOffers :OfferDTO[]) based on current POS
   * also updates loader state (loader:boolean)
   */
    getAllOffers(pos) {
        this.loader = true;
        this.subscription.add(this.api.GetAllOffers(pos).subscribe((res) => {
            if (res) {
                this.allOffers = res.offers;
                this.loader = false;
                console.log(res, 'show offers');
            }
        }, (err) => {
            console.log('get all offers error ->', err);
            this.loader = false;
        }));
    }
    /**
     *
     * @param id
     * @returns this is for fetching  and updating single offer (offerById:OfferDTO) depending on given id
     * and also updates the loader state.
     */
    getOfferById(id) {
        this.loader = true;
        this.subscription.add(this.api.getOfferBYId(id).subscribe((res) => {
            console.log('get ID', id);
            if (res) {
                this.selectedOffer = res;
                this.loader = false;
                console.log("Offer", res);
            }
        }, (err) => {
            console.log('get offer by ID err==>', err);
            this.loader = false;
        }));
    }
    /**
     *
     * @param id
     * @returns this function is responsible for mapping & extracting the offer service properties.
     *  Also,it's responsible for retrieving the offline itinerary from the api in case of offline seats
     *  depending on the offer code.
     */
    extractOfferData(id) {
        this.offerImages = this.selectedOffer.offerImage ? [this.selectedOffer.offerImage.url] : [];
        let startDate = new Date(this.selectedOffer.startDate);
        let endDate = new Date(this.selectedOffer.endDate);
        let differenceInTime = startDate.getTime() - endDate.getTime();
        this.numberOfNights = differenceInTime / (1000 * 3600 * 24);
        this.selectedOffer.offerServices.map(offerService => {
            if (offerService.serviceType == '1') {
                this.subscription.add(this.api.retriveItinerary(offerService.offlineItinerary).subscribe((res) => {
                    if (res) {
                        this.offlineItinerary = res;
                    }
                }, (err) => {
                    console.log('offline itinerary err==>', err);
                }));
            }
        });
    }
    /**
     *
     * @param source
     * @param langCode
     * @param phonecountrycode
     * @returns it send the request of book offer form with the http headers which are the passed
     *  parameters and with the body of the request in type of (BookedOffer)
     */
    bookOffer(source, langCode, phonecountrycode) {
        let offerId = this.route.snapshot.paramMap.get("id");
        if (this.offerCheckOutForm.valid) {
            let Body = {
                Email: this.offerCheckOutForm.value["Email"],
                FullName: this.offerCheckOutForm.value["FullName"],
                Nationality: this.offerCheckOutForm.value["Nationality"],
                PhoneNumber: this.offerCheckOutForm.value["PhoneNumber"],
                PhoneCountryCode: phonecountrycode,
                SelectedOfferCode: Number(offerId),
            };
            this.subscription.add(this.api.BookOffers(source, langCode, Body, offerId).subscribe((res) => {
                if (res) {
                    this.submittedForm = res;
                }
            }, (err) => {
                console.log('Book offer err==>', err);
            }));
        }
        else {
            return;
        }
    }
    /**
     * this function is responsible to destory any opened subscription on this service
     */
    destroyer() {
        this.subscription.unsubscribe();
    }
}
HomePageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
HomePageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: HomePageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ycC10cmF2ZWwtdWkvc3JjL2xpYi9ob21lLXBhZ2Uvc2VydmljZXMvaG9tZS1wYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBTXBFLE1BQU0sT0FBTyxlQUFlO0lBdUYxQjtRQXJGQSxRQUFHLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDaEMsVUFBSyxHQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM1QixpQkFBWSxHQUFrQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRWhEOztXQUVHO1FBQ0gsZ0JBQVcsR0FBcUIsRUFBRSxDQUFBO1FBRXBDOzthQUVLO1FBQ0wscUJBQWdCLEdBQW1CO1lBQ2pDLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLGFBQWEsRUFBRSxjQUFjO1lBQzdCLEVBQUUsRUFBRSxJQUFJO1lBQ1IsU0FBUyxFQUFFLDJEQUEyRDtZQUN0RSxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQztRQUNBOztXQUVHO1FBQ0gsZ0JBQVcsR0FBYSxFQUFFLENBQUE7UUFDekI7O1VBRUU7UUFDRixpQkFBWSxHQUFjLEVBQUUsQ0FBQTtRQUMvQjs7V0FFRztRQUNBLGNBQVMsR0FBWSxFQUFFLENBQUE7UUFL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O21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIb21lUGFnZUFwaVNlcnZpY2UgfSBmcm9tICcuL2hvbWUtcGFnZS1hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7IEJvb2tlZE9mZmVyLCBJbWFnZSwgSXRpbmVyYXJ5LCBPZmZlckRUTyxhaXJQb3J0cywgY291bnRyaWVzLCBjdXJyZW5jeU1vZGVsLCBwb2ludE9mU2FsZU1vZGVsIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIb21lUGFnZVNlcnZpY2Uge1xyXG5cclxuICBhcGkgPSBpbmplY3QoSG9tZVBhZ2VBcGlTZXJ2aWNlKVxyXG4gIHJvdXRlPWluamVjdChBY3RpdmF0ZWRSb3V0ZSlcclxuICBzdWJzY3JpcHRpb24gOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCkgXHJcblxyXG4gIC8qKlxyXG4gICAqIGhlcmUgaXMgYWxsIGF2YWlsYWJsZSBjdXJyZW5jaWVzXHJcbiAgICovXHJcbiAgYWxsQ3VycmVuY3kgOiBjdXJyZW5jeU1vZGVsW10gPSBbXVxyXG5cclxuLyoqXHJcbiAgICogSGVyZSdzIHRoZSB2YWx1ZSBvZiBzZWxlY3RlZCBjdXJyZW5jeVxyXG4gICAqL1xyXG5zZWxlY3RlZEN1cnJlbmN5IDogY3VycmVuY3lNb2RlbCA9IHtcclxuICBDdXJyZW5jeV9Db2RlOiBcIktXRFwiLFxyXG4gIEN1cnJlbmN5X05hbWU6IFwiS3V3YWl0IERpbmFyXCIgLFxyXG4gIElEOiAyMDI3LFxyXG4gIEltYWdlX1VybDogXCJodHRwczovL2ltYWdlcy5raGFsZWVqZ2F0ZS5jb20vQ29udGVudC9DdXJyZW5jaWVzL0tXRC5KUEdcIixcclxuICBJc19CYXNlX0N1cnJlbmN5OiB0cnVlLFxyXG4gIHJhdGU6IDFcclxufTtcclxuICAvKipcclxuICAgKiBoZXJlIGlzIGFsbCBhdmFpbGFibGUgYWlycG9ydHNcclxuICAgKi9cclxuICBhbGxBaXJwb3J0cyA6YWlyUG9ydHNbXT1bXVxyXG4gICAvKipcclxuICAgKiBoZXJlIGlzIGFsbCBhdmFpbGFibGUgY291bnRyaWVzXHJcbiAgICovXHJcbiAgIGFsbENvdW50cmllcyA6Y291bnRyaWVzW109W11cclxuLyoqXHJcbiAqIGhlcmUgaXMgYWxsIGF2YWlsYWJsZSBvZmZlcnNcclxuICovXHJcbiAgIGFsbE9mZmVyczpPZmZlckRUT1tdPVtdXHJcbiAgLyoqXHJcbiAgICogaGVyZSBpcyBhbGwgYXZhaWxhYmxlIHBvaW50IG9mIHNhbGVcclxuICAgKi9cclxuICBwb2ludE9mU2FsZSE6cG9pbnRPZlNhbGVNb2RlbFxyXG4gIC8qKlxyXG4gICAqIGxvYWRpbmcgc3RhdGUgLi5cclxuICAgKi9cclxuICBsb2FkZXIgOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0dGluZyBzZWxlY3RlZCBvZmZlciBkYXRhXHJcbiAgICovXHJcbiAgc2VsZWN0ZWRPZmZlciE6IE9mZmVyRFRPO1xyXG5cclxuICAvKipudW1iZXIgb2YgbmlnaHRzIHByb3BlcnRpZXMgKi9cclxuICBudW1iZXJPZk5pZ2h0cyE6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBnZXR0aW5nIG9mZmxpbmUgaXRpbmVyYXJ5XHJcbiAgICovXHJcbiAgb2ZmbGluZUl0aW5lcmFyeSE6SXRpbmVyYXJ5O1xyXG4gIC8qKlxyXG4gICAqIGdldHRpbmcgb2ZmZXIgaW1hZ2VzXHJcbiAgICovXHJcbiAgb2ZmZXJJbWFnZXM6IHN0cmluZ1tdID1bXTtcclxuXHJcbi8qKmJvb2sgb2ZmZXIgQVBJIHJlcXVlc3QgdmFsdWUqL1xyXG4gIHN1Ym1pdHRlZEZvcm0hOkJvb2tlZE9mZmVyXHJcbi8qKlxyXG4gKiBDcmVhdGluZyBib29raW5nIG9mZmVyIGZvcm1cclxuICovXHJcbiAgb2ZmZXJDaGVja091dEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgIEZ1bGxOYW1lOiBuZXcgRm9ybUNvbnRyb2woXCJcIiwgW1xyXG4gICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG5cclxuICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMyksXHJcbiAgICBdKSxcclxuXHJcbiAgICBFbWFpbDogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgVmFsaWRhdG9ycy5lbWFpbCxcclxuICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoOSksXHJcbiAgICBdKSxcclxuXHJcbiAgICBQaG9uZU51bWJlcjogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgoNSksXHJcbiAgICBdKSxcclxuXHJcbiAgICBOYXRpb25hbGl0eTogbmV3IEZvcm1Db250cm9sKFwiXCIsIFtcclxuICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMiksXHJcbiAgICBdKSxcclxuICB9KTtcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuXHJcbi8qKlxyXG4gKiBcclxuICogQHBhcmFtIGJhc2VDdXJyZW5jeSBcclxuICogdGhpcyBpcyBmb3IgZmV0Y2hpbmcgYWxsIGN1cnJlbmNpZXMgYW5kIHVwZGF0ZSBteSBhbGwgY3VycmVuY2llcyBzdGF0ZSAoYWxsQ3VycmVuY3k6Y3VycmVuY3lNb2RlbFtdKVxyXG4gKiBhbHNvIHVwZGF0ZXMgbG9hZGVyIHN0YXRlIChsb2FkZXI6Ym9vbGVhbilcclxuICovXHJcbiAgZ2V0Q3VycmVuY3koYmFzZUN1cnJlbmN5OnN0cmluZyl7XHJcbiAgICB0aGlzLmxvYWRlciA9IHRydWVcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgdGhpcy5hcGkuY3VycmVuY3lBcGkoYmFzZUN1cnJlbmN5KS5zdWJzY3JpYmUoKHJlczpjdXJyZW5jeU1vZGVsW10pPT57XHJcbiAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgIHRoaXMuYWxsQ3VycmVuY3kgPSByZXNcclxuICAgICAgICAgIHRoaXMubG9hZGVyID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH0sKGVycjphbnkpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldCBhbGwgY3VycmVuY3kgZXJyb3IgLT4nLGVycilcclxuICAgICAgICB0aGlzLmxvYWRlciA9IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXQgdGhlIGRlZmF1bHQgc2VsZWN0ZWQgY3VycmVuY3kgbW9kZWwgYWNjb3JkaW5nIHRvIHBvaW50IG9mIHNhbGVcclxuICAgKiBAcGFyYW0gY3VycmVuY3lNb2RlbFxyXG4gICAqL1xyXG4gIHNldFNlbGVjdGVkQ3VycmVuY3koY3VycmVuY3k6Y3VycmVuY3lNb2RlbCl7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ3VycmVuY3kgPSBjdXJyZW5jeVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0gY3VycmVudExhbmcgXHJcbiAqIHRoaXMgaXMgZm9yIGZldGNoaW5nIGFsbCBhaXJwb3J0cyAoYWxsQWlycG9ydHM6IGFpclBvcnRzW10pIGJhc2VkIG9uIGN1cnJlbnQgbGFuZ3VhZ2VcclxuICogYWxzbyB1cGRhdGVzIGxvYWRlciBzdGF0ZSAobG9hZGVyOmJvb2xlYW4pXHJcbiAqL1xyXG4gIGdldEFpcnBvcnRzKGN1cnJlbnRMYW5nOnN0cmluZyl7XHJcbiAgICB0aGlzLmxvYWRlciA9IHRydWVcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgdGhpcy5hcGkuVXRpbGl0eUFpcnBvcnRzKGN1cnJlbnRMYW5nKS5zdWJzY3JpYmUoKHJlczphaXJQb3J0c1tdKT0+e1xyXG4gICAgICAgIGlmKHJlcyl7XHJcbiAgICAgICAgICB0aGlzLmFsbEFpcnBvcnRzID0gcmVzXHJcbiAgICAgICAgICB0aGlzLmxvYWRlciA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LChlcnI6YW55KT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXQgYWxsIGFpcnBvcnRzIGVycm9yIC0+JyxlcnIpXHJcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIH1cclxuICAgLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0gY3VycmVudExhbmcgXHJcbiAqIHRoaXMgaXMgZm9yIGZldGNoaW5nIGFsbCBjb3VudHJpZXMgKGFsbENvdW50cmllcyA6Y291bnRyaWVzW10pIGJhc2VkIG9uIGN1cnJlbnQgbGFuZ3VhZ2VcclxuICogYWxzbyB1cGRhdGVzIGxvYWRlciBzdGF0ZSAobG9hZGVyOmJvb2xlYW4pXHJcbiAqL1xyXG4gIGdldENvdW50cmllcyhjdXJyZW50TGFuZzpzdHJpbmcpe1xyXG4gICAgdGhpcy5sb2FkZXIgPSB0cnVlXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgIHRoaXMuYXBpLmdldENvdW50cmllcyhjdXJyZW50TGFuZykuc3Vic2NyaWJlKChyZXM6Y291bnRyaWVzW10pPT57XHJcbiAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgIHRoaXMuYWxsQ291bnRyaWVzID0gcmVzXHJcbiAgICAgICAgICB0aGlzLmxvYWRlciA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LChlcnI6YW55KT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXQgYWxsIGNvdW50aXJlcyBlcnJvciAtPicsZXJyKVxyXG4gICAgICAgIHRoaXMubG9hZGVyID0gZmFsc2VcclxuICAgICAgfSlcclxuICAgIClcclxuICB9XHJcbi8qKlxyXG4gICAgICAgICAgICAgICAgICBcclxuICogdGhpcyBpcyBmb3IgZmV0Y2hpbmcgYW5kIHVwZGF0aW5nIFBvaW50IG9mIFNhbGUgKHBvaW50T2ZTYWxlOnBvaW50T2ZTYWxlTW9kZWwpIFxyXG4gKmFuZCBhbHNvIHVwZGF0ZXMgbG9hZGVyIHN0YXRlXHJcbiAqL1xyXG5nZXRQb2ludE9mU2FsZSgpe1xyXG4gIHRoaXMubG9hZGVyID0gdHJ1ZVxyXG4gIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgdGhpcy5hcGkucG9pbnRPZlNhbGUoKS5zdWJzY3JpYmUoKHJlcyk9PntcclxuICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnBvaW50T2ZTYWxlID0gcmVzXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgfSwoZXJyOmFueSk9PntcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0IGFsbCBwb2ludG9mc2FsZXMgZXJyb3IgLT4nLGVycilcclxuICAgICAgICB0aGlzLmxvYWRlciA9IGZhbHNlXHJcbiAgICAgIH0pXHJcbiAgKVxyXG59XHJcbiAgLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0gcG9zIFxyXG4gKiB0aGlzIGlzIGZvciBmZXRjaGluZyBhbGwgb2ZmZXJzIChhbGxPZmZlcnMgOk9mZmVyRFRPW10pIGJhc2VkIG9uIGN1cnJlbnQgUE9TXHJcbiAqIGFsc28gdXBkYXRlcyBsb2FkZXIgc3RhdGUgKGxvYWRlcjpib29sZWFuKVxyXG4gKi9cclxuZ2V0QWxsT2ZmZXJzKHBvczpzdHJpbmcpe1xyXG4gIHRoaXMubG9hZGVyID0gdHJ1ZVxyXG4gIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgIHRoaXMuYXBpLkdldEFsbE9mZmVycyhwb3MpLnN1YnNjcmliZSgocmVzKT0+e1xyXG4gICAgICBpZihyZXMpe1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5hbGxPZmZlcnM9cmVzLm9mZmVycztcclxuICAgICAgICB0aGlzLmxvYWRlciA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcywnc2hvdyBvZmZlcnMnKTtcclxuICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9LChlcnI6YW55KT0+e1xyXG4gICAgICBjb25zb2xlLmxvZygnZ2V0IGFsbCBvZmZlcnMgZXJyb3IgLT4nLGVycilcclxuICAgICAgdGhpcy5sb2FkZXIgPSBmYWxzZVxyXG4gICAgfSlcclxuICApXHJcbn1cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0gaWQgXHJcbiAqIEByZXR1cm5zIHRoaXMgaXMgZm9yIGZldGNoaW5nICBhbmQgdXBkYXRpbmcgc2luZ2xlIG9mZmVyIChvZmZlckJ5SWQ6T2ZmZXJEVE8pIGRlcGVuZGluZyBvbiBnaXZlbiBpZFxyXG4gKiBhbmQgYWxzbyB1cGRhdGVzIHRoZSBsb2FkZXIgc3RhdGUuXHJcbiAqL1xyXG5nZXRPZmZlckJ5SWQoaWQ6bnVtYmVyIHwgc3RyaW5nKXtcclxuICB0aGlzLmxvYWRlcj0gdHJ1ZTtcclxuICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICB0aGlzLmFwaS5nZXRPZmZlckJZSWQoaWQpLnN1YnNjcmliZSgocmVzKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZygnZ2V0IElEJyxpZCk7XHJcbiAgICAgIGlmIChyZXMpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPZmZlcj1yZXM7XHJcbiAgICAgICAgdGhpcy5sb2FkZXI9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIixyZXMpO1xyXG4gICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfSwoZXJyOmFueSk9PntcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0IG9mZmVyIGJ5IElEIGVycj09PicsZXJyKTtcclxuICAgICAgICB0aGlzLmxvYWRlcj0gZmFsc2U7XHJcbiAgICB9KVxyXG4gIClcclxufVxyXG4vKipcclxuICogXHJcbiAqIEBwYXJhbSBpZCBcclxuICogQHJldHVybnMgdGhpcyBmdW5jdGlvbiBpcyByZXNwb25zaWJsZSBmb3IgbWFwcGluZyAmIGV4dHJhY3RpbmcgdGhlIG9mZmVyIHNlcnZpY2UgcHJvcGVydGllcy5cclxuICogIEFsc28saXQncyByZXNwb25zaWJsZSBmb3IgcmV0cmlldmluZyB0aGUgb2ZmbGluZSBpdGluZXJhcnkgZnJvbSB0aGUgYXBpIGluIGNhc2Ugb2Ygb2ZmbGluZSBzZWF0c1xyXG4gKiAgZGVwZW5kaW5nIG9uIHRoZSBvZmZlciBjb2RlLlxyXG4gKi9cclxuZXh0cmFjdE9mZmVyRGF0YShpZDpudW1iZXIgfCBzdHJpbmcpe1xyXG4gIFxyXG4gICAgdGhpcy5vZmZlckltYWdlcyA9dGhpcy5zZWxlY3RlZE9mZmVyLm9mZmVySW1hZ2U/IFt0aGlzLnNlbGVjdGVkT2ZmZXIub2ZmZXJJbWFnZS51cmxdIDogW11cclxuICAgIGxldCBzdGFydERhdGU9bmV3IERhdGUodGhpcy5zZWxlY3RlZE9mZmVyLnN0YXJ0RGF0ZSk7XHJcbiAgICBsZXQgZW5kRGF0ZT1uZXcgRGF0ZSh0aGlzLnNlbGVjdGVkT2ZmZXIuZW5kRGF0ZSk7XHJcbiAgICBsZXQgZGlmZmVyZW5jZUluVGltZT1zdGFydERhdGUuZ2V0VGltZSgpLWVuZERhdGUuZ2V0VGltZSgpO1xyXG4gICAgdGhpcy5udW1iZXJPZk5pZ2h0cz1kaWZmZXJlbmNlSW5UaW1lIC8gKDEwMDAgKiAzNjAwICogMjQpO1xyXG4gICAgdGhpcy5zZWxlY3RlZE9mZmVyLm9mZmVyU2VydmljZXMubWFwKG9mZmVyU2VydmljZT0+e1xyXG4gICAgICBpZihvZmZlclNlcnZpY2Uuc2VydmljZVR5cGU9PScxJyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5hcGkucmV0cml2ZUl0aW5lcmFyeShvZmZlclNlcnZpY2Uub2ZmbGluZUl0aW5lcmFyeSkuc3Vic2NyaWJlKChyZXM6SXRpbmVyYXJ5KSA9PntcclxuICAgICAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgICAgICB0aGlzLm9mZmxpbmVJdGluZXJhcnk9cmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LChlcnI6YW55KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb2ZmbGluZSBpdGluZXJhcnkgZXJyPT0+JyxlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgXHJcbiAgICApfVxyXG4gICAgfSlcclxuICAgIFxyXG4gXHJcbn1cclxuLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0gc291cmNlIFxyXG4gKiBAcGFyYW0gbGFuZ0NvZGUgXHJcbiAqIEBwYXJhbSBwaG9uZWNvdW50cnljb2RlIFxyXG4gKiBAcmV0dXJucyBpdCBzZW5kIHRoZSByZXF1ZXN0IG9mIGJvb2sgb2ZmZXIgZm9ybSB3aXRoIHRoZSBodHRwIGhlYWRlcnMgd2hpY2ggYXJlIHRoZSBwYXNzZWRcclxuICogIHBhcmFtZXRlcnMgYW5kIHdpdGggdGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QgaW4gdHlwZSBvZiAoQm9va2VkT2ZmZXIpXHJcbiAqL1xyXG5ib29rT2ZmZXIoc291cmNlOnN0cmluZyxsYW5nQ29kZTpzdHJpbmcscGhvbmVjb3VudHJ5Y29kZTpzdHJpbmcpe1xyXG5sZXQgb2ZmZXJJZD10aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldChcImlkXCIpO1xyXG5pZih0aGlzLm9mZmVyQ2hlY2tPdXRGb3JtLnZhbGlkKXtcclxubGV0IEJvZHk6IEJvb2tlZE9mZmVyID0ge1xyXG4gIEVtYWlsOiB0aGlzLm9mZmVyQ2hlY2tPdXRGb3JtLnZhbHVlW1wiRW1haWxcIl0hLFxyXG4gIEZ1bGxOYW1lOiB0aGlzLm9mZmVyQ2hlY2tPdXRGb3JtLnZhbHVlW1wiRnVsbE5hbWVcIl0hLFxyXG4gIE5hdGlvbmFsaXR5OiB0aGlzLm9mZmVyQ2hlY2tPdXRGb3JtLnZhbHVlW1wiTmF0aW9uYWxpdHlcIl0hLFxyXG4gIFBob25lTnVtYmVyOiB0aGlzLm9mZmVyQ2hlY2tPdXRGb3JtLnZhbHVlW1wiUGhvbmVOdW1iZXJcIl0hLFxyXG4gIFBob25lQ291bnRyeUNvZGU6IHBob25lY291bnRyeWNvZGUsXHJcbiAgU2VsZWN0ZWRPZmZlckNvZGU6TnVtYmVyKG9mZmVySWQpLFxyXG59O1xyXG50aGlzLnN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgdGhpcy5hcGkuQm9va09mZmVycyhzb3VyY2UsbGFuZ0NvZGUhLEJvZHksb2ZmZXJJZCEpLnN1YnNjcmliZSgocmVzOkJvb2tlZE9mZmVyKT0+e1xyXG4gICAgaWYgKHJlcyl7XHJcbiAgICAgIHRoaXMuc3VibWl0dGVkRm9ybT1yZXM7XHJcbiAgICB9XHJcbiAgfSwoZXJyOmFueSk9PntcclxuICAgIGNvbnNvbGUubG9nKCdCb29rIG9mZmVyIGVycj09PicsZXJyKTtcclxuICAgIH0pXHJcbilcclxuXHJcbn1lbHNle1xyXG4gIHJldHVybjtcclxufVxyXG5cclxufVxyXG4gIC8qKlxyXG4gICAqIHRoaXMgZnVuY3Rpb24gaXMgcmVzcG9uc2libGUgdG8gZGVzdG9yeSBhbnkgb3BlbmVkIHN1YnNjcmlwdGlvbiBvbiB0aGlzIHNlcnZpY2VcclxuICAgKi9cclxuICBkZXN0cm95ZXIoKXtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcclxuICB9XHJcbn1cclxuIl19