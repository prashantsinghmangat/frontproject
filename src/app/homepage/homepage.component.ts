import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Http } from '@angular/http';

import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { GeneralService } from 'src/app/general.service';
import { MatTableDataSource } from '@angular/material/table';

import 'rxjs/add/operator/delay';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { rsapublicKey } from 'src/app/global';
// import { JSEncrypt } from 'jsencrypt';

export interface District {
  serialNumber: number;
  districtName: number;
  // status: number;
  // modify: string;
  districtId: String;
  mhrbName: String;
  districtCode: String;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  baseurl = environment.cors;

  ELEMENT_DATA_RESPONSE;
  districtName: string;
  dataSource = new MatTableDataSource<District>();
  displayedColumns: string[];
  distarray: any = [];
  arrObj: any;

  destroy$: Subject<boolean> = new Subject<boolean>();


  ngOnInit() {
    setTimeout(() => {
      this.setDistrictList();
    }, 8000);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  constructor(public dialog: MatDialog, private location: Location, private router: Router, private http: Http) { }

  setDistrictList() {
    // new GeneralService(this.http).getDistrictList().pipe(delay(5000)).subscribe(response => {
    new GeneralService(this.http).getDistrictList().pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.ELEMENT_DATA_RESPONSE = response.status;
      this.distarray = response.json();
      if (response.status === 200) {
        let localDataSource: District[] = [];
        for (let i = 0; i < this.distarray.length; i++) {
          this.arrObj = this.distarray[i];
          localDataSource[i] = { serialNumber: i + 1, districtName: this.arrObj.districtName, districtCode: this.arrObj.districtCode, mhrbName: this.arrObj.mhrbName, districtId: this.arrObj.districtId };
        }
        this.dataSource.data = localDataSource;
        this.displayedColumns = ['serialNumber', 'districtName', 'districtCode', 'mhrbName'];

      } else {
        alert('unable to load data');
      }
    }, (error) => {
      const errorResponse = error.json();
    });
  }

  goBack() {
    this.location.back();
  }

  dashboard() {
    this.ngOnDestroy;
    this.router.navigate(['secondpage']);
  }

}
