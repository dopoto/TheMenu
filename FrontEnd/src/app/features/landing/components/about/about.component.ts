import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';


import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(http: HttpClient) {
    http
      .get<number>(environment.apiEndpoint + '/diagnose/app-health')
      .pipe(take(1))
      .subscribe({
        next: (data: number) => (this.appHealth = data === 1 ? 'OK' : 'Failed'),
        error: (err) => console.log(err), //TODO
      });

    http
      .get<number>(environment.apiEndpoint + '/diagnose/database-health')
      .pipe(take(1))
      .subscribe({
        next: (data: number) => (this.dbHealth = data === 1 ? 'OK' : 'Failed'),
        error: (err) => console.log(err), //TODO
      });
  }
 
  appHealth = 'Checking...';
  dbHealth = 'Checking...';
}
