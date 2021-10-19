import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './features/landing/components/about/about.component';
import { HomeComponent } from './features/landing/components/home/home.component';
import { DashboardComponent } from './features/managers/components/dashboard/dashboard.component';
import { StaffMainComponent } from './features/staff/components/staff-main/staff-main.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoginComponent } from './features/landing/components/login/login.component';
import { SignInWithGoogleComponent } from './features/landing/components/sign-in-with-google/sign-in-with-google.component';
import { TablesComponent } from './features/managers/components/tables/tables.component';
import { MenusComponent } from './features/managers/components/menus/menus.component';
import { ServersComponent } from './features/managers/components/servers/servers.component';
import { TablesAddEditComponent } from './features/managers/components/tables-add-edit/tables-add-edit.component';
import { StartDemoComponent } from './features/landing/components/start-demo/start-demo.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'start-demo', component: StartDemoComponent },
    {
        path: 'sign-in-with-google/:googleidtoken',
        component: SignInWithGoogleComponent,
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'managers',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Owner'] },
    },
    {
        path: 'managers/tables',
        component: TablesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Owner'] },
    },
    {
        path: 'managers/tables/add-edit',
        component: TablesAddEditComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Owner'] },
    },
    {
        path: 'managers/menus',
        component: MenusComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Owner'] },
    },
    {
        path: 'managers/servers',
        component: ServersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Owner'] },
    },
    {
        path: 'staff',
        component: StaffMainComponent,
        canActivate: [AuthGuard],
        data: { roles: ['StaffMember'] },
    },
    { path: 'about', component: AboutComponent },
    // TODO { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
    { path: '**', redirectTo: '/' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
