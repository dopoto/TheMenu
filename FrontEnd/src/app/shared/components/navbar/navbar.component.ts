import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';

import {
    loginStarted,
    logoutStarted,
} from 'src/app/core/store/actions/auth.actions';
import { AppState } from 'src/app/core/store/app.state';
import { selectAuthUser } from 'src/app/core/store/selectors/user.selectors';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
    user$: Observable<SocialUser> | undefined;

    constructor(private readonly store: Store<AppState>) {}

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(selectAuthUser));
    }

    signInWithGoogle(): void {
        this.store.dispatch(loginStarted());
    }

    signOut(): void {
        this.store.dispatch(logoutStarted());
    }
}
