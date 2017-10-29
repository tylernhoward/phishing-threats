import { IMarker } from './../interfaces/IMarker';
import { PinnerService } from './../services/pinner.service';
import { LocationService } from './../services/location.service';
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
    pinMark: any;
    markers: IMarker[] = [];
    constructor(private locationLoader: LocationService, private pinner: PinnerService) { }
    ngOnInit() {
        this.pinner.pinObservable.subscribe(value => {
            this.pinMark = value;
            this.pin();
        });
    }
    clickedMarker(index: number) { }
    ngOnChanges() {
        this.markers = [];
        for (let i = 0; i < 100; i++) {
            if (this.data[i] !== undefined) {
                this.locationLoader.getLocation(this.data[i].details[0].ip_address).subscribe((dataLoc) => {
                    this.markers.push({ lat: dataLoc.latitude, lng: dataLoc.longitude, target: this.data[i].target });
                });
             }
        }
    }
    pin() {
        this.markers = [];
        this.locationLoader.getLocation(this.pinMark.details[0].ip_address).subscribe((dataLoc) => {
            this.markers.push({ lat: dataLoc.latitude, lng: dataLoc.longitude, target: this.pinMark.target });
        });
    }
}


