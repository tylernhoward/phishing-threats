import { Http, Response } from '@angular/http';
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
  title = 'Current Active Phishing Threats';
  phishData: any;
  phishLoc: Array<Object>;
  targets: Array<String>;
  countries: Array<String>;
  dates: Array<String>;
  targetCount: any;
  countryCount: any;
  dateCount: any;
  sortedData: any;
  countrySelect: String;
  targetSelect: String;
  noResults: Boolean;
  canSearch: Boolean;
  countingDone: Boolean;
  description: String;
  mapDesc: String;
  dataHold: any;
  isoCountries: any;

  constructor(private http: Http, private loader: LoadDataService, public counter: CounterService) {
    this.loader.getData().subscribe((data) => {
      this.phishData = data;
      this.canSearch = true;
      this.countingDone = false;
      this.dataHold = this.phishData;
      this.http.get('../assets/isoCountries.json').map((res: Response) => res.json()).subscribe(iso => {
        this.isoCountries = iso;
        this.formatData();
        console.log(this.phishData);
        this.initSorter();
      });
    });
  }

  ngOnInit() {
    this.setDesc();
    this.resetFilters();

  }
  setDesc() {
    this.description = 'This is a visualization of all currently active phishing threats as reported by PhishTank.\n' +
      'Click on entries in the grid to show their location on the map.\n';

  }
  formatData() {
    for (let i = 0; i < this.phishData.length; i++) {
    this.phishData[i].time = new Date(this.phishData[i].verification_time).toString();
    this.phishData[i].country = this.getCountryName(this.phishData[i].details[0].country);
    this.phishData[i].domain = this.extractDomain(this.phishData[i].url);
    }

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
    } else {
      domain = url.split('/')[0];
    }
    return domain;
  }

  resetFilters() {
    this.canSearch = true;
    this.noResults = false;
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
    if (t === '' && c === '') {
      this.canSearch = true;
    }
    this.noResults = false;
    this.sortedData = [];
    this.sortedData = this.phishData.filter(function (item) {
      if (t !== '' && c !== '') {
         return (item.target === t) && (item.country === c);
      } else
      if (t !== '' && c === '') {
        return (item.target === t);
      } else
      if (t === '' && c !== '') {
        return (item.country === c);
      } else {
        this.noResults = true;
        return (item);
      }
    });
    if (this.sortedData.length === 0) {
      this.noResults = true;
    } else {
      this.phishData = this.sortedData;
      console.log(this.phishData);
    }
  }
  initSorter() {
    this.targets = [];
    this.countries = [];
    this.dates = [];

    this.targetCount = this.counter.countTarget(this.phishData);
    for (let i = 0; i < this.targetCount.length; i++) {
      this.targets[i] = this.targetCount[i]['id'];
    }
    this.targets.splice(0, 1); //  Will be "Other"
    this.targets.sort();

    this.countryCount = this.counter.countCountries(this.phishData);
    for (let i = 0; i < this.countryCount.length; i++) {
      this.countries[i] = this.countryCount[i]['id'];
    }
    this.countries.sort().splice(0, 1); // Will be "no country"

    this.dateCount = this.counter.countDates(this.phishData);
    this.countingDone = true;
    }

}
