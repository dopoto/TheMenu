import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-chart-tile',
    templateUrl: './chart-tile.component.html',
    styleUrls: ['./chart-tile.component.scss'],
})
export class ChartTileComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: 'My-series',
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                },
            ],
            chart: {
                height: 350,
                type: 'bar',
            },
            title: {
                text: 'My First Angular Chart',
            },
            xaxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                ],
            },
        };
    }

    ngOnInit(): void {}
}
