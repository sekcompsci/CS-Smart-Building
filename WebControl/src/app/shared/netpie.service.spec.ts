import { TestBed, inject } from '@angular/core/testing';
import { NetpieService } from './netpie.service';

describe('NetpieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetpieService]
    });
  });

  it('should ...', inject([NetpieService], (service: NetpieService) => {
    expect(service).toBeTruthy();
  }));
});
