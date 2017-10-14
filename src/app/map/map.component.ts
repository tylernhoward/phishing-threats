import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    initLat = 25;
    initLng = 0;
    markers: IMarker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
        },
        {
            lat: 51.373858,
            lng: 7.215982,
        },
        {
            lat: 51.723858,
            lng: 7.895982,
        }
    ];
    constructor() { }

    ngOnInit() {
    }

    clickedMarker(index: number) {
        console.log(`clicked the marker: ${index}`);
    }
}


