import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { hydrateManagerDemo } from 'src/app/core/store/actions/hydration.actions';
import { managerDemoStart } from 'src/app/core/store/actions/manager-demo.actions';

import { AppState } from 'src/app/core/store/app.state';

@Component({
    selector: 'app-start-demo',
    templateUrl: './start-demo.component.html',
    styleUrls: ['./start-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartDemoComponent implements OnInit {
    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {}

    startDemo() {
        // trigger state change
        // redirect to demo route
        this.store.dispatch(hydrateManagerDemo());
    }
}
