import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './features/landing/components/about/about.component';
import { HomeComponent } from './features/landing/components/home/home.component';
import { ManagersMainComponent } from './features/managers/components/managers-main/managers-main.component';
import { StaffMainComponent } from './features/staff/components/staff-main/staff-main.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoginComponent } from './features/landing/components/login/login.component';
import { SignInWithGoogleComponent } from './features/landing/components/sign-in-with-google/sign-in-with-google.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sign-in-with-google/:googleidtoken', component: SignInWithGoogleComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'managers',
        component: ManagersMainComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Owner'] }
    },
    {
        path: 'staff',
        component: StaffMainComponent,
        canActivate: [AuthGuard],
        data: { roles: ['StaffMember'] }
    },
    { path: 'about', component: AboutComponent },
    // TODO { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
