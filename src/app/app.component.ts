import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, inject,OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentService, HomePageService } from 'rp-travel-ui';
import airporten from "src/assets/airports/airporten.json"; 
import airportar from "src/assets/airports/airportar.json"; 
import { SharedService } from './shared/services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public translate = inject(TranslateService)
  public home = inject(HomePageService)
  public environment = inject(EnvironmentService);
  private sharedService = inject(SharedService);
  title = 'Maalem-Tours';
   currentURL = location.href;

  // Define the checkout URL you want to check against
   checkoutURL = "checkout";
  /**
   *
   */
  constructor(@Inject(DOCUMENT) private document: Document) {

      let envMaalemTours = {
          offlineSeats:"http://41.223.55.14:7025",
          searchflow:  'https://flightsearch.wghat.com',
          BookingFlow:  'https://flightflow.wghat.com',
          FareRules:  'https://flightprov.wghat.com',
          asm:  'https://backofficeapi.wghat.com',
          Apihotels:  "https://hotels.Tazkrticom",
          hotelprepay: 'https://prepayapi.wghat.com',
          users:  'https://usersapi.wghat.com',
          admin:  'https://adminapi.wghat.com/',
          getDPayment:  'https://adminapi.wghat.com/',
          bookHotels: "https://hotels.wghat.com",
          backOffice: 'https://backofficeapi.wghat.com',
          FlightTop:'https://flightsearch.wghat.com',
          prepay: 'https://prepayapi.wghat.com',
          offers: {
            getAll: 'http://41.215.243.36:7893/api/GetAllOffersAPI?POS=',
            getByID: 'http://41.215.243.36:7893/api/GetOfferByIdAPI?OfferId=',
            BookOffer: "http://41.215.243.36:7895/api/BookOffer",
            RetriveItineraryDetails:'/api/Admin/RetriveItineraryDetails'
          }
      }
      let envWego = {
        offlineSeats:"http://178.63.214.219:7025",
        searchflow:  'https://wegosearch.wghat.com',
        BookingFlow:  'https://wegobook.wghat.com',
        FareRules:  'https://wegoprovider.wghat.com',
        asm:  'https://backofficeapi.wghat.com',
        Apihotels:  "https://hotels.rhlatycom",
        hotelprepay: 'https://prepayapi.wghat.com',
        users:  'https://usersapi.wghat.com',
        admin:  'https://adminapi.wghat.com/',
        getDPayment:  'https://adminapi.wghat.com/',
        bookHotels: "https://hotels.wghat.com",
        hotelPrepay: 'https://prepayapi.wghat.com',
        backOffice: 'https://backofficeapi.wghat.com',
        FlightTop:'https://flightsearch.wghat.com',
        offers: {
          getAll: 'http://41.215.243.138:7893/api/GetAllOffersAPI?POS=',
          getAllActive:'http://41.215.243.138:7893/api/GetAllActiveOffersAPI?POS=',
          getByID: 'http://41.215.243.138:7893/api/GetOfferByIdAPI?OfferId=',
          BookOffer: "http://41.215.243.138:7895/api/BookOffer",
          RetriveItineraryDetails:'/api/Admin/RetriveItineraryDetails'
        }
      }

    this.environment.envConfiguration(envMaalemTours)
    if (!this.currentURL.includes(this.checkoutURL)) {
      setTimeout(()=>{
        if(localStorage.getItem('lang')){
          this.translate.use(localStorage.getItem('lang')!)
          setTimeout(() => {
            if(this.translate.currentLang=='en'){
              this.document.dir='ltr';
              this.sharedService.cities = airporten;
              
            }else {
              this.document.dir='rtl';
              this.sharedService.cities = airportar;
            }
          },300)
        }else{
          this.translate.use('en');
          this.document.dir='ltr';
          this.sharedService.cities = airporten;
        }
        this.home.getPointOfSale();
        this.home.getCountries(this.translate.currentLang)
      },500)
    }
  
    
  }

  ngOnInit(){
    // if(this.translate.currentLang=='en'){
    //   this.sharedService.cities = airporten;
    // }
    // else{
    //   this.sharedService.cities = airportar;
    // }
  }
  

}
