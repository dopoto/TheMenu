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
        const newUrl = { url: environment.apiEndpoint + req.url };
        req = Object.assign(req, newUrl);
        console.log('env:[' + environment.apiEndpoint + ']|hinter:' + req.url);
        return next.handle(req);
    }
}
