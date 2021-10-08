import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StaffMainComponent } from './components/staff-main/staff-main.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
    declarations: [
    StaffMainComponent,
    OrdersComponent
  ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class StaffModule {}
