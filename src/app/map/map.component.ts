import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
    @Input() data: any;
    initLat = 25;
    initLng = 0;
    markers: IMarker[] = [];
    constructor() { }

    ngOnInit() {
    }
    ngOnChanges() {
        for (let i = 0; i < this.data.length; i++) {
            this.markers.push({ lat: this.data[i].lat, lng: this.data[i].long, target: this.data[i].target });
        }
    }

    clickedMarker(index: number) {
        console.log(this.data);
    }
}


