import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { take } from 'rxjs';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(http: HttpClient) {
    http
      .get<number>(environment.apiEndpoint + '/diagnose/app-health')
      .pipe(take(1))
      .subscribe({
        next: (data: number) => (this.appHealth = data),
        error: (err) => console.log(err), //TODO
      });

    http
      .get<number>(environment.apiEndpoint + '/diagnose/database-health')
      .pipe(take(1))
      .subscribe({
        next: (data: number) => (this.dbHealth = data),
        error: (err) => console.log(err), //TODO
      });
  }

  title = 'FrontEnd';
  version = environment.version;
  appHealth: number;
  dbHealth: number;
}
