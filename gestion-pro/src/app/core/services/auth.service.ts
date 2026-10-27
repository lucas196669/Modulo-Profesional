import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Servicio de autenticación con soporte para roles admin/user
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  token = computed(() => this._token());
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._token());
  role = computed(() => this._user()?.role);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login simulado contra API REST
   */
  login(email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http.get<User[]>(${environment.apiUrl}/users).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          throw new Error('Credenciales inválidas');
        }
        const token = 'jwt-' + btoa(email + ':' + Date.now());
        return { token, user };
      }),
      tap(res => {
        this._token.set(res.token);
        this._user.set(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  /**
   * Verifica si un email ya existe
   */
  emailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(${environment.apiUrl}/users?email=).pipe(
      map(users => users.length > 0)
    );
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
