import { Component, Input } from '@angular/core';
import { Flashcard } from '../models/flashcard.model';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, MatCardModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {
  @Input() card!: Flashcard;
}
