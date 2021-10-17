import { Component, OnInit } from '@angular/core';
import { LiveStreamEvent } from '../../models/live-stream-event';

@Component({
    selector: 'app-live-stream-tile',
    templateUrl: './live-stream-tile.component.html',
    styleUrls: ['./live-stream-tile.component.scss'],
})
export class LiveStreamTileComponent implements OnInit {
    events: LiveStreamEvent[] = [];

    constructor() {}

    ngOnInit(): void {
        const someArray = Array.from(Array(100).keys());
        this.events = someArray.map(x => <LiveStreamEvent>{ text: 'Some event is here...'});
    }
}
