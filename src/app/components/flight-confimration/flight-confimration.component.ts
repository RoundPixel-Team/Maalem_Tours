import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'rp-travel-ui';

@Component({
  selector: 'app-flight-confimration',
  templateUrl: './flight-confimration.component.html',
  styleUrls: ['./flight-confimration.component.scss']
})
export class FlightConfimrationComponent implements OnInit {

  public confirmation = inject(ConfirmationService)
  private route = inject(ActivatedRoute)
  public translate = inject(TranslateService)

  todayDate = new Date()

  constructor() { }

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.has('sid') && this.route.snapshot.queryParamMap.has('HG')){
      this.confirmation.getConfirmationDate(
        this.route.snapshot.queryParamMap.get('sid')!.toString(),
        this.route.snapshot.queryParamMap.get('HG')!.toString(),
        this.route.snapshot.queryParamMap.get('tok')!.toString()
        )
    }
  }

}
