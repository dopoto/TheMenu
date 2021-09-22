import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public forecasts?: WeatherForecast[];

  constructor(http: HttpClient) {
    http
      //.get<WeatherForecast[]>(environment.apiEndpoint + '/weatherforecast')
      .get<WeatherForecast[]>('/weatherforecast')
      .subscribe(
        (result) => {
          this.forecasts = result;
        },
        (error) => console.error(error)
      );
  }

  title = 'FrontEnd';
  version = environment.version;
  apiEndpoint = environment.apiEndpoint;
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
