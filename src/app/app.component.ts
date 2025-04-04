import { Component } from '@angular/core';
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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, DeckComponent, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatSlideToggleModule, MatSelectModule, FontAwesomeModule, CommonModule, MatTabsModule, SongComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Glossa';
  isDarkMode = false;

  constructor(public dialog: MatDialog) {}

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

  deck1 = new Deck('Deck 1', [
    new Flashcard('Angular', 'A front-end framework'),
    new Flashcard('TypeScript', 'A superset of JavaScript')
  ]);

  deck2 = new Deck('Deck 2', [
    new Flashcard('React', 'A JavaScript library for building user interfaces'),
    new Flashcard('Redux', 'A predictable state container for JavaScript apps')
  ]);

  deck3 = new Deck('Deck 3', [
    new Flashcard('Vue', 'The Progressive JavaScript Framework'),
    new Flashcard('Vuex', 'State management pattern + library for Vue.js applications')
  ]);

  deck4 = new Deck('Deck 4', [
    new Flashcard('Svelte', 'Cybernetically enhanced web apps'),
    new Flashcard('Sapper', 'The next small thing in web development')
  ]);

  deck5 = new Deck('Deck 5', [
    new Flashcard('Ember', 'A framework for ambitious web developers'),
    new Flashcard('Glimmer', 'Fast and light-weight UI components for the web')
  ]);

  deck6 = new Deck('Deck 6', [
    new Flashcard('Backbone', 'Give your JS app some Backbone with Models, Views, Collections, and Events'),
    new Flashcard('Marionette', 'A composite application library for Backbone.js')
  ]);

  deck7 = new Deck('Deck 7', [
    new Flashcard('Angular', 'A front-end framework'),
    new Flashcard('TypeScript', 'A superset of JavaScript')
  ]);

  deck8 = new Deck('Deck 8', [
    new Flashcard('React', 'A JavaScript library for building user interfaces'),
    new Flashcard('Redux', 'A predictable state container for JavaScript apps')
  ]);

  deck9 = new Deck('Deck 9', [
    new Flashcard('Vue', 'The Progressive JavaScript Framework'),
    new Flashcard('Vuex', 'State management pattern + library for Vue.js applications')
  ]);

  deck10 = new Deck('Deck 10', [
    new Flashcard('Svelte', 'Cybernetically enhanced web apps'),
    new Flashcard('Sapper', 'The next small thing in web development')
  ]);

  deck11 = new Deck('Deck 11', [
    new Flashcard('Ember', 'A framework for ambitious web developers'),
    new Flashcard('Glimmer', 'Fast and light-weight UI components for the web')
  ]);

  deck12 = new Deck('Deck 12', [
    new Flashcard('Backbone', 'Give your JS app some Backbone with Models, Views, Collections, and Events'),
    new Flashcard('Marionette', 'A composite application library for Backbone.js')
  ]);

  deck13 = new Deck('Deck 13', [
    new Flashcard('Ember', 'A framework for ambitious web developers'),
    new Flashcard('Glimmer', 'Fast and light-weight UI components for the web')
  ]);

  deck14 = new Deck('Deck 14', [
    new Flashcard('Backbone', 'Give your JS app some Backbone with Models, Views, Collections, and Events'),
    new Flashcard('Marionette', 'A composite application library for Backbone.js')
  ]);

  deck15 = new Deck('Deck 15', [
    new Flashcard('Angular', 'A front-end framework'),
    new Flashcard('TypeScript', 'A superset of JavaScript')
  ]);

  deck16 = new Deck('Deck 16', [
    new Flashcard('React', 'A JavaScript library for building user interfaces'),
    new Flashcard('Redux', 'A predictable state container for JavaScript apps')
  ]);

  deck17 = new Deck('Deck 17', [
    new Flashcard('Vue', 'The Progressive JavaScript Framework'),
    new Flashcard('Vuex', 'State management pattern + library for Vue.js applications')
  ]);

  deck18 = new Deck('Deck 18', [
    new Flashcard('Svelte', 'Cybernetically enhanced web apps'),
    new Flashcard('Sapper', 'The next small thing in web development')
  ]);

  deck19 = new Deck('Deck 19', [
    new Flashcard('Ember', 'A framework for ambitious web developers'),
    new Flashcard('Glimmer', 'Fast and light-weight UI components for the web')
  ]);

  deck20 = new Deck('Deck 20', [
    new Flashcard('Backbone', 'Give your JS app some Backbone with Models, Views, Collections, and Events'),
    new Flashcard('Marionette', 'A composite application library for Backbone.js')
  ]);

  song1 = new Song('Song 1', 'Artist 1', 'sjakdjaskj','hjashdjhasdaj');

  decks = [this.deck1, this.deck2, this.deck3, this.deck4, this.deck5, this.deck6, this.deck7, this.deck8, this.deck9, this.deck10, this.deck11, this.deck12, this.deck13, this.deck14, this.deck15, this.deck16, this.deck17, this.deck18, this.deck19, this.deck20];
  songs = [this.song1];
  
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
        const updatedDeckIndex = this.decks.findIndex(deck => deck.name === result.name);
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
      console.log('Deck deleted:', deckToDelete.name);
    }
  }
}
