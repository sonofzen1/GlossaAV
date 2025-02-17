import { Component, Input } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';

@Component({
  selector: 'app-flashcard',
  imports: [],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  @Input() card!: Flashcard;
}
