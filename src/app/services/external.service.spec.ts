import { TestBed, inject } from '@angular/core/testing';

import { ExternalService } from './external.service';

describe('ExternalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalService]
    });
  });

  it('should be created', inject([ExternalService], (service: ExternalService) => {
    expect(service).toBeTruthy();
  }));
});
