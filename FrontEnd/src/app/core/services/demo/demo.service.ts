import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppState } from '../../store/app.state';

@Injectable({
    providedIn: 'root',
})
export class DemoService {

    private demoData = <AppState>{
        auth: {
            isAuthenticated: true,
            user: {
                firstName: 'Demo'
            }
        }
    };

    constructor() {}

    getDemoData$() : Observable<AppState>{
        return of(this.demoData as AppState);
    }
}
