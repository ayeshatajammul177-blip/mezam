import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:7109/api/Clients/submit';

  constructor(private http: HttpClient) {}

submitClient(formData: FormData): Observable<any> {
  const token = localStorage.getItem('token') || '';

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post('https://localhost:7109/api/Clients/submit', formData, {
    headers,
    observe: 'response',
  });
  }
}
