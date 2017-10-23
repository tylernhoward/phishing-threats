import { CounterService } from './counter.service';
import { LocationService } from './location.service';
import { LoadDataService } from './load-data.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  model;
  title = 'Current Active Phishing Domains';
  phishData: any;
  phishLoc: Array<Object>;
  targets: Array<String>;
  countries: Array<String>;
  time: Array<Date>;
  sortedData: any;
  countrySelect: String;
  targetSelect: String;
  noResults: Boolean;
  canSearch: Boolean;
  description: String;
  mapDesc: String;
  dataHold: any;

  constructor(private loader: LoadDataService, public counter: CounterService) {
    this.loader.getData().subscribe((data) => {
      this.phishData = data;
      this.canSearch = true;
      this.dataHold = this.phishData;
      this.initSorter();
    });

    
  }

  ngOnInit() {
    this.resetFilters();
    this.setDesc('the last 100 reported phishing threats');

  }
  setDesc(desc: string) {
    this.description = 'This is a visualization of all currently active phishing threats as reported by PhishTank.\n' +
      'Click on entries in the grid to show their location on the map.\n' +
      'The map is showing ' + this.mapDesc + '.';
    this.mapDesc = desc;

  }

  resetFilters() {
    this.canSearch = true;
    this.noResults = false;
    this.setDesc('the last 100 reported phishing threats');

    this.phishData = this.dataHold;
    this.countrySelect = '';
    this.targetSelect = '';
  }

  selectCountry(country: string) {
    this.countrySelect = country;
  }

  selectTarget(target: string) {
    this.targetSelect = target;
  }

  filterData() {
    const t = this.targetSelect;
    const c = this.countrySelect;
    this.canSearch = false;
    if (t==='' && c ===''){
      this.canSearch = true;

    }
    this.noResults = false;
    this.sortedData = [];
    this.sortedData = this.phishData.filter(function (item) {
      if (t !== '' && c !== '') {
         return (item.target === t) && (item.details[0].country === c);
      } else
      if (t !== '' && c === '') {
        return (item.target === t);
      } else
      if (t === '' && c !== '') {
        return (item.details[0].country === c);
      } else {
        this.noResults = true;
        return (item);
      }
    });
    if (this.sortedData.length === 0) {
      this.setDesc('nothing. Hit the reset button to search again.');
      this.noResults = true;
    } else {
      this.setDesc('phishing reports:  ' + c + '  ' + t);
      this.phishData = this.sortedData;
      console.log(this.phishData);
    }
  }



  initSorter() {
    this.targets = this.counter.countTarget(this.phishData);
    for (let i = 0; i < this.targets.length; i++) {
      this.targets[i] = this.targets[i]['id'];
    }
    this.targets.splice(0, 1); //  Will be "Other"
    this.targets.sort();

    if (this.targets.includes('AT&amp;T')) { this.targets[this.targets.indexOf('AT&amp;T')] = 'AT&T'; }
    if (this.targets.includes('Aetna Health Plans &amp; Dental Coverage')) { this.targets[this.targets.indexOf('Aetna Health Plans &amp; Dental Coverage')] = 'Aetna Health Plans & Dental Coverage'; }

    this.countries = this.counter.countCountries(this.phishData);
    for (let i = 0; i < this.countries.length; i++) {
      this.countries[i] = this.countries[i]['id'];
    }
    this.countries.sort().splice(0, 1); // Will be "no country"
  }

  scrollGrid(){
    
  }

  /*initMap() {
    for (let i = 0; i < 100; i++) {
          this.locationLoader.getLocation(this.phishData[i].details[0].ip_address).subscribe((dataLoc) => {
            this.phishLoc.push({ lat: dataLoc.latitude, long: dataLoc.longitude, target: this.phishData[i].target });
            console.log(this.phishLoc); 
          });
    }
  }
  refreshMap() {
    for (let i = 0; i < this.phishData.length; i++) {
      this.locationLoader.getLocation(this.sortedData[i].details[0].ip_address).subscribe((dataLoc) => {
        this.phishLoc.push({ lat: dataLoc.latitude, long: dataLoc.longitude, target: this.phishData[i].target });
        console.log(this.phishLoc); 

      });
    }

  }*/
}
