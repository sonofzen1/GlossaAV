import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'deck-dialog',
  templateUrl: './deck-dialog.component.html',
  styleUrls: ['./deck-dialog.component.css']
})
export class DeckDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeckDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
