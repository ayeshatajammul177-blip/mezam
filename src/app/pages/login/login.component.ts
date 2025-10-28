import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.formData.email || !this.formData.password) {
      this.message = '⚠️ Please enter both email and password.';
      return;
    }

    this.authService.login(this.formData).subscribe({
      next: (response) => {
        console.log('✅ Login success:', response);

        if (response && response.token) {
          // Store JWT token
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.user?.role);
          // ✅ Assuming backend returns a numeric role (0 = client, 1 = admin)
          const role = response.user?.role;
          if (role === 1) {
            this.message = '✅ Welcome, Admin!';
            setTimeout(() => this.router.navigate(['/admin-dashboard']), 1000);
          } else {
            this.message = '✅ Welcome back!';
            setTimeout(() => this.router.navigate(['/home']), 1000);
          }
        } else {
          this.message = '⚠️ Login succeeded but no token received.';
        }
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        if (err.status === 401) {
          this.message = '❌ Incorrect email or password.';
        } else {
          this.message = '❌ Login failed. Please try again later.';
        }
      }
    });
  }
}
