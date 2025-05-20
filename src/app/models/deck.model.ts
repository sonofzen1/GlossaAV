import { Flashcard } from './flashcard.model';

export class Deck {
  name: string;
  flashcards: Flashcard[];
  flashCardIDs: string[] = []; // Array to hold flashcard IDs

  constructor(name: string, flashcardsOrIDs: Flashcard[] | string[]) {
    this.name = name;
    if (Array.isArray(flashcardsOrIDs) && flashcardsOrIDs.length > 0 && typeof flashcardsOrIDs[0] !== 'string') {
      this.flashcards = flashcardsOrIDs as Flashcard[];
      this.flashCardIDs = [];
    } else {
      this.flashcards = [];
      this.flashCardIDs = flashcardsOrIDs as string[];
    }
  }

  addFlashcard(flashcard: Flashcard): void {
    this.flashcards.push(flashcard);
  }
}