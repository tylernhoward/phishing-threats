import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadDataService {
  constructor(public http: Http) { }

  getData() {
    //return this.http.get('http://data.phishtank.com/data/2ead764589926093a93dc5b6786a632420dc7e71499c65bec1487d8aec57f48a/online-valid.json').map((res: Response) => res.json());
    return this.http.get('../assets/phishTank.json').map((res: Response) => res.json());
  }
}
