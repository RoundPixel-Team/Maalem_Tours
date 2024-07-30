import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule} from '@angular/material/select';
import { RpTravelUiModule } from 'rp-travel-ui';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { SearchBoxComponent } from '../components/searchBox/searchBox.component';
import { OneWayComponent } from '../components/searchBox/one-way/one-way.component';
import { RoundTripComponent } from '../components/searchBox/round-trip/round-trip.component';
import { MultiCityComponent } from '../components/searchBox/multi-city/multi-city.component';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchboxMobileComponent } from '../components/searchBox/searchbox-mobile/searchbox-mobile.component';
import { TravellersComponent } from '../components/searchBox/travellers/travellers.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TopDestinationComponent } from '../components/top-destination/top-destination.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSliderModule} from '@angular/material/slider';
import { MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';


export const MatrialComponents = [
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSliderModule,
  MatRadioModule,
  MatProgressBarModule,
  MatExpansionModule,
]

export const SharedComponents = [
  HeaderComponent,
  FooterComponent,
  SearchBoxComponent,
  SearchboxMobileComponent,
  TopDestinationComponent,
  TravellersComponent,
  OneWayComponent,
  RoundTripComponent,
  MultiCityComponent,
  LoginComponent,
  SignupComponent
]

@NgModule({
  declarations: [
    SharedComponents,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    RpTravelUiModule,
    NgbDatepickerModule,
    NgbAlertModule,
    RouterModule,
    MatrialComponents,
    NgbTooltipModule
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatrialComponents,
    SharedComponents,
    RpTravelUiModule,
    NgbDatepickerModule,
    NgbAlertModule,
    RouterModule,
    TranslateModule,
    NgbTooltipModule
  ]
})
export class SharedModule { }