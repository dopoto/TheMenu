import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AppState } from '../../store/app.state';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class DemoService {

    constructor(public logService: LogService, private http: HttpClient) {}
 
    getDemoData$() : Observable<AppState>{
        const endPoint = environment.assetsUrl +  '/assets/demos/manager-demo.json'
        return this.http.get<AppState>(endPoint);
    }
}
