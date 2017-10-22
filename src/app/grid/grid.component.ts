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
    constructor(private http: Http) {
       this.http.get('../assets/isoCountries.json').map((res: Response) => res.json()).subscribe(data => {
            this.isoCountries = data;
            this.initPage();
       });
    }
    ngOnInit() {
        this.pageInd = 0;
        this.page = [];
    }
    ngOnChanges() {

    }
    initPage() {
        this.pageCount = Math.ceil(this.data.length / 10);
        for (let i = 0; i < 10; i++) {
            this.formatData(i);
            this.page.push(this.data[i]);
        }
    }
    previousPage() {
        if (this.pageInd >= 0) {
            this.page = [];
            if (this.pageInd > 0) { this.pageInd--; }
            for (let i = (0 + (this.pageInd * 10)); i < (10 + (this.pageInd * 10)); i++) {
                this.formatData(i);
                this.page.push(this.data[i]);
            }
        }
    }
    nextPage() {
        if (this.pageInd <= this.pageCount ) {
            this.page = [];
            if (this.pageInd < this.pageCount) { this.pageInd++; }
            for (let i = (0 + (this.pageInd * 10)); i < (10 + (this.pageInd * 10)); i++) {
                this.formatData(i);
                this.page.push(this.data[i]);
            }
        }
    }
    formatData(i: number) {
        this.data[i].time = new Date(this.data[i].verification_time).toString();
        this.data[i].country = this.getCountryName(this.data[i].details[0].country);
        this.data[i].domain = this.extractDomain(this.data[i].url);
    }

    getCountryName(countryCode) {
        if (this.isoCountries.hasOwnProperty(countryCode)) {
            return this.isoCountries[countryCode];
        } else {
            return countryCode;
        }
    }
    extractDomain(url) {
        let domain: string;
        if (url.indexOf('://') > -1) {
            domain = url.split('/')[2];
        }else {
            domain = url.split('/')[0];
        }
        return domain;
    }
}

