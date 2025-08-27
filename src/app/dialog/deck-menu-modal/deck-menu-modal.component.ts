import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../models/flashcard.model'; // Import the Flashcard model
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { Deck } from '../../models/deck.model'; // Import the Deck model
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DeckAPIService } from '../../services/deck-api.service';

@Component({
  selector: 'app-deck-menu-modal',
  imports: [MatButtonModule, MatInputModule, MatSelectModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './deck-menu-modal.component.html',
  styleUrl: './deck-menu-modal.component.css'
})
export class DeckMenuModalComponent {
  faRectangleXmark = faRectangleXmark;
  name: string = '';
  selectedDeck: any;

  constructor(
    public dialogRef: MatDialogRef<DeckMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { decks: any[] }, // Receive the injected data
    public deckService: DeckAPIService // Inject DeckAPIService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const newDeck = new Deck(this.name,[]); // Create a new deck model

    this.deckService.addDeck(newDeck).subscribe({
      next: (response) => {
        console.log('Deck created successfully:', response);
        // Optional: show a toast/snackbar or navigate
      },
      error: (err) => {
        console.error('Error creating deck:', err);
        // Optional: show an error message to the user
      },
    });

    const updatedDecks = [...this.data.decks, newDeck];
    console.log('Updated Decks:', updatedDecks);

    // Pass the updated array back to the parent component
    this.dialogRef.close(updatedDecks);
  }
}
