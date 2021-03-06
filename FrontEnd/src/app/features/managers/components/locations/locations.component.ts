import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent implements OnInit {
    locations$: Observable<string[]>;

    constructor(public http: HttpClient) {}

    ngOnInit(): void {
        this.locations$ = this.http.get<string[]>('/locations');
    }
}
