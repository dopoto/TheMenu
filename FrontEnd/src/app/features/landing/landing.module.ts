import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        LoginComponent
    ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class LandingModule {}
