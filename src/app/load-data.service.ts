import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadDataService {
  jsonHeader: Headers;

  constructor(public http: Http) {
    this.jsonHeader = new Headers();
    this.jsonHeader.append('Content-Type', 'application/json');
  }
  getData() {
    return this.http.get('/api/data', { headers: this.jsonHeader }).map((res: Response) => res.json());
    //return this.http.get('assets/phishTank.json').map((res: Response) => res.json());
  }
}
