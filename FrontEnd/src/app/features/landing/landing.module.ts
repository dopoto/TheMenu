import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent
    ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class LandingModule {}
