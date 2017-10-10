import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    vulnerabilities: IVulnerabilities[] = [
        {
            info: 'This is serious'
        },
        {
            info: 'heads up'
        },
        {
            info: 'beware!!!'
        }
    ];
    constructor() {}
    ngOnInit() {}
}

