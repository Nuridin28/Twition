import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  avatar?: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private currentUser: User | null = null;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private apiUrl = 'http://127.0.0.1:8000/api/accounts';

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData =
      localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }


  

  public login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login/`, { email, password })
      .pipe(
        delay(1000),
        tap((response) => {
          const user = response.user;
          const accessToken = response.access;
          const refreshToken = response.refresh;

          this.currentUser = user;

          if (rememberMe) {
            localStorage.setItem(this.TOKEN_KEY, accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          } else {
            sessionStorage.setItem(this.TOKEN_KEY, accessToken);
            sessionStorage.setItem('refresh_token', refreshToken);
            sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
          }

          console.log('Access token saved:', accessToken);
          console.log('Refresh token saved:', refreshToken);
        }),
        catchError((error) => {
          if (error.status === 401) {
            return throwError(() => new Error('Invalid email or password'));
          }
          return throwError(
            () => new Error('An error occurred during login. Please try again.')
          );
        })
      );
  }

  public register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register/`, {
        firstName,
        lastName,
        email,
        password,
      })
      .pipe(
        delay(1000),
        catchError((error) => {
          if (error.status === 409) {
            return throwError(() => new Error('Email already in use'));
          }
          return throwError(
            () => new Error('Registration failed. Please try again.')
          );
        })
      );
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getToken(): string | null {
    const token =
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY);
    console.log('Retrieved token:', token);
    return (
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }
}
