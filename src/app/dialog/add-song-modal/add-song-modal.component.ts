import { Component } from '@angular/core';
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Song } from '../../models/song.model';
import {Inject} from '@angular/core';
import { SongsService } from '../../services/songs.service';

interface ScrapeResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-add-song-modal',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatProgressSpinnerModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatButton, CommonModule],
  templateUrl: './add-song-modal.component.html',
  styleUrl: './add-song-modal.component.css'
})

export class AddSongModalComponent {
  songURL = new FormControl('', [
    Validators.required,
    Validators.pattern(/^https:\/\/genius\.com\/.+$/),
  ]);

  errorMessage: string = '';
  problema: boolean = false;
  isLoading = false; 
  
  constructor(
      public dialogRef: MatDialogRef<AddSongModalComponent>,
      private songsService: SongsService
    ) {}


  submit(): void {
    if (this.songURL.valid) {
      this.isLoading = true; // Start loading state
      this.songsService.scrapeLyrics(this.songURL.value ?? '').subscribe({
        next: (response: ScrapeResponse) => {
          this.isLoading = false; // Stop loading state
          if (response.success) {
            this.dialogRef.close(true);
          } else {
            // Set backend error on the form control
            this.songURL.setErrors({ backendError: response.message });
          }
        },
        error: (err) => {
          this.songURL.setErrors({ backendError: 'Failed to fetch song data. Please check the URL or try again.' });
          console.error('Error fetching song:', err);
        }
      });
    } else {
      this.songURL.markAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without submitting
  }
}
