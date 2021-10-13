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
        const endpoint = req.url.includes('/assets/')
            ? environment.assetsUrl
            : environment.apiEndpoint;
        const apiReq = req.clone({
            url: `${endpoint}${req.url}`,
        });
        return next.handle(apiReq);
    }
}
