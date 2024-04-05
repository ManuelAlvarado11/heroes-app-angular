import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => this.user = user),
      tap((user) =>
        localStorage.setItem('token', 'ASADFsdjfnksjn.sdfsadf2435svc.sdfgsSDS')
      )
    );

    
  }

  logout(): void {
    this.user = undefined
    localStorage.clear()
  }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return this.user;
  }
}
