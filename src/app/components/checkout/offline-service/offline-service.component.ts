import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FlightCheckoutService } from 'rp-travel-ui';

@Component({
  selector: 'app-offline-service',
  templateUrl: './offline-service.component.html',
  styleUrls: ['./offline-service.component.scss'],
 
})
export class OfflineServiceComponent implements OnInit {
  public translate = inject(TranslateService)
  public flight = inject(FlightCheckoutService)
  constructor() { }

  ngOnInit(): void {
  }

}
