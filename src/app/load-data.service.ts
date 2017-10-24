import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadDataService {
  jsonHeader: Headers;
  dataIn: any;

  constructor(public http: Http) {
    this.jsonHeader = new Headers();
    this.jsonHeader.append('Content-Type', 'application/json');
  }
  getData() {
    //return this.http.get('assets/phishTank.json').map((res: Response) => res.json());
    if (localStorage['data']) {
      this.dataIn = JSON.parse(localStorage.getItem('data'));
      console.log(this.dataIn);
      console.log('In local storage');
    } else {
      this.dataIn = this.http.get('/api/data', { headers: this.jsonHeader }).map((res: Response) => res.json());
      localStorage.setItem('data', JSON.stringify(this.dataIn));
      console.log(this.dataIn);
      console.log('Calling API');
    }
    return this.dataIn;
  }
}
