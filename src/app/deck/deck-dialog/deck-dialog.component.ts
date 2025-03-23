import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardComponent } from '../../flashcard/flashcard.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

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
    @Inject(MAT_DIALOG_DATA) public data: { cards: Flashcard[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
