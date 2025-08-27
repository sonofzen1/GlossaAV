import { Flashcard } from './flashcard.model';

export class Deck {
  Title: string;
  Flashcards: Flashcard[];
  Loaded: boolean = false; // Indicates if flashcards have been loaded

  constructor(title: string, flashcards: Flashcard[] = []) {
    this.Title = title;
    this.Flashcards = flashcards;
  }

  addFlashcard(flashcard: Flashcard): void {
    this.Flashcards.push(flashcard);
  }
}
