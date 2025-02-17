import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';
import { FlashcardComponent } from "../flashcard/flashcard.component";
import { Flashcard } from '../models/flashcard.model';

@Component({
  selector: 'card-deck',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, FlashcardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})

export class DeckComponent {
  name: string='Deck';
  cards: Flashcard[] = [];

  constructor(public dialog: MatDialog, private router: Router) {
    this.cards = [
      new Flashcard('Angular', 'A front-end framework'),
      new Flashcard('TypeScript', 'A superset of JavaScript'),
      new Flashcard('Component', 'A reusable UI building block in Angular')
    ];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeckDialogComponent, {
      width: '250px',
      height: '400px',
      autoFocus: false,
      data: { cards: this.cards }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

