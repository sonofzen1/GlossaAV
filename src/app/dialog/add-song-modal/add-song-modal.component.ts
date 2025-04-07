import { Component } from '@angular/core';
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-song-modal',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatButton],
  templateUrl: './add-song-modal.component.html',
  styleUrl: './add-song-modal.component.css'
})
export class AddSongModalComponent {
  songUrl: string = '';
  constructor(
      public dialogRef: MatDialogRef<AddSongModalComponent>,
    ) {}
  

  submit(){
    console.log('Submit button clicked!');
  }
}
