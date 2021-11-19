import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exitDemo } from 'src/app/state/actions/demo.actions';


import { AppState } from 'src/app/state/app.state';
import { selectIsDemo } from 'src/app/state/selectors/user.selectors';
@Component({
    selector: 'app-demo-mode',
    templateUrl: './demo-mode.component.html',
    styleUrls: ['./demo-mode.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoModeComponent implements OnInit {
    isDemo$: Observable<boolean> | undefined;

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.isDemo$ = this.store.pipe(select(selectIsDemo));
    }

    exitDemo(): void {
        this.store.dispatch(exitDemo());
    }
}
