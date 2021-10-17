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
            gridType: GridType.VerticalFixed,
            
            minCols: 24,
            maxCols: 24,
            //minRows: 24,
            //maxRows: 24,
            pushItems: true,
            draggable: {
                enabled: true,
            },
            resizable: {
                enabled: true,
            },
            fixedRowHeight: 120,
            fixedColWidth:100,
            rowHeightRatio:1,
            outerMargin: false,
            keepFixedHeightInMobile:true,
            keepFixedWidthInMobile: true
        };

        this.dashboard = [
            {
                rows: 1,
                minItemRows: 1,
                maxItemRows: 1,
                cols: 6,
                minItemCols: 6,
                maxItemCols: 6,
                y: 0,
                x: 0,
                component: 'tables-tile',
            },
            {
                rows: 1,
                minItemRows: 1,
                maxItemRows: 2,
                cols: 6,
                minItemCols: 1,
                maxItemCols: 6,
                y: 0,
                x: 2,
                component: 'menus-tile',
            },
            {
                rows:1,
                minItemRows:1,
                maxItemRows: 1,
                cols: 6,
                minItemCols: 6,
                maxItemCols: 6,
                y: 0,
                x: 4,
                component: 'servers-tile',
            },
            {
                rows: 1,
                minItemRows: 1,
                maxItemRows: 1,
                cols: 6,
                minItemCols: 6,
                maxItemCols: 6,
                y: 0,
                x: 6,
                component: 'overview-tile',
            },
            {
                rows: 4,
                minItemRows: 4,
                maxItemRows: 4,
                cols: 6,
                minItemCols: 6,
                maxItemCols: 6,
                y: 1,
                x: 18,
                component: 'live-stream-tile',
            },
            {
                rows: 1,
                minItemRows: 1,
                maxItemRows: 1,
                cols: 6,
                minItemCols: 6,
                maxItemCols: 6,
                y: 1,
                x: 0,
                component: 'chart-tile',
            },
            {
                rows: 1,
                minItemRows: 1,
                maxItemRows: 1,
                cols: 6,
                minItemCols: 6,
                maxItemCols: 6,
                y: 2,
                x: 0,
                component: 'chart-tile',
            },
        ];
    }
}
