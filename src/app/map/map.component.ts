import { LocationService } from './../location.service';
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
    constructor(private locationLoader: LocationService) {

     }

    ngOnInit() {
    }
    ngOnChanges() {
        this.markers = [];
        for (let i = 0; i < 100; i++) {
            this.locationLoader.getLocation(this.data[i].details[0].ip_address).subscribe((dataLoc) => {
                this.markers.push({ lat: dataLoc.latitude, lng: dataLoc.longitude, target: this.data[i].target });
            });
        }
    }

    clickedMarker(index: number) {
    }
}


