import { TestBed, inject } from '@angular/core/testing';

import { LoadDataService } from './load-data.service';

describe('LoadDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadDataService]
    });
  });

  it('should be created', inject([LoadDataService], (service: LoadDataService) => {
    expect(service).toBeTruthy();
  }));
});
