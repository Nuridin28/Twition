import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile(): any {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User>('http://127.0.0.1:8000/api/accounts/me/', {
      headers,
    });
  }

  updateUserProfile(data: {
    first_name: string;
    last_name: string;
    email: string;
  }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch(
      'http://127.0.0.1:8000/api/accounts/me/update/',
      data,
      { headers }
    );
  }
}
