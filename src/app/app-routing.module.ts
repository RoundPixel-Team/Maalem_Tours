import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchboxMobileComponent } from './components/searchBox/searchbox-mobile/searchbox-mobile.component';
import { SearchBoxComponent } from './components/searchBox/searchBox.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path:'',
    component:HomePageComponent 
  },
  {
    path:'checkout',
    loadChildren:()  =>import('./components/checkout/checkout.module').then((m)=> m.CheckoutModule) 
  },
  {
    path:'flightResult',
    loadChildren:()  =>import('./components/flight-result/flight-result.module').then((m)=> m.FlightResultModule) 

  },
  {
    path:'confirmation',
    loadChildren:()  =>import('./components/flight-confimration/flight-confimration.module').then((m)=> m.FlightConfimrationModule) 

  },
  {path:"searchboxMob/:index", component:SearchboxMobileComponent},
  {path:"aboutUs",component:AboutUsComponent },
  {path:"termsOfUse",component:TermsOfUseComponent},
  {path:"contactUs",component:ContactUsComponent},
  {path:"privacyPolicy",component:PrivacyPolicyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
