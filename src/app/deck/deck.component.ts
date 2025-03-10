import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';
import { FlashcardComponent } from "../flashcard/flashcard.component";
import { Flashcard } from '../models/flashcard.model';
import { Deck } from '../models/deck.model';

@Component({
  selector: 'card-deck',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, FlashcardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  deck: Deck;
  
  constructor(public dialog: MatDialog, private router: Router) {
    const cards = [
      new Flashcard('Angular', 'A front-end framework'),
      new Flashcard('TypeScript', 'A superset of JavaScript'),
      new Flashcard('Component', 'A reusable UI building block in Angular')
    ];
    this.deck = new Deck('Deck', cards);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeckDialogComponent, {
      width: '90%',
      height: '90%',
      maxHeight: '900vh',
      maxWidth: '900vw',
      autoFocus: false,
      data: { cards: this.deck.flashcards }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

