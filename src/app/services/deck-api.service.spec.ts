import { TestBed } from '@angular/core/testing';

import { DeckAPIService } from './deck-api.service';

describe('DeckAPIService', () => {
  let service: DeckAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
