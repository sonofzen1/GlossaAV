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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, DeckComponent, MatGridListModule, MatCardModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Glossa';

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
}
