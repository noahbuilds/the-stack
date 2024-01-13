import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../models/sign-up';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  doLogin(payload: Login): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/api/auth/register`,
      payload
    );
  }

  doSignup(payload: SignUp): Observable<any> {
    return this.http.post<any>(
      `${environment.developmentIP}/api/auth/register`,
      payload
    );
  }
}
