import { LoadDataService } from './load-data.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CounterService {
  isoCountries: any;
  constructor() {
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
      if (!obj.hasOwnProperty(cdata[i].country)) {
        obj[cdata[i].country] = 1;
      } else {
        obj[cdata[i].country] = obj[cdata[i].country] + 1;
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
  countDates(cdata: any) {
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
    const sortedArray = [];
    for (const data in obj) {
      if (data !== null) {
        sortedArray.push({ 'id': data, 'count': obj[data] });
      }
    }
    sortedArray.sort(function (a, b) {
      return a['id'] - b['id'];
    });
    return sortedArray;
  }
}

