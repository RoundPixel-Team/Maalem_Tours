import { Component, OnInit,inject } from '@angular/core';
import { FlightResultService } from 'rp-travel-ui';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  FlightResult= inject(FlightResultService)

  constructor() { }

  ngOnInit(): void {
    this.FlightResult.destroyer()
  }

}
