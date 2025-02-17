import { Routes } from '@angular/router';
import { DeckComponent } from './deck/deck.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: './app.component.html',
        pathMatch: 'full'
    },
    {
        path:'deck',
        component: DeckComponent
    },

];
