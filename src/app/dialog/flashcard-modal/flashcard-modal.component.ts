import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-flashcard-modal',
  imports: [MatButtonModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './flashcard-modal.component.html',
  styleUrl: './flashcard-modal.component.css'
})
export class FlashcardModalComponent {

}
