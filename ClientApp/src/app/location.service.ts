import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from './Models/weather';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<Location> {
    return this.http.get<Location>(this.apiUrl);
  }

  getLocationData(id: number): Observable<Location> {
    return this.http.get<Location>(this.apiUrl + id);
  }

  addLocation(location: string): Observable<Location> {
    return this.http.post<Location>(this.apiUrl + location, {});
  }

  addWeatherData(location: any): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }

  deleteWeatherData(id: number, weatherId: number): Observable<any> {
    return this.http.delete(this.apiUrl + id + '/' + weatherId);
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }
}
