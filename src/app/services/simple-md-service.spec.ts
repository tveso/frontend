import {inject, TestBed} from '@angular/core/testing';

import {SimpleMdService} from './simple-md-service';

describe('SimpleMdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleMdService]
    });
  });

  it('should be created', inject([SimpleMdService], (service: SimpleMdService) => {
    expect(service).toBeTruthy();
  }));
});
