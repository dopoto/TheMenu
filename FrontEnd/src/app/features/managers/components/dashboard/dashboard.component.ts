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
            gridType: GridType.ScrollVertical,
            compactType: CompactType.None,
            minCols: 8,
            //maxCols: 10,
            minRows: 20,
           // maxRows: 20,
            pushItems: true,
            draggable: {
                enabled: true,
            },
            resizable: {
                enabled: true,
            },
            fixedRowHeight: 60,
            fixedColWidth:100,
            outerMargin: false,
        };

        this.dashboard = [
            {
                rows: 2,
                cols: 2,
                y: 0,
                x: 0,
                minItemRows: 2,
                maxItemRows: 2,
                minItemCols: 2,
                maxItemCols: 2,
                component: 'tables-tile',
            },
            {
                rows: 2,
                cols: 2,
                y: 0,
                x: 2,
                minItemRows: 2,
                maxItemRows: 2,
                minItemCols: 2,
                maxItemCols: 2,
                component: 'menus-tile',
            },
            {
                rows: 2,
                cols: 2,
                y: 0,
                x: 4,
                minItemRows: 2,
                maxItemRows: 2,
                minItemCols: 2,
                maxItemCols: 2,
                component: 'servers-tile',
            },
            {
                rows: 1,
                cols: 2,
                y: 0,
                x: 6,
                minItemRows: 1,
                maxItemRows: 1,
                minItemCols: 2,
                maxItemCols: 2,
                component: 'overview-tile',
            },
            {
                rows: 4,
                cols: 2,
                y: 1,
                x: 6,
                minItemRows: 4,
                maxItemRows: 4,
                minItemCols: 2,
                maxItemCols: 2,
                component: 'live-stream-tile',
            },
        ];
    }
}
