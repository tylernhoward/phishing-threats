import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {
  jsonHeader: Headers;

  constructor(public http: Http) {
    this.jsonHeader = new Headers();
    this.jsonHeader.append('Content-Type', 'application/json');
   }

  getLocation(ip: String) {
    return this.http.get('/api/locations/' + ip, { headers: this.jsonHeader }).map((res: Response) => res.json());
  }
}
