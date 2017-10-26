import { TestBed, inject } from '@angular/core/testing';

import { PinnerService } from './pinner.service';

describe('PinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinnerService]
    });
  });

  it('should be created', inject([PinnerService], (service: PinnerService) => {
    expect(service).toBeTruthy();
  }));
});
