/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Sbs3appService } from './sbs3app.service';

describe('Sbs3appService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Sbs3appService]
    });
  });

  it('should ...', inject([Sbs3appService], (service: Sbs3appService) => {
    expect(service).toBeTruthy();
  }));
});
