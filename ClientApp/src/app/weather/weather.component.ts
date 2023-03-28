import { LocationService } from './../location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  locations: any = [];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getData()
    .subscribe(res => {
      this.locations = res;
    }
  )};

}
