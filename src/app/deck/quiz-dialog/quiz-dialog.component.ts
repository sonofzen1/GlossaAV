import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { Flashcard } from '../../models/flashcard.model';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleXmark, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { QuizcardComponent} from "./quiz-card/quiz-card.component";
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'quiz-dialog',
  templateUrl: './quiz-dialog.component.html',
  imports: [CommonModule, QuizcardComponent, FontAwesomeModule, MatCardModule, MatButtonModule, MatMenuModule],
  styleUrls: ['./quiz-dialog.component.css']
}) 
export class QuizDialogComponent {
  faRectangleXmark = faRectangleXmark;
  faCheck = faCheck;
  faXmark = faXmark;
  constructor(
    public dialogRef: MatDialogRef<QuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cards: Flashcard[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  incorrect() {
    document.querySelectorAll(".flip-card")[this.data.cards.length - 1].classList.remove("move-card-right");
    document.querySelectorAll(".flip-card")[this.data.cards.length - 1].classList.add("move-card-left");
    document.querySelectorAll(".flip-card")[this.data.cards.length - 1].classList.remove("open");
    //add to middle of deck
    this.data.cards = array_switch(this.data.cards, 0, Math.floor(this.data.cards.length / 2))
  }
  correct() {
    document.querySelectorAll(".flip-card")[this.data.cards.length - 1].classList.remove("move-card-left");
    document.querySelectorAll(".flip-card")[this.data.cards.length - 1].classList.add("move-card-right");
    document.querySelectorAll(".flip-card")[this.data.cards.length - 1].classList.remove("open");
    //add to end of deck
    this.data.cards = array_switch(this.data.cards, 0, this.data.cards.length - 1)
    //this.data.cards.splice(0, 1);
    //uncomment above line to instead delete the cards that you get correct
  }
}

function array_switch(arr: Array<any>, old_index: number, new_index: number) {
  if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};