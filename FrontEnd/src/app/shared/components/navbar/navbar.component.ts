import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';
import { filter, Observable } from 'rxjs';
import { AuthData } from 'src/app/core/models/auth-data';
import { AuthState } from 'src/app/core/models/auth-state';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LogIn } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/app.states';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    public user: SocialUser;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        //TODO unsubscribe
        // this.authService.authChanged$
        //     .pipe(filter((ad) => ad.state === AuthState.SignedInWithGoogle))
        //     .subscribe({
        //         next: (res) => {
        //             this.user = <SocialUser>res.data;
        //         },
        //         error: () => {
        //             this.user = null;
        //         },
        //     });
    }

    signInWithGoogle(): void {
        debugger;
        console.log("Signing in with google!!");
        this.store.dispatch(new LogIn());
    }

    signOut(): void {
        //this.authService.signOutExternal();
    }
}
