import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponseData } from "../entities/auth-response-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  http = inject(HttpClient);
  API_KEY = "AIzaSyCTAysTqPc2xuoia2i0SzquwRUDLPXf0Qw";
  urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  urlSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.urlSignUp, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.urlSignIn, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
