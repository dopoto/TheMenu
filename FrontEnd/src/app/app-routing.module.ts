import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './features/landing/components/about/about.component';
import { HomeComponent } from './features/landing/components/home/home.component';
import { ManagersMainComponent } from './features/managers/managers-main/managers-main.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoginComponent } from './features/landing/components/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'managers',
        component: ManagersMainComponent,
        canActivate: [AuthGuard],
    },
    { path: 'about', component: AboutComponent },
    // TODO { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
