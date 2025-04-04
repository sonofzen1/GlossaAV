import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
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
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

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

  constructor(public dialog: MatDialog, private router: Router, private elementRef: ElementRef) {}

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

  renameDeck(): void {
    this.oldDeckName = this.deck.name;
    this.isRenaming = true;
    console.log('Renaming deck:', this.deck.name);
    // Add logic to handle renaming the deck
  }

  cancelRename(): void {
    this.isRenaming = false;
    this.deck.name = this.oldDeckName; // Revert to the old name
  }

  onRenameKeydown(event: Event): void {
    console.log('Deck renamed to:', this.deck.name);
    event.preventDefault(); // Prevent default form submission behavior
    this.isRenaming = false; // Exit renaming mode
  }

  deleteDeck(): void {
    console.log('Request to delete deck:', this.deck.name);
    this.delete.emit(this.deck); // Emit the deck to the parent component
  }

}

