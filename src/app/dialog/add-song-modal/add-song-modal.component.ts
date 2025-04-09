import { Component } from '@angular/core';
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-song-modal',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatButton, CommonModule],
  templateUrl: './add-song-modal.component.html',
  styleUrl: './add-song-modal.component.css'
})
export class AddSongModalComponent {
  songURL: string = '';
  constructor(
      public dialogRef: MatDialogRef<AddSongModalComponent>,
    ) {}


   submit(): void {
    const urlPattern = /^https:\/\/genius\.com\/.+$/; // Regex pattern to match Genius song URLs
    if (this.songURL.trim() && urlPattern.test(this.songURL)) {
      console.log('Submitted song URL:', this.songURL); // Debug statement
      this.dialogRef.close(this.songURL); // Pass the song URL back to the parent
    } else {
      console.log('No URL provided'); // Debug statement
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without submitting
  }
}
