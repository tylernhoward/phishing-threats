import { LoadDataService } from './load-data.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CounterService {
    constructor() {
  }

  // Counting Functions for data feed
  // Builds JSON then converts to sorted Array
  countTarget(cdata: any) {
    const obj: Object = {};
    for (let i = 0; i < cdata.length; i++) {
      if (!obj.hasOwnProperty(cdata[i].target)) {
        obj[cdata[i].target] = 1;
      } else {
        obj[cdata[i].target] = obj[cdata[i].target] + 1;
      }
    }
    const sortedArray = this.convertCountToArray(obj);
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
    const sortedArray = this.convertCountToArray(obj);
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
    const sortedArray = this.convertCountToArray(obj);
    sortedArray.sort(function (a, b) {
      return a['id'] - b['id'];
    });
    return sortedArray;
  }

  convertCountToArray(o: any) {
    const arr = [];
    for (const data in o) {
      if (data !== null) {
        arr.push({ 'id': data, 'count': o[data] });
      }
    }
    return arr;
  }
}

