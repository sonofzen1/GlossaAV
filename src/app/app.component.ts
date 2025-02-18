import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, Routes} from '@angular/router';
import { DeckComponent } from "./deck/deck.component";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, DeckComponent, MatGridListModule, MatCardModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Glossa';
}
