import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  options;
  headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': environment.cors });

  constructor(private http: Http) { }

  getDistrictList() {
    return this.http.get(environment.baseUrl + '/config/getDistrictList/1');
  }

}
