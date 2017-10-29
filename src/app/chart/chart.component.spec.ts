import { countMock } from './../data.mock';
import { LocationStub } from '.././location.stub';
import { Observable } from 'rxjs/Observable';
import { DataStub } from '.././data.stub';
import { PinnerService } from '.././services/pinner.service';
import { CounterService } from '.././services/counter.service';
import { LocationService } from '.././services/location.service';
import { LoadDataService } from '.././services/load-data.service';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from 'ng2-scroll-to';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { ChartComponent } from '.././chart/chart.component';
import { GridComponent } from '.././grid/grid.component';
import { MapComponent } from '.././map/map.component';
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '.././app.component';

describe('ChartComponent', () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;
    let mock: Array<Object> = countMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MapComponent,
                GridComponent,
                ChartComponent
            ],
            imports: [
                HttpModule,
                BrowserModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyDJTmEUqHDPH-jPIB8B_5_J9Q47VDlCrOo'
                }),
                ScrollToModule.forRoot(),
                NgbModule.forRoot(),
                ChartsModule
            ]
        }).overrideComponent(ChartComponent, {
            set: {
                providers: [],
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
    });

    it('should load data from input and display charts', () => {
        component.polarCount = mock;
        component.lineCount = mock;
        component.pieCount = mock;
        fixture.detectChanges();
        expect(component.polarCount).toEqual(mock);
    });
});
