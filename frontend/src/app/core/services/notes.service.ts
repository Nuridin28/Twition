import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { AppFile } from '../interfaces/file';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = 'http://localhost:8000/api/document_editor/document/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getToken() {
    let localToken = localStorage.getItem('auth_token');
    let sessionToken = sessionStorage.getItem('auth_token');
    if (localToken) {
      return localToken;
    } else {
      return sessionToken;
    }
  }

  getNotes(): Observable<AppFile[]> {
    return this.http.get<AppFile[]>(this.apiUrl, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }
}
