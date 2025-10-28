import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // ✅ Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      return true; // user is authenticated, allow access
    } else {
      // 🚫 no token, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
