import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(public authService: AuthenticationService) {}

    title = 'FrontEnd';
    version = environment.version;
}
