import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignInWithGoogleComponent } from './components/sign-in-with-google/sign-in-with-google.component';
import { StartDemoComponent } from './components/start-demo/start-demo.component';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        LoginComponent,
        SignInWithGoogleComponent,
        StartDemoComponent
    ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class LandingModule {}
