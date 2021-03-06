import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationsComponent } from './components/locations/locations.component';
import { TablesComponent } from './components/tables/tables.component';
import { ServersComponent } from './components/servers/servers.component';
import { MenusComponent } from './components/menus/menus.component';
import { TablesTileComponent } from './components/tables-tile/tables-tile.component';
import { MenusTileComponent } from './components/menus-tile/menus-tile.component';
import { ServersTileComponent } from './components/servers-tile/servers-tile.component';
import { ChartTileComponent } from './components/chart-tile/chart-tile.component';
import { OverviewTileComponent } from './components/overview-tile/overview-tile.component';
import { LiveStreamTileComponent } from './components/live-stream-tile/live-stream-tile.component';
import { TileActionsComponent } from './components/tile-actions/tile-actions.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { TablesAddEditComponent } from './components/tables-add-edit/tables-add-edit.component';

@NgModule({
    declarations: [
    DashboardComponent,
    LocationsComponent,
    TablesComponent,
    ServersComponent,
    MenusComponent,
    TablesTileComponent,
    MenusTileComponent,
    ServersTileComponent,
    ChartTileComponent,
    OverviewTileComponent,
    LiveStreamTileComponent,
    TileActionsComponent,
    LocationSelectorComponent,
    TablesAddEditComponent
  ],
    imports: [SharedModule],
    exports: [],
    bootstrap: [],
})
export class ManagersModule {}