import { IAddress } from './../shared/models/address';
import { Router } from '@angular/router';
import { IUser } from './../shared/models/user';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private currentUser = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(values: any) {
    return this.http.post(`${this.baseUrl}account/login`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post(`${this.baseUrl}account/register`, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmaileExists(email: string) {
    return this.http.get(`${this.baseUrl}account/emailexists?email=${email}`);
  }

  getCurrentUser() {
    return this.currentUser.value;
  }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}account`, { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    );
  }

  getUserAddress() {
    return this.http.get(`${this.baseUrl}account/address`);
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(`${this.baseUrl}account/address`, address);
  }
}
