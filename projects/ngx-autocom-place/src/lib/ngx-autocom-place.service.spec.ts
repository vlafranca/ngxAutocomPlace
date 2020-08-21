import { TestBed } from '@angular/core/testing';

import { NgxAutocomPlaceService } from './ngx-autocom-place.service';

describe('NgxAutocomPlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxAutocomPlaceService = TestBed.get(NgxAutocomPlaceService);
    expect(service).toBeTruthy();
  });
});
