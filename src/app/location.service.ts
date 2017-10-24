import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {
  constructor(public http: Http) { }

  getLocation(ip: String) {
    return this.http.get('/api/locations/' + ip).map((res: Response) => res.json());
  }
}
