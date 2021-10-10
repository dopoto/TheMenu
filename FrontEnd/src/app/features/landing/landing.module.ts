import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignInWithGoogleComponent } from './components/sign-in-with-google/sign-in-with-google.component';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        LoginComponent,
        SignInWithGoogleComponent
    ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class LandingModule {}
