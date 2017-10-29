import { PinnerStub } from './../mocks/pinner.stub';
import { Observable } from 'rxjs/Observable';
import { phishMock1, phishMock2, phishMocks, ipMock } from '.././mocks/data.mock';
import { PinnerService } from '.././services/pinner.service';
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


describe('GridComponent', () => {
    let component: GridComponent;
    let fixture: ComponentFixture<GridComponent>;
    let pinStub: PinnerStub;

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
        }).overrideComponent(GridComponent, {
            set: {
                providers: [{ provide: PinnerService, useClass: PinnerStub }],
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridComponent);
        component = fixture.componentInstance;
        pinStub = fixture.debugElement.injector.get(PinnerService);
        const pspy = spyOn(pinStub, 'emit').and.callFake(function (arg){});

        component.data = phishMocks;
        fixture.detectChanges();
    });
    it('should load next ten threats on next page', () => {
        component.pageInd = 1;
        component.ngOnChanges();
        fixture.detectChanges();
        const initPage = component.page;
        component.pageInd = 2;
        component.goToNewPage();
        const nextPage = component.page;
        expect(initPage.length).toEqual(10);
        expect(nextPage.length).toEqual(10);
        expect(initPage).not.toEqual(nextPage);
    });
    it('should update grid on dataset change', () => {
        component.ngOnChanges();
        fixture.detectChanges();
        const pageCount = component.pageCount;
        const oldPage = component.page;
        component.data = [phishMock1];
        component.ngOnChanges();
        fixture.detectChanges();
        expect(oldPage).not.toEqual(component.page);
        expect(pageCount).toBeGreaterThan(component.pageCount);
    });
    it('should call pinner service when show on map button is clicked', () => {
        component.showMarkerOnMap(2);
        expect(pinStub.emit).toHaveBeenCalled();
    });
});
