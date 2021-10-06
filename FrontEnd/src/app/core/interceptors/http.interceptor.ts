// import { Injectable } from '@angular/core';
// import {
//     HttpEvent,
//     HttpHandler,
//     HttpInterceptor,
//     HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { ConfigurationService } from '../services/configuration/configuration.service';

// @Injectable()
// export class AppHttpInterceptor implements HttpInterceptor {
//     constructor(public configurationService: ConfigurationService) {}

//     intercept(
//         req: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         const apiReq = req.clone({ url: `${this.configurationService.configuration.apiEndpoint}/${req.url}` });
//         console.log('apiReq:' + req.url);
//         return next.handle(apiReq);
//     }
// }

import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${environment.apiEndpoint}${req.url}` });
        console.log('apiReq:' + req.url);
        return next.handle(apiReq);
    }
}
