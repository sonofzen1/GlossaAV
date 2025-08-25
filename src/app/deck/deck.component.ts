import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';
import { QuizDialogComponent } from './quiz-dialog/quiz-dialog.component';
import { FlashcardComponent } from "../flashcard/flashcard.component";
import { Flashcard } from '../models/flashcard.model';
import { Deck } from '../models/deck.model';
import { DeckAPIService } from '../services/deck-api.service';
import { FlashcardAPIService } from '../services/flashcard-api.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'card-deck',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, FlashcardComponent, MatMenuModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  @Input() deck!: Deck;
  @Output() delete = new EventEmitter<Deck>(); // Event emitter for deleting the deck
  isRenaming: boolean = false;
  oldDeckName: string = "";

  constructor(public dialog: MatDialog, private router: Router, private elementRef: ElementRef, private flashcardService: FlashcardAPIService, private deckService: DeckAPIService
  ) {}

  openQuiz(): void {
    const shuffled: Flashcard[] = this.deck.Flashcards.sort(() => Math.random() - 0.5); // Shuffle the flashcards

    const quizRef = this.dialog.open(QuizDialogComponent, {
      width: '90%',
      height: '90%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      autoFocus: false,
      data: { cards: shuffled }
    });

    quizRef.afterClosed().subscribe(result => {
      console.log('The quiz was closed');
    });
  }

openDialog(): void {
  if(this.deck.Loaded === false) {
    // Lazy-load flashcards from the server
    this.flashcardService.getFlashcards(this.deck.Title).subscribe({
    next: (flashcards) => {
      this.deck.Flashcards = flashcards; // Store in local deck
      this.deck.Loaded = true; // Mark as loaded
      console.log('Loaded flashcards:', flashcards);
      // Open the dialog with loaded cards
      this.dialog.open(DeckDialogComponent, {
        width: '90%',
        height: '90%',
        maxHeight: '900vh',
        maxWidth: '900vw',
        autoFocus: false,
        data: { name:this.deck.Title, cards: flashcards }
      });
    },
    error: (err) => {
      console.error('Failed to load flashcards:', err);
    }
  });
  } else {
    const dialogRef = this.dialog.open(DeckDialogComponent, {
      width: '90%',
      height: '90%',
      maxHeight: '900vh',
      maxWidth: '900vw',
      autoFocus: false,
      data: { name:this.deck.Title, cards: this.deck.Flashcards }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

  renameDeck(): void {
    // Add logic to handle renaming the deck
    this.oldDeckName = this.deck.Title;
    this.isRenaming = true;
    console.log('Renaming deck:', this.deck.Title);
  }

  cancelRename(): void {
    this.isRenaming = false;
    this.deck.Title = this.oldDeckName; // Revert to the old name
  }

  onRenameKeydown(event: Event): void {
      this.deckService.updateDeckTitle(this.oldDeckName, this.deck.Title).subscribe({
      next: (response) => {
        console.log('Deck renamed successfully:', response);
      },
      error: (err) => {
        console.error('Error renaming deck:', err);
        this.deck.Title = this.oldDeckName; // Revert to the old name on error
      }
    });

    console.log('Deck renamed to:', this.deck.Title);
    event.preventDefault(); // Prevent default form submission behavior
    this.isRenaming = false; // Exit renaming mode
  }

  deleteDeck(): void {
    console.log('Request to delete deck:', this.deck.Title);
    this.delete.emit(this.deck); // Emit the deck to the parent component
  }

}

