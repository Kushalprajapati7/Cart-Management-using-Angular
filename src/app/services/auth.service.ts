import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private tokenKey = 'auth_token';
  private isAuthenticated: boolean = false;
  private userRole:string= 'user';


  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/register', { username, email, password, role });
  }

  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post<{ token: string, role:string }>('http://localhost:3000/api/auth/login', { email, password, role }).pipe(
      map(response => {
        this.token = response.token;
        this.isAuthenticated = true;
        this.userRole = response.role;
        console.log(this.userRole);
        // localStorage.setItem(this.tokenKey, this.token);
        return response;
      })
    );
  }

  getToken(): string | null {
    return this.token;
  }


  isLoggedIn(): boolean {
    // console.log(this.token);
    return this.isAuthenticated, !!this.token;
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return headers;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
