import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthenticationService,
        private router: Router
    ) {}

    // effects go here
}
