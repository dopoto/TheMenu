import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tile-actions',
    templateUrl: './tile-actions.component.html',
    styleUrls: ['./tile-actions.component.scss'],
})
export class TileActionsComponent implements OnInit {
    
    @Input() manageRoute: string;
    @Input() addRoute: string;

    constructor() {}

    ngOnInit(): void {}
}
