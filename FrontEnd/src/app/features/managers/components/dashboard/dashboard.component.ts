import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    CompactType,
    GridsterConfig,
    GridsterItem,
    GridType,
} from 'angular-gridster2';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    options: GridsterConfig;
    dashboard: Array<GridsterItem>;

    constructor() {}

    ngOnInit() {
        this.options = {
            gridType: GridType.Fit,
            compactType: CompactType.None,
            maxCols: 12,
            maxRows: 20,
            pushItems: true,
            draggable: {
                enabled: false,
            },
            resizable: {
                enabled:false,
            },
            fixedRowHeight: 60,
            outerMargin: false,
            
        };

        this.dashboard = [
            { cols: 2, rows: 2, y: 0, x: 0, component: 'tables-tile' },
            { cols: 2, rows: 2, y: 0, x: 2 , component: 'menus-tile'},
            { cols: 2, rows: 2, y: 0, x: 4 , component: 'servers-tile'},
            { cols: 2, rows: 1, y: 0, x: 6 , component: 'overview-tile'},
            { cols: 2, rows: 6, y: 1, x: 2 , component: 'live-stream-tile'}
        ];
    }
}
