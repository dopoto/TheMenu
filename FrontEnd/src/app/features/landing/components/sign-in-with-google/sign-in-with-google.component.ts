import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
    selector: 'app-sign-in-with-google',
    templateUrl: './sign-in-with-google.component.html',
    styleUrls: ['./sign-in-with-google.component.scss'],
})
export class SignInWithGoogleComponent implements OnInit {
    sub1: Subscription;
    sub2: Subscription;

    googleIdToken = '';
    isAuthenticatedOnBackend = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService
    ) {}

    ngOnInit() {
        this.sub1 = this.activatedRoute.paramMap.subscribe((params) => {
            this.googleIdToken = params.get('googleidtoken');
            const socialUser = {
                provider: 'GOOGLE',
                idToken: this.googleIdToken,
            } as SocialUser;
            this.sub2 = this.authService
                .validateExternalAuth$(socialUser)
                .subscribe((res) => {
                    this.isAuthenticatedOnBackend = true;
                });
        });
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
    }
}
