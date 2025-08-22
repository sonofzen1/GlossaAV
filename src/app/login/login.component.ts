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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  // place for backend/server error messages later
  formError = '';

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.formError = '';
    console.log('Form submitted:', form.value);
    if (form.invalid) {
      this.formError = 'Please fill in both fields.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response.message); // Optional: Log success message
        this.router.navigate(['/app']);
      },
      error: (err) => {
        this.formError = err.error?.message || 'Invalid username or password';
      }
    });

    // TODO: wire up your LoginService here
    // if server says bad creds later:
    // this.formError = 'Invalid username or password';
  }

  onSignUpClick() {
    this.router.navigate(['/signup']);
  }

  forgotPassword() {
    // Redirect to the forgot password static HTML page
    console.log('Redirecting to forgot password page');
    this.router.navigate(['/forgot-password']);
  }
}
