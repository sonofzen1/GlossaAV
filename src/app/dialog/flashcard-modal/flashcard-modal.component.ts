import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flashcard-modal',
  imports: [MatButtonModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './flashcard-modal.component.html',
  styleUrl: './flashcard-modal.component.css'
})
export class FlashcardModalComponent {
  selectedDeck: any;

  constructor(
    public dialogRef: MatDialogRef<FlashcardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { decks: any[] } // Receive the injected data
  ) {}

  onClose(): void {
    console.log('Button pressed, closing dialog'); // Debug statement
    this.dialogRef.close();
  }
}
