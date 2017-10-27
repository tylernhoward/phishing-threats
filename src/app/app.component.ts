import { Http, Response } from '@angular/http';
import { CounterService } from './services/counter.service';
import { LocationService } from './services/location.service';
import { LoadDataService } from './services/load-data.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Current Active Phishing Threats';
  phishData: any;
  phishLoc: Array<Object>;
  targets: Array<String>;
  countries: Array<String>;
  months: Array<Object>;
  years: Array<String>;
  targetCount: any;
  countryCount: any;
  dateCount: any;
  sortedData: any;
  countrySelect: String;
  targetSelect: String;
  monthSelect: Object;
  yearSelect: String;
  noResults: Boolean;
  canSearch: Boolean;
  countingDone: Boolean;
  description: String;
  mapDesc: String;
  dataHold: any;
  isoCountries: any;

  constructor(private http: Http, private loader: LoadDataService, private counter: CounterService) {
    if (localStorage.getItem('data') !== null) {
      //this.phishData = JSON.parse(localStorage.getItem('data'));
      //console.log(this.phishData);
    } else {
      this.loader.getData().subscribe((data) => {
        this.phishData = data;
        this.setUp();
        //localStorage.clear();
        //localStorage.setItem('data', JSON.stringify(this.phishData));
        //console.log(this.phishData);
      });
    }
  }

  setUp() {
    this.canSearch = true;
    this.countingDone = false;
    this.dataHold = this.phishData;
    this.http.get('../assets/isoCountries.json').map((res: Response) => res.json()).subscribe(iso => {
      this.isoCountries = iso;
      this.formatData();
      this.initSorter();
    });
  }

  ngOnInit() {
    this.setDesc();
    this.resetFilters();

  }
  setDesc() {
    this.description = 'This is a visualization of all currently active phishing threats as reported by PhishTank.';
    this.mapDesc = 'the unique locations of the last 100 reported IP addresses.';
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
    this.setDesc();
    this.canSearch = true;
    this.noResults = false;
    this.phishData = this.dataHold;
    this.countrySelect = '';
    this.targetSelect = '';
    this.monthSelect = '';
    this.yearSelect = '';
  }

  selectCountry(country: string) {
    this.countrySelect = country;
  }

  selectTarget(target: string) {
    this.targetSelect = target;
  }
  selectMonth(month: Object) {
    this.monthSelect = month;
  }
  selectYear(year: string) {
    this.yearSelect = year;
  }

  filterData() {
    const t = this.targetSelect;
    const c = this.countrySelect;
    const m = this.monthSelect['n'];

    const y = this.yearSelect;

    this.canSearch = false;
    if (!t && !c && !m && !y) {
      this.canSearch = true;
    }
    this.noResults = false;
    if (this.canSearch === false) {
      this.sortedData = [];
      this.sortedData = this.phishData.filter(function (item) {
        if (t && c ) {
          return (item.target === t) && (item.country === c);
        } else
        if (t && !c) {
          return (item.target === t);
        } else
        if (!t && c) {
          return (item.country === c);
        } else {
          return item;
        }
      });
      this.sortedData = this.sortedData.filter(function (item) {
        const d = new Date(item.verification_time);
        if (m && y) {
          return (d.getMonth() === m) && (d.getFullYear().toString() === y);
        } else
        if (m && !y) {
          return (d.getMonth() === m);
        } else
        if (!m && y) {
          return (d.getFullYear().toString() === y);
        } else {
          return item;
        }
      });
    
     if (this.sortedData.length === 0) {
       this.noResults = true;
     } else {
        this.mapDesc = 'the unique locations of the last 100 out of ' + this.sortedData.length + ' phising reports with the filters below.';
        this.phishData = this.sortedData;
    }
  }
  }
  initSorter() {
    this.targets = [];
    this.countries = [];
    this.months = [{ 's': 'January', 'n': 0} , { 's': 'February', 'n': 1} , { 's': 'March', 'n': 2} ,
                    { 's': 'April', 'n': 3} , { 's': 'May', 'n': 4} , { 's': 'June', 'n': 5} ,
                     { 's': 'July', 'n': 6} , { 's': 'August', 'n': 7} , { 's': 'September', 'n': 8},
                      { 's': 'October', 'n': 9} , { 's': 'November', 'n': 10} , { 's': 'December', 'n': 11} ];
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
    this.sortByDate();
    this.dateCount = this.counter.countDates(this.phishData);
    const yearHigh = this.dateCount[0]['id'].substring(0, 4);
    this.years = [yearHigh, String(yearHigh - 1), String(yearHigh - 2)];


    this.countingDone = true;
    }

    sortByDate() {
      this.phishData.sort(function (a, b) {
        return +new Date(b.verification_time) - +new Date(a.verification_time);
      });
    }

}
