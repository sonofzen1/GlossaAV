import { OnInit, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, Routes } from '@angular/router';
import { DeckComponent } from "./deck/deck.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Deck } from './models/deck.model';
import { Flashcard } from './models/flashcard.model';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DeckDialogComponent } from './deck/deck-dialog/deck-dialog.component';
import { FlashcardModalComponent } from './dialog/flashcard-modal/flashcard-modal.component';
import { DeckMenuModalComponent } from './dialog/deck-menu-modal/deck-menu-modal.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SongComponent } from './song/song.component';
import { Song } from './models/song.model';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { AddSongModalComponent } from './dialog/add-song-modal/add-song-modal.component';
import { ChatComponent } from './chat/chat.component';
import { DeckAPIService } from './services/deck-api.service';
import { SongsService } from './services/songs.service';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, DeckComponent, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatSlideToggleModule, MatSelectModule, FontAwesomeModule, CommonModule, MatTabsModule, SongComponent, MatIcon, MatTooltip, MatTooltipModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Glossa';
  isDarkMode = false;

  constructor(
    public dialog: MatDialog,
    private deckService: DeckAPIService,
    private songsService: SongsService // Inject SongsService
  ) {
    
  }

}