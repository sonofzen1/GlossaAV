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
import { MatDialogModule } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, DeckComponent, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Glossa';
  isDarkMode = false;

toggleDarkMode(event: any): void {
  this.isDarkMode = event.checked;
  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
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


  decks = [this.deck1, this.deck2, this.deck3, this.deck4, this.deck5, this.deck6, this.deck7, this.deck8, this.deck9, this.deck10, this.deck11, this.deck12, this.deck13, this.deck14, this.deck15, this.deck16, this.deck17, this.deck18, this.deck19, this.deck20];

 

}
