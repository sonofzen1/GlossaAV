import { Component, HostListener } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Song } from '../models/song.model';
import { Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SongModalComponent } from './song-modal/song-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-song',
  imports: [MatButtonModule, MatCardModule, FontAwesomeModule, MatTooltipModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
    @Input() song!: Song;
    @Input() decks: any[] = []; 

    @Output() deleteSong = new EventEmitter<Song>();

    songImageUrl!: URL;
    faXmark = faXmark;

    constructor(private dialog: MatDialog) {} // Inject MatDialog
    
    ngOnInit() {
      if (this.song?.image) {
        try {
          this.songImageUrl = new URL(this.song.image);
        } catch {
          console.error('Invalid image URL:', this.song.image);
        }
      }
    }
    
    openDialog(): void {
      const dialogRef = this.dialog.open(SongModalComponent, {
        width: '50%',
        height: '90%',
        maxHeight: '900vh',
        maxWidth: '900vw',
        autoFocus: false,
        data: { song: this.song, decks: this.decks }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Modal opened with songs:', this.song);
        console.log('The dialog was closed');
      });
    }

    
    delete(): void {
      console.log('Delete button clicked for song:', this.song); // Debug statement 
      // Emit an event or handle the deletion logic here
      this.deleteSong.emit(this.song);

      // reminder to handle the deletion logic in the parent component
    }

}
