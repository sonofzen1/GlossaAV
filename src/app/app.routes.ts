import { Routes } from '@angular/router';
import { DeckComponent } from './deck/deck.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  // Default route shows login
  { path: '', component: LoginComponent, pathMatch: 'full' },

  // Sign up page
  { path: 'signup', component: SignupComponent },
  
  // After login, navigate here
  { path: 'app', component: DashboardComponent },

  // Other routes
  { path: 'deck', component: DeckComponent },

    // Forgot password redirects to static HTML
  { path: 'forgot-password', redirectTo: 'src/assets/forgot-password.html', pathMatch: 'full' },

  // Catch-all -> back to login
  { path: '**', redirectTo: '' },

];
