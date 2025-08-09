import { TestBed } from '@angular/core/testing';

import { ThememodeService } from './thememode.service';

describe('ThememodeService', () => {
  let service: ThememodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThememodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
