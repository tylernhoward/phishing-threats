import { LoadDataService } from './load-data.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CounterService {
  isoCountries: any;
  constructor(private http: Http) {
    this.http.get('../assets/isoCountries.json').map((res: Response) => res.json()).subscribe(data => {
      this.isoCountries = data;
    });
  }

  // Counting Functions for data feed.
  countTarget(cdata: any) {
    const obj: Object = {};
    for (let i = 0; i < cdata.length; i++) {
      if (!obj.hasOwnProperty(cdata[i].target)) {
        obj[cdata[i].target] = 1;
      } else {
        obj[cdata[i].target] = obj[cdata[i].target] + 1;
      }
    }
    const sortedArray = [];
    for (const data in obj) {
      if (data !== null) {
        sortedArray.push({ 'id': data, 'count': obj[data] });
      }
    }
    sortedArray.sort(function (a, b) {
      return b['count'] - a['count'];
    });
    return sortedArray;
  }
  countCountries(cdata: any) {
    const obj: Object = {};
    for (let i = 0; i < cdata.length; i++) {
      if (!obj.hasOwnProperty(cdata[i].details[0].country)) {
        obj[cdata[i].details[0].country] = 1;
      } else {
        obj[cdata[i].details[0].country] = obj[cdata[i].details[0].country] + 1;
      }
    }
    const sortedArray = [];
    for (const data in obj) {
      if (data !== null) {
        sortedArray.push({ 'id': data, 'count': obj[data] });
      }
    }
    sortedArray.sort(function (a, b) {
      return b['count'] - a['count'];
    });
    return sortedArray;
  }
  countYears(cdata: any) {
    const obj: Object = {};
    for (let i = 0; i < cdata.length; i++) {
      const date = new Date(cdata[i].verification_time);
      const prop = (date.getFullYear() + ' ' + date.getMonth());
      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = 1;
      } else {
        obj[prop] = obj[prop] + 1;
      }
    }
    const sortedArray = Object.keys(obj).map(function (key) {
      return { 'id': key, 'count': obj[key] };
    });
    sortedArray.sort().reverse();
    return sortedArray;
  }
}

