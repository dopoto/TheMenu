import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { initDemo } from 'src/app/state/actions/demo.actions';
import { AppState } from 'src/app/state/app.state';
import { DemoSettings } from 'src/app/state/models/demo-settings';

@Component({
    selector: 'app-start-demo',
    templateUrl: './start-demo.component.html',
    styleUrls: ['./start-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartDemoComponent implements OnInit {
    simulateServersActivityCheckbox = new FormControl(true);
    simulateCustomersActivityCheckbox = new FormControl(true);

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {}

    startDemo() {
        // trigger state change
        // redirect to demo route
        const demoSettings: DemoSettings = {
            simulateCustomersActivity: this.simulateCustomersActivityCheckbox
                .value
                ? true
                : false,
            simulateServersActivity: this.simulateServersActivityCheckbox.value
                ? true
                : false,
        };
        this.store.dispatch(initDemo({ demoSettings }));
    }
}
