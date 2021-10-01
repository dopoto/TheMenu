import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import { loginStarted } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/app.states';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
    }

    signInWithGoogle(): void {
        debugger;
        console.log("Signing in with google!!");
        this.store.dispatch(loginStarted());
    }

    signOut(): void {
        //this.authService.signOutExternal();
    }
}
