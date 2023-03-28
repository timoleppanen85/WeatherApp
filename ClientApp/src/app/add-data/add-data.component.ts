import { Location } from './../Models/location';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  addLocationForm: FormGroup;
  weatherDataForm: FormGroup;
  locations: any = [];
  location: Location;

  constructor(
    private locationService: LocationService,
    private readonly fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe) {
    this.addLocationForm = this.fb.group({
      addLocation: ['']
    });

    this.weatherDataForm = this.fb.group({
      temperature: [''],
      rainAmountMM: [''],
      windSpeed: [''],
      date: [''],
    });

    this.location = {
      Id: 0,
      Name: '',
      Weather: [{
        Temperature: 0,
        Windspeed: 0,
        RainAmountMM: 0,
        Date: "2000-01-01",
      }]
    };
  }

  ngOnInit(): void {
    this.addLocationForm = new FormGroup({
      addLocation: new FormControl('')
    });

    this.weatherDataForm = new FormGroup({
      weatherLocation: new FormControl(''),
      temperature: new FormControl('', [Validators.required]),
      windSpeed: new FormControl('', [Validators.required]),
      rainAmountMM: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    this.getLocations();
  }

  onLocationSubmit() {
    this.locationService.addLocation(this.addLocationForm.value.addLocation).subscribe(res => {
      this.router.navigate(['weather']);
    });
  }

  onWeatherSubmit() {

    this.location.Id = this.weatherDataForm.value.weatherLocation.id;
    this.location.Name = this.weatherDataForm.value.weatherLocation.name;
    this.location.Weather[0] = { 
      Temperature: this.weatherDataForm.value.temperature,
      Windspeed: this.weatherDataForm.value.windSpeed,
      RainAmountMM: this.weatherDataForm.value.rainAmountMM,
      Date: this.datePipe.transform(this.weatherDataForm.value.date, 'yyyy-MM-dd')!};

    this.locationService.addWeatherData({
      Id: this.location.Id,
      Name: this.location.Name,
      Weather: this.location.Weather
    }).subscribe(location => location);

    this.router.navigate(['weather']);
  }

  getLocations() {
    this.locationService.getData()
      .subscribe(res => {
        this.locations = res;
      }
      )
  };
}
