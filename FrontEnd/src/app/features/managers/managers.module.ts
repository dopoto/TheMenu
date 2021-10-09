import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ManagersMainComponent } from './components/managers-main/managers-main.component';
import { LocationsComponent } from './components/locations/locations.component';

@NgModule({
    declarations: [
    ManagersMainComponent,
    LocationsComponent
  ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class ManagersModule {}