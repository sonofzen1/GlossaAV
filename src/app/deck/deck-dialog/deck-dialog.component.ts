import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardComponent } from '../../flashcard/flashcard.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FlashcardAPIService } from '../../services/flashcard-api.service';

@Component({
  selector: 'deck-dialog',
  templateUrl: './deck-dialog.component.html',
  imports: [CommonModule, FlashcardComponent, FontAwesomeModule, MatCardModule],
  styleUrls: ['./deck-dialog.component.css']
}) 
export class DeckDialogComponent {
  faRectangleXmark = faRectangleXmark;
  constructor(
    public dialogRef: MatDialogRef<DeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cards: Flashcard[], name: string },
    private flashcardService: FlashcardAPIService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  deleteFlashcard(card: Flashcard): void {
    this.flashcardService.deleteFlashcard(this.data.name, card.Term).subscribe({
      next: () => {
        const index = this.data.cards.indexOf(card);
        if (index > -1) {
          this.data.cards.splice(index, 1);
        }
      },
      error: err => {
        console.error('Error deleting flashcard:', err);
      }
    });
  }


   
}
