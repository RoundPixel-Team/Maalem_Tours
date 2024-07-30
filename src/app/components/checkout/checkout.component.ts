import { DOCUMENT, Location } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO } from 'ngx-intl-tel-input';
import { FlightCheckoutService, HomePageService } from 'rp-travel-ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit,OnDestroy {
  
  public flight = inject(FlightCheckoutService) 
  private route = inject(ActivatedRoute)
  public translate = inject(TranslateService)
  public home = inject(HomePageService)
  private router = inject(Router)

  CountryISO = CountryISO;

  checkoutStepNow : number = 1
  phonenumber:string = 'phonenumber'

  showFareBreaker : boolean = false

  subscription = new Subscription()

  scrollToMainForm!: ElementRef<HTMLInputElement>;

  //here is an event listener to handle browser back button from checkout step 2
  @HostListener('window:popstate',['$event'])
    onPopState() {
      this.checkoutStepNow = 1;
    }
    
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private location: Location,) { }
  

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((params)=>{
        this.flight.getSelectedFlightData(params["sid"].split('_')[0],+params["sequenceNum"],params["providerKey"]?params["providerKey"]:params["pkey"],false,params["sid"].split('_')[1])
          this.flight.getAllOfflineServices(params["sid"].split('_')[0],'KW',true)
        this.flight.pcc = String(params["sid"]).split('_')[1]
        if(params["wego_click_id"]){localStorage.setItem("click_id", params["wego_click_id"]);}
      })

      
    )

    this.subscription.add(this.flight.paymentLink.subscribe((res:any)=>{
      console.log("show me payment link",res)
      if(res){
        window.location.href = res.link; 
      }
    }))
    this.subscription.add(this.flight.selectedFlightLang.subscribe((res:any)=>{
      this.handleLangChange(res);
    }))

    
  }
  handleLangChange(currentLang:string){
    this.translate.use(currentLang)
    setTimeout(() => {
      if(this.translate.currentLang=='en'){
      
        this.document.dir='ltr';

      }else {
        this.document.dir='rtl';
      }
      localStorage.setItem('lang',currentLang)
      this.home.getPointOfSale();
      this.home.getCountries(this.translate.currentLang)
    },300)
  }
  changeCheckoutStep(event:number){
    if(event == -1){
      this.invalidPhone()
      document.getElementById('mainFormSection')!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }else{
      this.checkoutStepNow = event
    }
    
  }
  //  valdidate phone component by chaning css 
  invalidPhone() {
    let phone: FormGroup = (<FormGroup>((<FormArray>this.flight.usersForm.get("users"))["controls"][0]));
    if (phone.get('phoneNumber')!.invalid && (phone.get('phoneNumber')!.touched || phone.get('phoneNumber')!.dirty)) {
      this.phonenumber = "alert";
    } else {
      this.phonenumber = "phonenumber";
    }
  }

  fareBreakupWindow(val:boolean){
    this.showFareBreaker = val
  }


  goToHomePage(){
    this.router.navigate(['/'])
  }

  CalculateFormseHeight(){
    if(document.getElementById('passengersFormSection') && document.getElementById('passengersFormSection') != null){
      // if(document.getElementById('passengersFormSection')!.offsetHeight > 2000){
      //   return document.getElementById('passengersFormSection')!.offsetHeight - 1500
      // }
      // else if(document.getElementById('passengersFormSection')!.offsetHeight > 1000){
      //   return document.getElementById('passengersFormSection')!.offsetHeight - 750
      // }
      // else{
        return (document.getElementById('passengersFormSection')!.scrollHeight -  250) 
      // }
      
    }else{
      return 50
    }
    
  }

  goToNextStep(){
    if(this.flight.usersArray.at(0).get('email')?.status == 'INVALID' || this.flight.usersArray.at(0).get('phoneNumber')?.status == 'INVALID'){
      this.flight.usersArray.at(0).get('email')?.markAsTouched()
      this.flight.usersArray.at(0).get('phoneNumber')?.markAsTouched()
      this.changeCheckoutStep(-1)
    }else{
      this.location.go('/checkout/step2');
      this.changeCheckoutStep(2)
    }
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.flight.destroyer()
  }
  


}
