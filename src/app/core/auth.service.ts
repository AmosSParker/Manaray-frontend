import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          console.log('Login successful, token received:', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(user);
        } else {
          console.error('Login failed, no token received');
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  refreshToken() {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.refreshToken) {
      return this.http.post<any>(`${environment.apiUrl}/api/auth/refresh`, { token: currentUser.refreshToken })
        .pipe(map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', user.token);
            this.currentUserSubject.next(user);
          }
          return user;
        }));
    }
    return of(null);
  }
}

