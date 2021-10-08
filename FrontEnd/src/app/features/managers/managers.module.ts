import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ManagersMainComponent } from './components/managers-main/managers-main.component';
import { LocationsMainComponent } from './components/locations/locations.component';

@NgModule({
    declarations: [
    ManagersMainComponent,
    LocationsMainComponent
  ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class ManagersModule {}