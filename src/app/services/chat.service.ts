// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://localhost:7109/api/chat'; // your backend API

  constructor(private http: HttpClient) {}

  sendMessage(message: string, model: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const body = {
     mode: model,
     input: message
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
