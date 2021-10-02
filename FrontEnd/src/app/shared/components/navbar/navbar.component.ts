import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { loginStarted } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/app.states';
import { selectAuthState } from 'src/app/core/store/selectors/user.selectors';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

    user: SocialUser;
    getState: Observable<any>;

    constructor(private readonly store: Store<AppState>) {this.getState = this.store.select(selectAuthState);}

    ngOnInit(): void {
        this.getState.subscribe((state) => {
            debugger;
            // this.isAuthenticated = state.isAuthenticated;
            // this.user = state.user;
            // this.errorMessage = state.errorMessage;
          });
    }

    signInWithGoogle(): void {
        this.store.dispatch(loginStarted());
    }

    signOut(): void {
        //this.authService.signOutExternal();
    }
}
