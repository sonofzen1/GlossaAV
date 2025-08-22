import { OnInit, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, Routes } from '@angular/router';
import { DeckComponent } from "../deck/deck.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Deck } from '../models/deck.model';
import { Flashcard } from '../models/flashcard.model';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DeckDialogComponent } from '../deck/deck-dialog/deck-dialog.component';
import { FlashcardModalComponent } from '../dialog/flashcard-modal/flashcard-modal.component';
import { DeckMenuModalComponent } from '../dialog/deck-menu-modal/deck-menu-modal.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SongComponent } from '../song/song.component';
import { Song } from '../models/song.model';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { AddSongModalComponent } from '../dialog/add-song-modal/add-song-modal.component';
import { ChatComponent } from '../chat/chat.component';
import { DeckAPIService } from '../services/deck-api.service';
import { SongsService } from '../services/songs.service';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, DeckComponent, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatSlideToggleModule, MatSelectModule, FontAwesomeModule, CommonModule, MatTabsModule, SongComponent, MatIcon, MatTooltip, MatTooltipModule, ChatComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Glossa';
  isDarkMode = false;

  constructor(
    public dialog: MatDialog,
    private deckService: DeckAPIService,
    private songsService: SongsService // Inject SongsService
  ) {
    
  }

  toggleDarkMode(event: any): void {
    this.isDarkMode = event.checked;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  getDynamicCols(): number {
    const screenWidth = window.innerWidth;
    return Math.max(1, Math.floor(screenWidth / 380)); // Ensure at least 1 column
  }

  username: string = 'mycooluser';

  decks: Deck[] = [];
  songs: Song[] = [];

  ngOnInit(): void {
    console.log('Initializing AppComponent');
    this.deckService.getAllDecks().subscribe({
      next: (data) => {
        this.decks.push(...data.map((deck: any) => {return new Deck(deck.title, deck.flashcards);}));//Flashcards is an array of strings that map to other flashcards
        console.log('Decks:', this.decks);

      },
      error: (err) => {
        console.error('Failed to fetch decks', err);
      }
      
    });
    this.loadSongs();
  }

  loadSongs(): void {
    this.songsService.getAllSongs().subscribe({
      next: (data) => {
        this.songs = data;
        console.log('Songs:', this.songs);
      },
      error: (err) => {
        console.error('Failed to fetch songs', err);
      }
    });
  }

  /*huhbulubub*/
  
  openMenu(): void {

    console.log('Opening dialog');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'my-dialog-styles'; // Apply custom class
    dialogConfig.width = '40%';
    dialogConfig.height = '70%';
    dialogConfig.maxHeight = '900vh';
    dialogConfig.maxWidth = '900vw';
    dialogConfig.autoFocus = '.modal-header'; // Focus the modal header element
    dialogConfig.data = { decks: this.decks }; // Pass the decks list as data

    const dialogRef = this.dialog.open(FlashcardModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Find the updated deck in the decks array and update it
        const updatedDeckIndex = this.decks.findIndex(deck => deck.Title === result.name);
        if (updatedDeckIndex !== -1) {
          this.decks[updatedDeckIndex] = result;
        }
        console.log('The dialog was closed with result:', result);
      } else {
        console.log('The dialog was closed without result');
      }
      // Manually restore focus if needed
      // document.querySelector('.menu-trigger')?.focus();
    });
  }

  openDeckMenu(): void {
    console.log('Opening deck menu dialog');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'my-dialog-styles'; // Apply custom class
    dialogConfig.width = '40%';
    dialogConfig.height = '70%';
    dialogConfig.maxHeight = '900vh';
    dialogConfig.maxWidth = '900vw';
    dialogConfig.autoFocus = '.modal-header'; // Focus the modal header element
    dialogConfig.data = { decks: this.decks }; // Pass the decks list as data

    const dialogRef = this.dialog.open(DeckMenuModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.decks = result;// Add the new deck to the decks array
      }
        // Manually restore focus if needed
      // document.querySelector('.menu-trigger')?.focus();
    });
  }

  deleteDeck(deckToDelete: Deck): void {
    const index = this.decks.indexOf(deckToDelete);
    if (index !== -1) {
      this.decks.splice(index, 1); // Remove the deck from the array
      console.log('Deck deleted:', deckToDelete.Title);
      this.deckService.deleteDeck(index).subscribe({
        next: (response) => {
          console.log('Deck deleted successfully:', response);
        },
        error: (err) => {
          console.error('Error deleting deck:', err);
        }
      });
    }
  }

  onDeleteSong(song : Song): void {
    const index = this.songs.indexOf(song);
    if (index !== -1) {
      this.songs.splice(index, 1);
    }

    this.songsService.deleteSong(song.songId).subscribe({
      next: () => console.log(`Song ${song.songId} deleted`),
      error: err => {
        console.error(err);
        // Optionally re-add song if delete fails
      }
    });
  }

  openSongMenu(): void {
    console.log('Opening deck menu dialog');
      let dialogRef = this.dialog.open(AddSongModalComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadSongs(); // Reload songs after adding a new one
      // Manually restore focus if needed
      // document.querySelector('.menu-trigger')?.focus();
    });
  }

  chatOpened: boolean = false; // Track if the chat is open

  openChat(): void {
    this.chatOpened = true; // Open the chat
  }

  closeChat(): void {
    this.chatOpened = false; // Close the chat
  }
}