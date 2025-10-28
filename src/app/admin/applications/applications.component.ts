import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-applications',
  standalone: false,
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: any[] = []; // will hold the data from the backend
  private apiUrl = 'https://localhost:7109/api/Admin/form/all';
  private processStatusUrl = 'https://localhost:7109/api/Admin/processStatus';



  constructor(private http: HttpClient,private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (res) => {
        this.applications = res.map(app => ({
          ...app,
          date: new Date(app.submittedAt).toLocaleDateString('en-GB') 
        }));
        console.log('✅ Applications fetched:', res);
      },
      error: (err) => {
        console.error('❌ Error fetching applications:', err);
      }
    });
  }

  
    updateStatus(app: any, newStatus: string): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { status: newStatus };

    this.http.put(`${this.processStatusUrl}/${app.id}`, body, { headers }).subscribe({
      next: (res) => {
        console.log(`✅ Status for form ${app.id} updated to ${newStatus}`, res);
        app.status = newStatus; // Update locally for instant UI feedback
        alert(`Status updated to "${newStatus}" successfully!`);
      },
      error: (err) => {
        console.error('❌ Error updating status:', err);
        alert('Failed to update status. Please try again.');
      }
    });
  }







  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
