import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';

@Component({
  selector: 'card-deck',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})

export class DeckComponent {
  name: string='Deck';
  cards = ['card1', 'card2', 'card3'];

  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DeckDialogComponent, {
      width: '250px',
      height: '400px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

