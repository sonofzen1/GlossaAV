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

  song1 = new Song('Despacito', 'Artist 1', 
    [
    "[Intro: Luis Fonsi & Daddy Yankee]",
    "Ay, ¡Fonsi! ¡DY!",
    "Oh-oh, oh, no, oh, no, oh",
    "¡Hey, yeah!",
    "Diri-diri-diririri, Daddy, go!",
    "Sí, sabes que ya llevo un rato mirándote",
    "Tengo que bailar contigo hoy (¡DY!)",
    "Vi que tu mirada ya estaba llamándome",
    "Muéstrame el camino que yo voy (Oh)",

    "[Verso 1: Luis Fonsi & Daddy Yankee]",
    "Tú, tú eres el imán y yo soy el metal",
    "Me voy acercando y voy armando el plan",
    "Solo con pensarlo, se acelera el pulso (Oh, yeah)",
    "Ya, ya me está gustando más de lo normal",
    "Todos mis sentidos van pidiendo más",
    "Esto hay que tomarlo sin ningún apuro",

    "[Estribillo: Luis Fonsi & Daddy Yankee]",
    "Despacito",
    "Quiero respirar tu cuello despacito",
    "Deja que te diga cosas al oído",
    "Para que te acuerdes si no estás conmigo",
    "Despacito",
    "Quiero desnudarte a besos despacito",
    "Firmar las paredes de tu laberinto",
    "Y hacer de tu cuerpo todo un manuscrito",
    "(Sube, sube, sube), ah (Sube, sube)",

    "[Post-Estribillo: Luis Fonsi & Daddy Yankee]",
    "Quiero ver bailar tu pelo, quiero ser tu ritmo (Woah, woah)",
    "Que le enseñes a mi boca (Woah, woah)",
    "Tus lugares favoritos (Favorito', favorito', baby)",
    "Déjame sobrepasar tus zonas de peligro (Eh; woah, woah)",
    "Hasta provocar tus gritos (Woah, woah)",
    "Y que olvides tu apellido (Rrr; DY)",

    "[Verso 2: Daddy Yankee]",
    "Si te pido un beso, ven, dámelo, yo sé que estás pensándolo (Eh)",
    "Llevo tiempo intentándolo (Eh), mami, esto es dando y dándolo",
    "Sabes que tu corazón conmigo te hace bam-bam",
    "Sabes que esa beba está buscando de mi bam-bam",
    "Ven, prueba de mi boca para ver cómo te sabe (Eh-eh; ¡plo!)",
    "Quiero, quiero, quiero ver cuánto amor a ti te cabe",
    "Yo no tengo prisa, yo me quiero dar el viaje",
    "Empezamos lento, después salvaje",

    "[Pre-Estribillo: Daddy Yankee]",
    "Pasito a pasito, suave suavecito",
    "Nos vamo' pegando, poquito a poquito",
    "Cuando tú me besas con esa destreza",
    "Veo que eres malicia con delicadeza",
    "Pasito a pasito, suave suavecito",
    "Nos vamo' pegando, poquito a poquito (Oh-oh)",
    "Y es que esa belleza es un rompecabezas (No, no)",
    "Pero pa' montarlo aquí tengo la pieza, oye (Yo, yo; ¡plo!)",

    "[Estribillo: Luis Fonsi & Daddy Yankee]",
    "Despacito",
    "Quiero respirar tu cuello despacito (Yo)",
    "Deja que te diga cosas al oído (Yo)",
    "Para que te acuerdes si no estás conmigo (Plo, plo)",
    "Despacito (¡Plo!)",
    "Quiero desnudarte a besos despacito (Yeah-eh)",
    "Firmar las paredes de tu laberinto",
    "Y hacer de tu cuerpo todo un manuscrito",
    "(Sube, sube, sube), ah (Sube, sube)",

    "[Post-Estribillo: Luis Fonsi & Daddy Yankee]",
    "Quiero ver bailar tu pelo, quiero ser tu ritmo (Eh, woah, woah)",
    "Que le enseñes a mi boca (Woah, woah)",
    "Tus lugares favoritos (Favorito', favorito', baby)",
    "Déjame sobrepasar tus zonas de peligro (Eh, woah, woah)",
    "Hasta provocar tus gritos (Woah, woah)",
    "Y que olvides tu apellido",

    "[Puente: Luis Fonsi]",
    "Despacito",
    "Vamo' a hacerlo en una playa en Puerto Rico",
    "Hasta que las olas griten: \"¡Ay, bendito!\"",
    "Para que mi sello se quede contigo",
    "(Báilalo)",

    "[Outro: Daddy Yankee & Luis Fonsi]",
    "Pasito a pasito, suave suavecito (Oh, yeah-yeah)",
    "Nos vamos pegando, poquito a poquito (No, no; oh)",
    "Que le enseñes a mi boca",
    "Tus lugares favoritos",
    "Favorito', favorito', baby (Ooh)",
    "Pasito a pasito, suave suavecito",
    "Nos vamos pegando, poquito a poquito",
    "Hasta provocar tus gritos (Fonsi)",
    "Y que olvides tu apellido (DY)",
    "Despacito"],
    [
    "[Intro: Luis Fonsi & Daddy Yankee]",
    "Oh, Fonsi! DY!",
    "Oh-oh, oh, no, oh, no, oh",
    "Hey, yeah!",
    "Diri-diri-diririri, Daddy, go!",
    "Yes, you know I’ve been looking at you for a while",
    "I have to dance with you today (DY!)",
    "I saw that your gaze was already calling me",
    "Show me the way that I’ll go (Oh)",

    "[Verse 1: Luis Fonsi & Daddy Yankee]",
    "You, you are the magnet and I am the metal",
    "I’m getting closer and I’m setting up the plan",
    "Just thinking about it accelerates the pulse (Oh, yeah)",
    "Now, I’m already liking it more than usual",
    "All my senses are asking for more",
    "This must be taken without any rush",

    "[Chorus: Luis Fonsi & Daddy Yankee]",
    "Slowly",
    "I want to breathe your neck slowly",
    "Let me whisper things in your ear",
    "So that you remember if you’re not with me",
    "Slowly",
    "I want to undress you with kisses slowly",
    "Sign the walls of your labyrinth",
    "And turn your body into a manuscript",
    "(Rise, rise, rise), ah (Rise, rise)",

    "[Post-Chorus: Luis Fonsi & Daddy Yankee]",
    "I want to see your hair dance, I want to be your rhythm (Woah, woah)",
    "Let me show my mouth (Woah, woah)",
    "Your favorite places (Favorite, favorite, baby)",
    "Let me surpass your danger zones (Eh; woah, woah)",
    "Until I provoke your screams (Woah, woah)",
    "And you forget your last name (Rrr; DY)",

    "[Verse 2: Daddy Yankee]",
    "If I ask for a kiss, come give it to me, I know you’re thinking about it (Eh)",
    "I’ve been trying for a while (Eh), mami, this is giving and giving it",
    "You know that your heart with me makes you go bam-bam",
    "You know that baby is looking for my bam-bam",
    "Come, taste my mouth to see how it tastes (Eh-eh; ¡plo!)",
    "I want, I want, I want to see how much love fits in you",
    "I’m not in a hurry, I want to take the trip",
    "We start slow, then wild",

    "[Pre-Chorus: Daddy Yankee]",
    "Step by step, soft softly",
    "We’re getting closer, little by little",
    "When you kiss me with that skill",
    "I see that you’re malice with delicacy",
    "Step by step, soft softly",
    "We’re getting closer, little by little (Oh-oh)",
    "And that beauty is a puzzle (No, no)",
    "But to put it together I have the piece, hey (Yo, yo; ¡plo!)",

    "[Chorus: Luis Fonsi & Daddy Yankee]",
    "Slowly",
    "I want to breathe your neck slowly (Yo)",
    "Let me whisper things in your ear (Yo)",
    "So that you remember if you’re not with me (Plo, plo)",
    "Slowly (¡Plo!)",
    "I want to undress you with kisses slowly (Yeah-eh)",
    "Sign the walls of your labyrinth",
    "And turn your body into a manuscript",
    "(Rise, rise, rise), ah (Rise, rise)",

    "[Post-Chorus: Luis Fonsi & Daddy Yankee]",
    "I want to see your hair dance, I want to be your rhythm (Eh, woah, woah)",
    "Let me show my mouth (Woah, woah)",
    "Your favorite places (Favorite, favorite, baby)",
    "Let me surpass your danger zones (Eh, woah, woah)",
    "Until I provoke your screams (Woah, woah)",
    "And you forget your last name",

    "[Bridge: Luis Fonsi]",
    "Slowly",
    "Let’s do it on a beach in Puerto Rico",
    "Until the waves shout: \"Oh, blessed!\"",
    "So that my seal stays with you",
    "(Dance it)",

    "[Outro: Daddy Yankee & Luis Fonsi]",
    "Step by step, soft softly (Oh, yeah-yeah)",
    "We’re getting closer, little by little (No, no; oh)",
    "Let me show my mouth",
    "Your favorite places",
    "Favorite, favorite, baby (Ooh)",
    "Step by step, soft softly",
    "We’re getting closer, little by little",
    "Until I provoke your screams (Fonsi)",
    "And you forget your last name (DY)",
    "Slowly"
    ],
    new URL("https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F6dbadaf716039dad3841a1640755ac3a.1000x1000x1.png"));

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
