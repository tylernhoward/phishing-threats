import { PinnerService } from './services/pinner.service';
import { CounterService } from './services/counter.service';
import { LocationService } from './services/location.service';
import { LoadDataService } from './services/load-data.service';
import { GridComponent } from './grid/grid.component';
import { MapComponent } from './map/map.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { HttpModule} from '@angular/http';
import { ScrollToModule } from 'ng2-scroll-to';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GridComponent,
    ChartComponent,
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
  ],
  providers: [LoadDataService, LocationService, CounterService, PinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
