import { Component, HostListener, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Song } from '../../models/song.model';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FlashcardModalComponent } from '../../dialog/flashcard-modal/flashcard-modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'song-modal',
  templateUrl: './song-modal.component.html',
  imports: [MatCardModule, MatDialogModule, MatSlideToggleModule, CommonModule, MatTooltip, MatTooltipModule, FontAwesomeModule, FlashcardModalComponent, MatButtonModule],
  styleUrls: ['./song-modal.component.css']
})
export class SongModalComponent {
  showEnglishTranslation: boolean = false; // Track toggle state
  faRectangleXmark = faRectangleXmark; // FontAwesome icon
  showAddButton: boolean = false; // Track button visibility

  constructor(
    public dialogRef: MatDialogRef<SongModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { song: Song; decks: any[] }, // Injected data
    private dialog: MatDialog // Add MatDialog service
  ) {}

  toggleTranslation(): void {
    this.showEnglishTranslation = !this.showEnglishTranslation;
  }

  onClose(): void {
    console.log('Button pressed, closing dialog'); // Debug statement
    this.dialogRef.close(); // Close the dialog
  }

  currentSelection: any = '';
  buttonX: number = 0; // X-coordinate for button
  buttonY: number = 0;

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {

    const target = event.target as HTMLElement;
    if (target.closest('.add-button')) {
      // Do nothing if the click is on the "Translate" button
      return;
    }

    console.log('Mouse down event:', event); // Debug statement
    this.showAddButton = false; // Hide the button
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges(); // Explicitly clear the selection
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    const selection = window.getSelection()?.toString() || '';
    this.buttonX = event.clientX + 50;
    this.buttonY = event.clientY - 30;
    this.showAddButton = selection.trim().length > 0; // Show button if text is selected
  }

  addCard(): void {
    this.currentSelection = window.getSelection()?.toString() || null;
    if (this.currentSelection) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = 'my-dialog-styles'; // Apply custom class
      dialogConfig.width = '40%';
      dialogConfig.height = '70%';
      dialogConfig.maxHeight = '900vh';
      dialogConfig.maxWidth = '900vw';
      dialogConfig.autoFocus = '.modal-header'; // Focus the modal header element
      dialogConfig.data = { text: this.currentSelection, decks: this.data.decks }; // Pass the decks list as data

      const dialogRef = this.dialog.open(FlashcardModalComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Find the updated deck in the decks array and update it
          const updatedDeckIndex = this.data.decks.findIndex(deck => deck.name === result.name);
          if (updatedDeckIndex !== -1) {
            this.data.decks[updatedDeckIndex] = result;
          }
          console.log('The dialog was closed with result:', result);
        } else {
          console.log('The dialog was closed without result');
        }
        // Manually restore focus if needed
        // document.querySelector('.menu-trigger')?.focus();
      });

      this.showAddButton = false; // Hide button after adding card
    }
  }
}
