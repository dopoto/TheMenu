import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { hydrateManagerDemoStart } from 'src/app/core/store/actions/hydration.actions';

import { AppState } from 'src/app/core/store/app.state';

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
        this.store.dispatch(
            hydrateManagerDemoStart({
                simulateServersActivity: this.simulateServersActivityCheckbox.value ? true: false,
                simulateCustomersActivity: this.simulateCustomersActivityCheckbox.value ? true : false
            })
        );
    }
}
