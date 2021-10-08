import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
    orders$: Observable<string[]>;

    constructor(public http: HttpClient) {}

    ngOnInit(): void {
        this.orders$ = this.http.get<string[]>('/orders');
    }
}
