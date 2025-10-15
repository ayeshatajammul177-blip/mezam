import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 formData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
};
message: string = '';
constructor(private authService: AuthService, private router: Router) {}
onSubmit() {
  if (!this.formData.fullName || !this.formData.email || !this.formData.password || !this.formData.confirmPassword) {
    this.message = '⚠️ Please fill in all fields.';
    return;
  }

  if (this.formData.password !== this.formData.confirmPassword) {
    this.message = '⚠️ Passwords do not match.';
    return;
  }

  this.authService.signup({
    name: this.formData.fullName,  // adjust to match backend
    email: this.formData.email,
    password: this.formData.password
  }).subscribe({
    next: (response) => {
      this.message = '✅ Signup successful!';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    },
    error: (err) => {
      console.error(err);
      this.message = '❌ Signup failed: ' + (err.error?.message || 'Try again later.');
    }
  });
}

}
