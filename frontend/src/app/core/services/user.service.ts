import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class UserService {
    constructor(private http: HttpClient) {}
  
    getUserProfile(): Observable<any> {
        return this.http.get('http://127.0.0.1:8000/api/accounts/me/');
    }

    updateUserProfile(data: any): Observable<any> {
        return this.http.patch('http://127.0.0.1:8000/api/accounts/me/', data);
    }
  }
