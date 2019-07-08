import { TestBed, inject } from '@angular/core/testing';

import { CustomDialogService } from './custom-dialog.service';

describe('CustomDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomDialogService]
    });
  });

  it('should be created', inject([CustomDialogService], (service: CustomDialogService) => {
    expect(service).toBeTruthy();
  }));
});
