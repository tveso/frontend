import { TestBed } from '@angular/core/testing';

import { CacheProxyService } from './cache-proxy.service';

describe('CacheProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheProxyService = TestBed.get(CacheProxyService);
    expect(service).toBeTruthy();
  });
});
