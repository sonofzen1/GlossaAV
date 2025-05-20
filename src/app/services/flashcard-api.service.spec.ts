import { TestBed } from '@angular/core/testing';

import { FlashcardAPIService } from './flashcard-api.service';

describe('FlashcardApiService', () => {
  let service: FlashcardAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
