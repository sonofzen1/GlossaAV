import { Flashcard } from './flashcard.model';

export class Deck {
  name: string;
  flashcards: Flashcard[];

  constructor(name: string, flashcards: Flashcard[]) {
    this.name = name;
    this.flashcards = flashcards;
  }
}