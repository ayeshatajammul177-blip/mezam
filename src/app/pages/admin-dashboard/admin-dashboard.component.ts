import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router,private adminService: AdminService) {}
    stats = {
    totalUsers: 0,
    totalForms: 0,
    pendingRequests: 0,
    processedRequests: 0
  };


  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Error loading stats:', err);
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
