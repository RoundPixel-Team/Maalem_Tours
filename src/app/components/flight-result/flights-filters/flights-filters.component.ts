import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlightResultService } from 'rp-travel-ui';

@Component({
  selector: 'app-flights-filters',
  templateUrl: './flights-filters.component.html',
  styleUrls: ['./flights-filters.component.scss']
})
export class FlightsFiltersComponent implements OnInit {

  public flightResult = inject(FlightResultService)
  route = inject(ActivatedRoute)
  //format date for slider 
  formatDate(value: number): string {
    let h = value / 60 | 0;
    let m = value % 60 | 0;

    let hourOfday = h > 24?h%24:h;
    let fHourOfday  = hourOfday >12? hourOfday -12 : hourOfday;

    return `${(fHourOfday >= 10) ? fHourOfday.toString():`0${fHourOfday}`}:${(m >=10) ? m.toString():`0${m}`}${(hourOfday+(m/100) > 12) ? `PM`:`AM` }`
  }
  //format for Duration Slider
  formatDuration(value: number): string {
    let h = value / 60 | 0;
    let m = value % 60 | 0;
    return h + "h" + ":" + m + "m";
  }

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.flightResult.code = params['currency'];
      })
  }

  closeMobileSideFilter(){
    document.getElementById("mobileFilterSideNav")!.style.width = "0";
  }
 
}
