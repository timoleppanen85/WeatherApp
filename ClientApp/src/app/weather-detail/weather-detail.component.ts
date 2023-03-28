import { Weather } from './../Models/weather';
import { Location } from '../Models/location';
import { LocationService } from './../location.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent {

  locationId: any = 0;
  weatherId: number = 0;
  location: any;
  chart: any;
  labels: String[] = [];
  datasets: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.locationId = params.get('id');
      this.locationService.getLocationData(this.locationId).subscribe(res => {
        this.location = res;

        this.location.weather.forEach((element: any) => {
          this.labels.push(element.date)
          this.datasets.push(element.temperature)
        });
        // Reverse arrays for chart to display data from left to right
        this.labels.reverse();
        this.datasets.reverse();
        this.createChart();
      });
    });
  }

  createChart() {

    this.chart = new Chart("chart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Temperature',
            data: this.datasets,
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  deleteLocation(id: number) {
    this.locationService.deleteLocation(id).subscribe();
    this.router.navigate(['weather']);
  }

  deleteWeather(id: number, weatherId: number) {
    this.locationService.deleteWeatherData(id, weatherId).subscribe();

    // Refresh weather data
    this.locationService.getLocationData(this.locationId).subscribe(res => {
      this.location = res;

      // If last element was deleted, redirect to frontpage
      if (this.location.weather.length < 1) {
        this.router.navigate(['weather']);
      }
    });
  }
}