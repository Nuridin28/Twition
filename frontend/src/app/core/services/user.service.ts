import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://127.0.0.1:8000/api/accounts'; 

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me/`);
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/me/`, userData);  
  }
}
