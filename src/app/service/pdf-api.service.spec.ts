import { TestBed } from '@angular/core/testing';

import { PDFAPIService } from './pdf-api.service';

describe('PDFAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PDFAPIService = TestBed.get(PDFAPIService);
    expect(service).toBeTruthy();
  });
});
