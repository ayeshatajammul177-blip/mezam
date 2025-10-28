import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-my-applications',
  standalone: false,
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent {
  applications: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUserApplications();
  }

  fetchUserApplications(): void {
    const token = localStorage.getItem('token');
    const userData = this.authService.getUserData(); // we'll add this helper below

    if (!token || !userData) {
      this.error = 'User not authenticated.';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = `https://localhost:7109/api/Admin/form/${userData.id}`;

    this.http.get<any[]>(apiUrl, { headers }).subscribe({
      next: (data) => {
        this.applications = data.map(app => ({
          ...app,
          date: new Date(app.submittedAt).toLocaleDateString('en-GB') 
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching user applications:', err);
        this.error = 'Failed to load applications. Please try again.';
        this.loading = false;
      }
    });
  }
}
