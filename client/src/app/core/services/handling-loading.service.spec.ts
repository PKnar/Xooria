import { TestBed } from '@angular/core/testing';

import { HandlingLoadingService } from './handling-loading.service';

describe('HandlingLoadingService', () => {
  let service: HandlingLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlingLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
