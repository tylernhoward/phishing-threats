import { LocationStub } from '.././location.stub';
import { Observable } from 'rxjs/Observable';
import { DataStub } from '.././data.stub';
import { phishMock1, phishMock2, phishMocks, ipMock } from '.././data.mock';
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

describe('MapComponent', () => {
    let component: MapComponent;
    let fixture: ComponentFixture<MapComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;
    let locationStub: LocationStub;

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
        }).overrideComponent(MapComponent, {
            set: {
                providers: [{ provide: LoadDataService, useClass: DataStub }, { provide: LocationService, useClass: LocationStub },
                    CounterService, PinnerService],
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        locationStub = fixture.debugElement.injector.get(LocationService);
        const lspy = spyOn(locationStub, 'getLocation').and.callFake(function (arg) { return Observable.of(ipMock); });
        component.data = phishMocks;
        fixture.detectChanges();
    });

    it('should update markers on dataset change', () => {
        component.ngOnChanges();
        fixture.detectChanges();
        expect(locationStub.getLocation).toHaveBeenCalled();
        expect(component.markers).toBeDefined();

    });
});
