import { LocationStub } from './location.stub';
import { Observable } from 'rxjs/Observable';
import { DataStub } from './data.stub';
import { phishMock1, phishMock2, phishMocks, ipMock } from './data.mock';
import { PinnerService } from './services/pinner.service';
import { CounterService } from './services/counter.service';
import { LocationService } from './services/location.service';
import { LoadDataService } from './services/load-data.service';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from 'ng2-scroll-to';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { ChartComponent } from './chart/chart.component';
import { GridComponent } from './grid/grid.component';
import { MapComponent } from './map/map.component';
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let dataStub: DataStub;
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
      ]}).overrideComponent(AppComponent, {
        set : {
          providers: [{ provide: LoadDataService, useClass: DataStub }, {provide: LocationService, useClass: LocationStub},
            CounterService, PinnerService],
        }
      }).compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dataStub = fixture.debugElement.injector.get(LoadDataService);
    const dspy = spyOn(dataStub, 'getData').and.returnValue(Observable.of(phishMocks));
    component.ngOnInit();
    component.initSorter();
    fixture.detectChanges();
  });
  it('should resolve test phish data', () => {
    expect(component.phishData).toEqual(phishMocks);
  });
  it('should bind filter selection to model and view', () => {
    component.selectTarget('AOL');
    fixture.detectChanges();
    const lblText = fixture.nativeElement.querySelector('#targetLbl').textContent.trim();
    expect(lblText).toEqual('AOL');
    expect(component.targetSelect).toEqual('AOL');
  });
  it('should display no results if none found', () => {
    component.selectTarget('foo');
    component.selectCountry('bar');
    component.filterData();
    fixture.detectChanges();
    const lblText = fixture.nativeElement.querySelector('#noResultsLbl').textContent.trim();
    expect(lblText).toMatch('No results');
    expect(component.noResults).toBeTruthy();
  });
  it('should change map description on filter apply', () => {
    const defaultDesc = component.mapDesc;
    component.selectTarget('AOL');
    component.filterData();
    const newDesc = component.mapDesc;
    expect(newDesc).not.toEqual(defaultDesc);
    expect(defaultDesc).toBeDefined();
    expect(newDesc).toBeDefined();
  });
  it('should disable search button and enable reset on filter', () => {
    component.selectTarget('AOL');
    component.selectYear('2017');
    fixture.nativeElement.querySelector('#searchBtn').click();
    fixture.detectChanges();
    const searchDisabled = fixture.nativeElement.querySelector('#searchBtn').disabled;
    const resetDisabled = fixture.nativeElement.querySelector('#resetBtn').disabled;
    expect(component.canSearch).toBeFalsy();
    expect(searchDisabled).toBeTruthy();
    expect(resetDisabled).toBeFalsy();
  });
  it('should disable reset button and enable search button on resetFilters', () => {
    component.selectTarget('AOL');
    component.selectYear('2017');
    fixture.nativeElement.querySelector('#searchBtn').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#resetBtn').click();
    fixture.detectChanges();
    const searchDisabled = fixture.nativeElement.querySelector('#searchBtn').disabled;
    const resetDisabled = fixture.nativeElement.querySelector('#resetBtn').disabled;
    expect(component.canSearch).toBeTruthy();
    expect(searchDisabled).toBeFalsy();
    expect(resetDisabled).toBeTruthy();
    expect(component.yearSelect).toEqual('');
    expect(component.monthSelect).toEqual('');
  });


});
