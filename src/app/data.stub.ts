import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { phishMock1, phishMock2, phishMocks, ipMock } from './data.mock';
export class DataStub {

    public getData(): Observable<any[]> {
        return Observable.of(phishMocks);
    }

}
