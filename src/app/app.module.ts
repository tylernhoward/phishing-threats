import { LocationService } from './location.service';
import { LoadDataService } from './load-data.service';
import { GridComponent } from './grid/grid.component';
import { MapComponent } from './map/map.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GridComponent,
    ChartComponent,
    SidebarComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJTmEUqHDPH-jPIB8B_5_J9Q47VDlCrOo'
    }),
    NgbModule.forRoot(),
    ChartsModule
  ],
  providers: [LoadDataService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
