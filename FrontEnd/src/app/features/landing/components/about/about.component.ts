import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { ConfigService } from 'src/app/init/services/config/config.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {

    version = '';
    appHealth = 'Checking...';
    dbHealth = 'Checking...';

    constructor(http: HttpClient, configService: ConfigService) {
        this.version = configService.config.version;

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
