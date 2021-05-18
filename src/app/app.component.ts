import { Component } from '@angular/core';

import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  status = 'ONLINE';
  isConnected = true;
}
