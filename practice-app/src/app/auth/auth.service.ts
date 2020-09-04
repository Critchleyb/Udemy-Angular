import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key = 'AIzaSyDvN6grLCPZ26QI1xza754EQZI_uQO1P1c';

  constructor(
    private http: HttpClient
  ) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key,
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
