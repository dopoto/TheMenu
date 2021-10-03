import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ManagersMainComponent } from './managers-main/managers-main.component';

@NgModule({
    declarations: [
    ManagersMainComponent
  ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class ManagersModule {}
