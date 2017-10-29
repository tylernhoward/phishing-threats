import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PinnerStub {
    public pinObservable = new Subject<number>();

    constructor() { }

    emit(val) {
        this.pinObservable.next(val);
    }
}
