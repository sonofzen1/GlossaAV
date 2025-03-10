import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-flashcard-modal',
  imports: [MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './flashcard-modal.component.html',
  styleUrl: './flashcard-modal.component.css'
})
export class FlashcardModalComponent {

}
