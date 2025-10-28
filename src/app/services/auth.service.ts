import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7109/api/Auth/register'; // ✅ your backend API endpoint
  private loginUrl = 'https://localhost:7109/api/Auth/login';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get('https://localhost:7109/fetch_users', { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `https://localhost:7109/api/Admin/delete/${userId}`;
    return this.http.delete(url, { headers });
  }
  getUserData() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { id: payload.sub, role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] };
  } catch {
    return null;
  }
  }

  signup(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
  login(credentials: any): Observable<any> {
    const payload = {
      email: credentials.email,
      password: credentials.password
    };
    return this.http.post(this.loginUrl, payload).pipe(
    tap((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    })
  );
  }
  
  logout() {
  localStorage.removeItem('token');  // ✅ Clear stored token
  // Optionally, you can also navigate to the login page or show a logout message
  console.log('User logged out successfully');
  }

}

