import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Chart } from 'chart.js';
import { Http } from '@angular/http';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { WeatherService } from '../weather.service';

import 'rxjs/add/operator/delay';

import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  chart: any;

  constructor(private _weather: WeatherService, private location: Location, private router: Router, private http: Http, private matIconRegistry: MatIconRegistry, private _location: Location, private domSanitizer: DomSanitizer) {}
   
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  ngOnInit() {

    setTimeout(() => {
      this.setDistrictList();
    }, 8000);    
  }

  setDistrictList() {
    // this._weather.dailyForecast().pipe(delay(5000))
    //   .subscribe(res => {
    this._weather.dailyForecast().pipe(takeUntil(this.destroy$))
    .subscribe(res => {
    
      
      let temp_max = res['list'].map(res => res.main.temp_max)
      let temp_min = res['list'].map(res => res.main.temp_min)
      let alldates = res['list'].map(res => res.dt)

      let weatherDates = []
      alldates.forEach((res) => {
        let jsdate = new Date(res * 1000)
        weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
      })

      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_max,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: temp_min,
              borderColor: '#ffcc00',
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })

    })
  }

  dashboard() {
    this.ngOnDestroy;
    this.router.navigate(['homepage']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

}
