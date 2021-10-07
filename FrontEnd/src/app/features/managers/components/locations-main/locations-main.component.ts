import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-locations-main',
    templateUrl: './locations-main.component.html',
    styleUrls: ['./locations-main.component.scss'],
})
export class LocationsMainComponent implements OnInit {
    locations$: Observable<string[]>;

    constructor(public http: HttpClient) {}

    ngOnInit(): void {
        this.locations$ = this.http.get<string[]>('/locations');
    }
}
