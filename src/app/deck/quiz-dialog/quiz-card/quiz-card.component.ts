import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Flashcard } from '../../../models/flashcard.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-quizcard',
  imports: [CommonModule, MatCardModule, FontAwesomeModule],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.css'
})

export class QuizcardComponent {
  @Input() card!: Flashcard;
  isOpen: boolean = false;
 
  toggle() {this.isOpen = !this.isOpen; }
}
