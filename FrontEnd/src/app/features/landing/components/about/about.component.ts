import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
//import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {

    version = '';
    appHealth = 'Checking...';
    dbHealth = 'Checking...';

    constructor(http: HttpClient, /*configurationService: ConfigurationService*/) {
        this.version = ''; //configurationService.configuration.version;

        http
            .get<number>('/diagnose/app-health')
            .pipe(take(1))
            .subscribe({
                next: (data: number) => (this.appHealth = data === 1 ? 'OK' : 'Failed'),
                error: (err) => console.log(err), //TODO
            });

        http
            .get<number>('/diagnose/database-health')
            .pipe(take(1))
            .subscribe({
                next: (data: number) => (this.dbHealth = data === 1 ? 'OK' : 'Failed'),
                error: (err) => console.log(err), //TODO
            });
    }
}
