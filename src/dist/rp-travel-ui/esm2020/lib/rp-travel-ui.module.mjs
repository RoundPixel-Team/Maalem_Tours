import { NgModule } from '@angular/core';
import { RpTravelUiComponent } from './rp-travel-ui.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodToCityPipe } from './shared/pipes/cod-to-city.pipe';
import { CouncodePipe } from './shared/pipes/councode.pipe';
import { DurationToHourMinPipe } from './shared/pipes/duration-to-hour-min.pipe';
import { FilterCityPipe } from './shared/pipes/filter-city.pipe';
import { HighlighterPipe } from './shared/pipes/highlighter.pipe';
import { HotelecitesPipe } from './shared/pipes/hotelecites.pipe';
import { HourMinutePipe } from './shared/pipes/hour-minute.pipe';
import { LimitToPipe } from './shared/pipes/limit-to.pipe';
import { ExchangePipe } from './shared/pipes/exchange.pipe';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
export class RpTravelUiModule {
}
RpTravelUiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RpTravelUiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, declarations: [RpTravelUiComponent,
        CodToCityPipe,
        CouncodePipe,
        DurationToHourMinPipe,
        FilterCityPipe,
        HighlighterPipe,
        HotelecitesPipe,
        HourMinutePipe,
        LimitToPipe,
        ExchangePipe], imports: [HttpClientModule,
        ReactiveFormsModule,
        FormsModule], exports: [RpTravelUiComponent,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CodToCityPipe,
        CouncodePipe,
        DurationToHourMinPipe,
        FilterCityPipe,
        HighlighterPipe,
        HotelecitesPipe,
        HourMinutePipe,
        LimitToPipe,
        ExchangePipe] });
RpTravelUiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, providers: [HttpClient, DatePipe], imports: [HttpClientModule,
        ReactiveFormsModule,
        FormsModule, HttpClientModule,
        ReactiveFormsModule,
        FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RpTravelUiModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        RpTravelUiComponent,
                        CodToCityPipe,
                        CouncodePipe,
                        DurationToHourMinPipe,
                        FilterCityPipe,
                        HighlighterPipe,
                        HotelecitesPipe,
                        HourMinutePipe,
                        LimitToPipe,
                        ExchangePipe
                    ],
                    imports: [
                        HttpClientModule,
                        ReactiveFormsModule,
                        FormsModule,
                    ],
                    exports: [
                        RpTravelUiComponent,
                        HttpClientModule,
                        ReactiveFormsModule,
                        FormsModule,
                        CodToCityPipe,
                        CouncodePipe,
                        DurationToHourMinPipe,
                        FilterCityPipe,
                        HighlighterPipe,
                        HotelecitesPipe,
                        HourMinutePipe,
                        LimitToPipe,
                        ExchangePipe
                    ],
                    providers: [HttpClient, DatePipe]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnAtdHJhdmVsLXVpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3JwLXRyYXZlbC11aS9zcmMvbGliL3JwLXRyYXZlbC11aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDakYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQXdDM0MsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQWxDekIsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLGNBQWM7UUFDZCxlQUFlO1FBQ2YsZUFBZTtRQUNmLGNBQWM7UUFDZCxXQUFXO1FBQ1gsWUFBWSxhQUdaLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsV0FBVyxhQUlYLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLFdBQVc7UUFDWCxhQUFhO1FBQ2IsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixjQUFjO1FBQ2QsZUFBZTtRQUNmLGVBQWU7UUFDZixjQUFjO1FBQ2QsV0FBVztRQUNYLFlBQVk7OEdBSUgsZ0JBQWdCLGFBRmpCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxZQXBCOUIsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixXQUFXLEVBS1gsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixXQUFXOzJGQWFGLGdCQUFnQjtrQkFwQzVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixZQUFZO3dCQUNaLHFCQUFxQjt3QkFDckIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxXQUFXO3dCQUNYLFlBQVk7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQixXQUFXO3FCQUVaO29CQUNELE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixxQkFBcUI7d0JBQ3JCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsV0FBVzt3QkFDWCxZQUFZO3FCQUNiO29CQUNELFNBQVMsRUFBQyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7aUJBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUnBUcmF2ZWxVaUNvbXBvbmVudCB9IGZyb20gJy4vcnAtdHJhdmVsLXVpLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb2RUb0NpdHlQaXBlIH0gZnJvbSAnLi9zaGFyZWQvcGlwZXMvY29kLXRvLWNpdHkucGlwZSc7XHJcbmltcG9ydCB7IENvdW5jb2RlUGlwZSB9IGZyb20gJy4vc2hhcmVkL3BpcGVzL2NvdW5jb2RlLnBpcGUnO1xyXG5pbXBvcnQgeyBEdXJhdGlvblRvSG91ck1pblBpcGUgfSBmcm9tICcuL3NoYXJlZC9waXBlcy9kdXJhdGlvbi10by1ob3VyLW1pbi5waXBlJztcclxuaW1wb3J0IHsgRmlsdGVyQ2l0eVBpcGUgfSBmcm9tICcuL3NoYXJlZC9waXBlcy9maWx0ZXItY2l0eS5waXBlJztcclxuaW1wb3J0IHsgSGlnaGxpZ2h0ZXJQaXBlIH0gZnJvbSAnLi9zaGFyZWQvcGlwZXMvaGlnaGxpZ2h0ZXIucGlwZSc7XHJcbmltcG9ydCB7IEhvdGVsZWNpdGVzUGlwZSB9IGZyb20gJy4vc2hhcmVkL3BpcGVzL2hvdGVsZWNpdGVzLnBpcGUnO1xyXG5pbXBvcnQgeyBIb3VyTWludXRlUGlwZSB9IGZyb20gJy4vc2hhcmVkL3BpcGVzL2hvdXItbWludXRlLnBpcGUnO1xyXG5pbXBvcnQgeyBMaW1pdFRvUGlwZSB9IGZyb20gJy4vc2hhcmVkL3BpcGVzL2xpbWl0LXRvLnBpcGUnO1xyXG5pbXBvcnQgeyBFeGNoYW5nZVBpcGUgfSBmcm9tICcuL3NoYXJlZC9waXBlcy9leGNoYW5nZS5waXBlJztcclxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgUnBUcmF2ZWxVaUNvbXBvbmVudCxcclxuICAgIENvZFRvQ2l0eVBpcGUsXHJcbiAgICBDb3VuY29kZVBpcGUsXHJcbiAgICBEdXJhdGlvblRvSG91ck1pblBpcGUsXHJcbiAgICBGaWx0ZXJDaXR5UGlwZSxcclxuICAgIEhpZ2hsaWdodGVyUGlwZSxcclxuICAgIEhvdGVsZWNpdGVzUGlwZSxcclxuICAgIEhvdXJNaW51dGVQaXBlLFxyXG4gICAgTGltaXRUb1BpcGUsXHJcbiAgICBFeGNoYW5nZVBpcGVcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcblxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgUnBUcmF2ZWxVaUNvbXBvbmVudCxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBDb2RUb0NpdHlQaXBlLFxyXG4gICAgQ291bmNvZGVQaXBlLFxyXG4gICAgRHVyYXRpb25Ub0hvdXJNaW5QaXBlLFxyXG4gICAgRmlsdGVyQ2l0eVBpcGUsXHJcbiAgICBIaWdobGlnaHRlclBpcGUsXHJcbiAgICBIb3RlbGVjaXRlc1BpcGUsXHJcbiAgICBIb3VyTWludXRlUGlwZSxcclxuICAgIExpbWl0VG9QaXBlLFxyXG4gICAgRXhjaGFuZ2VQaXBlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6W0h0dHBDbGllbnQsIERhdGVQaXBlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUnBUcmF2ZWxVaU1vZHVsZSB7IH1cclxuIl19