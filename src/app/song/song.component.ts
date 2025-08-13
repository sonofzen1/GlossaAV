import { Component, HostListener } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Song } from '../models/song.model';
import { Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SongModalComponent } from './song-modal/song-modal.component';

@Component({
  selector: 'app-song',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
    @Input() song!: Song;
    @Input() decks: any[] = []; 

    songImageUrl!: URL;

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

}
