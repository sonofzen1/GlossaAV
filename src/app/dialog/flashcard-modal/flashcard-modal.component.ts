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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-flashcard-modal',
  imports: [MatButtonModule, MatInputModule, MatSelectModule, CommonModule, FormsModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './flashcard-modal.component.html',
  styleUrl: './flashcard-modal.component.css'
})
export class FlashcardModalComponent {
  faRectangleXmark = faRectangleXmark;
  term: string = '';
  definition: string = '';
  selectedDeck: any;

  constructor(
    public dialogRef: MatDialogRef<FlashcardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text?: string; decks: any[] }, // Receive the injected data
    private translationService: TranslationService
  ) {
        if (data.text) {
          this.term = data.text;
          this.translateTerm(); // Call the translation function if text is provided
        }

  }

    translateTerm(): void {
    this.translationService.translateText(this.term, 'es', 'en').subscribe({
      next: (translatedText) => {
        this.definition = translatedText;
        console.log('Translated Text:', this.definition);
      },
      error: (error) => {
        console.error('Error during translation:', error);
        this.definition = 'Translation failed';
      }
    });
  }
  
  onClose(): void {
    console.log('Button pressed, closing dialog'); // Debug statement
    this.dialogRef.close();
  }

  submit(): void {
    const newFlashcard = new Flashcard(this.term, this.definition); // Create a new flashcard model
    console.log('New Flashcard:', newFlashcard);
    

    // Add the new flashcard to the selected deck
    this.selectedDeck.flashcards.push(newFlashcard);
    console.log('Updated Deck:', this.selectedDeck);

    // Pass the updated deck back to the parent component
    this.dialogRef.close(this.selectedDeck);
  }
}
