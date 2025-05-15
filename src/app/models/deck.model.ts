import { Flashcard } from './flashcard.model';

export class Deck {
  name: string;
  flashcards: Flashcard[];
  flashCardIDs: string[] = []; // Array to hold flashcard IDs

  constructor(name: string, flashcards: Flashcard[]) {
    this.name = name;
    this.flashcards = flashcards;
  }

  addFlashcard(flashcard: Flashcard): void {
    this.flashcards.push(flashcard);
  }
} 