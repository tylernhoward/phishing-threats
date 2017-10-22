import { LocationService } from './location.service';
import { LoadDataService } from './load-data.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Current Active Phishing Domains';
  phishData: any;
  phishLoc: Array<Object>;
  constructor(private loader: LoadDataService, private locationLoader: LocationService) {
    this.loader.getData().subscribe((data) => {
      this.phishData = data;


      for (let i = 0; i < 100; i++) {
        if (this.phishData[i].target !== 'Other') {
            this.locationLoader.getLocation(this.phishData[i].details[0].ip_address).subscribe((dataLoc) => {
              this.phishLoc = [];
              this.phishLoc.push(
              {
                  lat: dataLoc.latitude,
                  long: dataLoc.longitude,
                  target: this.phishData[i].target
                  //city: dataLoc.city,
                  //country: dataLoc.country_name,
                  //region: dataLoc.region_name
              });
          });
        }
      }


    });
  }
}
