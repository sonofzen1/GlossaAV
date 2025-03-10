import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardModalComponent } from './flashcard-modal.component';

describe('FlashcardModalComponent', () => {
  let component: FlashcardModalComponent;
  let fixture: ComponentFixture<FlashcardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
