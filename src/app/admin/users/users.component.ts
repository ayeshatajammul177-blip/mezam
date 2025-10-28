import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private authService: AuthService, private router: Router) {}
  users: any[] = [];
  showDeleteModal: boolean = false;
  selectedUser: any = null;
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        console.log('✅ Users fetched:', response);
        this.users = response || [];
      },
      error: (err) => {
        console.error('❌ Error fetching users:', err);
      }
    });
  }
openDeleteModal(user: any): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  confirmDelete(): void {
    if (!this.selectedUser) return;

    this.authService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== this.selectedUser.id);
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('❌ Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
