import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email = '';
  username = '';
  password = '';
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  // place for backend/server error messages later
  formError = '';

  onSubmit() {
    console.log('Sending:', { username: this.username, password: this.password, email: this.email });
    this.authService.signup(this.username, this.password, this.email).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.router.navigate(['/login']); // Redirect to login after signup
      },
      error: (err) => {
        console.error('Error:', err);
        this.formError = err.error?.message || 'Signup failed';
      }
    });
    }

  onLoginClick() {
    this.router.navigate(['']);
  }
}
