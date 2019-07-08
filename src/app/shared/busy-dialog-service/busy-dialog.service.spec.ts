import { TestBed, inject } from '@angular/core/testing';

import { BusyDialogService } from './busy-dialog.service';

describe('BusyDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusyDialogService]
    });
  });

  it('should be created', inject([BusyDialogService], (service: BusyDialogService) => {
    expect(service).toBeTruthy();
  }));
});
