import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faT, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, MatCardModule, FontAwesomeModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  @Input() card!: Flashcard;
  @Output() deleteFlashcard = new EventEmitter<Flashcard>(); // Event emitter for delete action
  faTrash = faTrash;

  delete(){
    console.log('Delete button clicked for card:', this.card); // Debug statement
    this.deleteFlashcard.emit(this.card); // Emit the delete event with the card data
    // Logic to delete the card can be implemented here
  }

}
