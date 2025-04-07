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
    private http: HttpClient
  ) {
        if (data.text) {
          this.term = data.text;
          this.translateTerm(); // Call the translation function if text is provided
        }

  }

    async translateTerm(): Promise<void> {
    if (!this.term) {
      return;
    }

    const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
    const apiKey = 'AIzaSyB0QOTZdGNH7_3WtPoYios1OX_L37tsfC0'; // Replace with your API key

    const requestBody = {
      q: this.term,
      target: 'en', // Target language (e.g., English)
      source: 'es'  // Source language (e.g., Spanish)
    };

    try {
      const response: any = await this.http
        .post(apiUrl, requestBody, { params: { key: apiKey } })
        .toPromise();

      if (response && response.data && response.data.translations) {
        this.definition = response.data.translations[0].translatedText;
        console.log('Translated Text:', this.definition);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error during translation:', error);
    }
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
