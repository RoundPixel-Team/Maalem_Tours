import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvironmentService, airPorts } from 'rp-travel-ui';
import { destinationCard } from 'src/app/components/top-destination/interface';
import airporten from "src/assets/airports/airporten.json";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public http = inject(HttpClient);
  public environment = inject(EnvironmentService);
  cities: airPorts[] = airporten;
  landCity: string='';
  constructor() { 
  }
  getTopDestination(){
    const Api= `${this.environment.searchflow}/api/FlightsTopDistinations/GetAll`
    return this.http.get<destinationCard>(Api);

  }
}
