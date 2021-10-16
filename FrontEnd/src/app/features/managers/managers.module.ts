import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ManagersMainComponent } from './components/managers-main/managers-main.component';
import { LocationsComponent } from './components/locations/locations.component';
import { TablesComponent } from './components/tables/tables.component';
import { ServersComponent } from './components/servers/servers.component';
import { StatsComponent } from './components/stats/stats.component';
import { MenusComponent } from './components/menus/menus.component';
import { OverviewComponent } from './components/overview/overview.component';
import { LiveStreamComponent } from './components/live-stream/live-stream.component';

@NgModule({
    declarations: [
    ManagersMainComponent,
    LocationsComponent,
    TablesComponent,
    ServersComponent,
    StatsComponent,
    MenusComponent,
    OverviewComponent,
    LiveStreamComponent
  ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class ManagersModule {}