# frontproject

# tableAndPiechart-Frontend

**Demo video: https://drive.google.com/drive/folders/1pLUXIql-bqQwpH7p8_thbfuQjcknooEU?usp=sharing**

This is a test project to demonstrate Table and Piechart API calls. It contains all of the specs from Angular's test guide as well as some extras.

Get started
Clone the repo
git clone https://github.com/prashantsinghmangat/tableAndPiechart-Frontend/tree/master
cd tableAndPiechart-Frontend

Install npm packages
Install the npm packages described in the package.json and verify that it works:

**npm install**

**ng serve**

The npm start command builds (compiles TypeScript and copies assets) the application into dist/, watches for changes to the source files, and runs lite-server on port 4200.

Shut it down manually with Ctrl-C.

npm scripts
These are the most useful commands defined in package.json:

npm serve - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".

**If you face chart 00 problem while build try to remove 00 from the file:**

![chart 00 remove](https://user-images.githubusercontent.com/38403791/118357363-6559b880-b597-11eb-8cf7-eb8c65cde784.PNG)

**TIME SET FOR API IS 8 SECONDS**

**API WILL DESTROY ONCE BUTTON CLICKS**

**code used for time delay API:**

**Sample after compile:**
![table api call](https://user-images.githubusercontent.com/38403791/118358751-e9af3a00-b59d-11eb-9c1b-814645c6cd8e.PNG)

![piechart image](https://user-images.githubusercontent.com/38403791/118358757-efa51b00-b59d-11eb-9c43-0a71d429e147.PNG)

```ts
ngOnInit() {
    setTimeout(() => {
      this.setDistrictList();
    }, 8000);
  }
```

**code used for time destroy API:**

```ts
ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
  
  new GeneralService(this.http).getDistrictList()**.pipe(takeUntil(this.destroy$))**.subscribe(response => {
```
**Code used for Table creation in HTML:**
```ts
<div>
            <table mat-table [dataSource]="dataSource">
                <ng-container matColumnDef="serialNumber">
                    <th mat-header-cell *matHeaderCellDef>Sr No.</th>
                    <td mat-cell *matCellDef="let element"> {{element.serialNumber}} </td>
                </ng-container>
                <ng-container matColumnDef="districtName">
                    <th mat-header-cell *matHeaderCellDef>District Name</th>
                    <td mat-cell *matCellDef="let element"> {{element.districtName}} </td>
                </ng-container>

                <ng-container matColumnDef="mhrbName">
                    <th mat-header-cell *matHeaderCellDef>Mhrb Name</th>
                    <td mat-cell *matCellDef="let element"> {{element.mhrbName}} </td>
                </ng-container>

                <ng-container matColumnDef="districtCode">
                    <th mat-header-cell *matHeaderCellDef>District Code</th>
                    <td mat-cell *matCellDef="let element"> {{element.districtCode}} </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>


        </div>
```

**Code for fetching Table content From API:**
```ts
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
  ```
  
  **Code for Adding PieChart in HTML:**
```ts
<div>
       <canvas id="canvas">{{ chart }}</canvas>
 </div>
  ```
  
   **Code for fetching PieChart content From API:**
```ts
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
  ```
  
  **If in case of code do not work or any error occurs please let me know
Name: Prashant SinghEmail ID: prashantsinghmangat5@gmail.com  Phone: 9457182128, 8360334018**
