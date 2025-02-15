import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'card-deck',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})


export class DeckComponent {
  name: string='Deck';
  cards = ['card1', 'card2', 'card3'];
}

