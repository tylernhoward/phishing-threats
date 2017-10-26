import { PinnerService } from './../services/pinner.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {
    @Input() data: any;
    page: IVulnerabilities[];
    pageInd: number;
    pageCount: number;
    isoCountries: any;
    constructor(private pinner: PinnerService) {
    }
    ngOnInit() {
        this.pageInd = 0;
        this.page = [];
    }
    ngOnChanges() {
        this.pageInd = 0;
        this.page = [];
        this.initPage();
    }
    initPage() {
        this.pageCount = Math.ceil(this.data.length / 10);
        for (let i = 0; i < 10; i++) {
            if (this.data[i] !== undefined) {
            this.page.push(this.data[i]);
            }
        }
    }
    goToPage() {
        const p = this.pageInd - 1;
        this.page = [];
        for (let i = (0 + (p * 10)); i < (10 + (p * 10)); i++) {
            if (this.data[i] !== undefined) {
                this.page.push(this.data[i]);
            }
        }
    }
    showMarkerFromMap(i: number) {
        this.emit(this.data[i]);
    }
    emit(val) {
        this.pinner.emit(val);
    }
}

