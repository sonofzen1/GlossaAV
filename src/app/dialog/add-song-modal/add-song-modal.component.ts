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
import { Song } from '../../models/song.model';
import {Inject} from '@angular/core';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-add-song-modal',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatButton, CommonModule],
  templateUrl: './add-song-modal.component.html',
  styleUrl: './add-song-modal.component.css'
})
export class AddSongModalComponent {
  songURL: string = '';
  errorMessage: string = '';
  constructor(
      public dialogRef: MatDialogRef<AddSongModalComponent>,
      private songsService: SongsService
    ) {}


   submit(): void {
    const urlPattern = /^https:\/\/genius\.com\/.+$/; // Regex pattern to match Genius song URLs
    if (this.songURL.trim() && urlPattern.test(this.songURL)) {

      this.songsService.scrapeLyrics(this.songURL).subscribe({
        next: (response) => {
            
            const song: Song = {
                title: response.title,
                artist: response.artist,
                spanishLyrics: response.spanishLyrics,
                englishLyrics: response.englishLyrics,
                image: response.image,
            };

            console.log(response);
            this.dialogRef.close(song);
        },
        error: (err) => {
            this.errorMessage = 'Failed to fetch song data. Please check the URL or try again.';
            console.error('Error fetching song:', err);
        }
    });

    } else {
      console.log('No URL provided'); // Debug statement
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Close the modal without submitting
  }
}
