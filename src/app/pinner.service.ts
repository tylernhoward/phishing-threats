import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PinnerService {
  public pinObservable = new Subject<number>();

  constructor() { }

  emitConfig(val) {
    this.pinObservable.next(val);
  }
}
