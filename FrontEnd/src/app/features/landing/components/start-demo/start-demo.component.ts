import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-start-demo',
    templateUrl: './start-demo.component.html',
    styleUrls: ['./start-demo.component.scss'],
})
export class StartDemoComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    startDemo() {
        // trigger state change
        // redirect to demo route
    }
}
