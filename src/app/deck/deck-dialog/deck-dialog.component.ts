import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardComponent } from '../../flashcard/flashcard.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'deck-dialog',
  templateUrl: './deck-dialog.component.html',
  imports: [CommonModule, FlashcardComponent],
  styleUrls: ['./deck-dialog.component.css']
}) 
export class DeckDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cards: Flashcard[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
