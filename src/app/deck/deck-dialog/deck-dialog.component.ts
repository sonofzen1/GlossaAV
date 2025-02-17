import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DeckComponent } from '../deck.component';
import { Inject } from '@angular/core';

@Component({
  selector: 'deck-dialog',
  templateUrl: './deck-dialog.component.html',
  imports: [CommonModule, DeckComponent],
  styleUrls: ['./deck-dialog.component.css']
})
export class DeckDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cards: string[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
