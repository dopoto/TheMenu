import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtHelper: JwtHelperService,
        private router: Router,
        private authService: AuthenticationService,
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const token = localStorage.getItem('token');

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return this.authService.hasCurentUserAMatchingRole( route.data.roles);
        }

        const isRefreshSuccess = await this.authService.tryRefreshingTokens(token);
        if (!isRefreshSuccess) {
            this.router.navigate(['login']);
        }

        return this.authService.hasCurentUserAMatchingRole( route.data.roles);
    }
}
