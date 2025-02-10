import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'card-deck',
  imports: [CommonModule],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  name: string='Deck';
  cards = ['card1', 'card2', 'card3'];
}
