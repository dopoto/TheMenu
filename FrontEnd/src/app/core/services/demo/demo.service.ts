import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemoData } from 'api/generated-models';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AppState } from '../../store/app.state';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class DemoService {
    constructor(public logService: LogService, private http: HttpClient) {}

    getDemoData$(): Observable<AppState> {
        const demoData$ = this.http.get<DemoData>('/demo', {});
        return demoData$.pipe(
            map((res) => {
                const demoData = {
                    auth: {
                        isAuthenticated: true,
                        isDemo: true,
                        user: {
                            provider: 'DEMO',
                            id: '1234',
                            email: res.email,
                            name: 'Demo McManager',
                            photoUrl: 'assets/images/demo-face-1.jfif',
                            firstName: 'Demo',
                            lastName: 'McManager',
                            authToken: '',
                            idToken: '',
                            authorizationCode: '',
                            response: '',
                        },
                        notificationId: '[Auth] Login Success',
                    },
                    meta: {
                        appVersion: 'DEMO',
                        stateVersion: '1',
                        initializedOn: new Date('2021-10-20T04:00:17.100Z'),
                    },
                } as AppState;
                return demoData;
            })
        );
    }
}
