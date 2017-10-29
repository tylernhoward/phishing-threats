import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ipMock } from './data.mock';
export class LocationStub {

    public getLocation(ip: String): Observable<any> {
        return Observable.of(ipMock);
    }
}
